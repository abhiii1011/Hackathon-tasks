import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { io } from 'socket.io-client';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const socket = io(API.replace('/api',''));

export default function Board() {
  const { id } = useParams();
  const { authHeaders } = useAuth();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({}); // listId -> cards array
  const [listTitle, setListTitle] = useState('');
  const [newCardTitle, setNewCardTitle] = useState({});

  const loadBoard = () => axios.get(API + '/boards/' + id, { headers: authHeaders }).then(r => setBoard(r.data));
  const loadLists = () => axios.get(API + `/boards/${id}/lists`, { headers: authHeaders }).then(r => setLists(r.data));
  const loadCards = async (listId) => {
    const r = await axios.get(API + `/boards/lists/${listId}/cards`, { headers: authHeaders });
    setCards(c => ({ ...c, [listId]: r.data }));
  };

  useEffect(() => {
    loadBoard();
    loadLists();
    socket.emit('join-board', id);
    socket.on('card-updated', card => {
      setCards(c => {
        const copy = { ...c };
        Object.keys(copy).forEach(lid => {
          copy[lid] = copy[lid].filter(cd => cd._id !== card._id);
        });
        (copy[card.list] = copy[card.list] || []).push(card);
        copy[card.list].sort((a,b)=>a.position-b.position);
        return copy;
      });
    });
    return () => { socket.off('card-updated'); };
  }, [id]);

  useEffect(() => {
    lists.forEach(l => { if(!cards[l._id]) loadCards(l._id); });
  }, [lists]);

  const createList = async e => {
    e.preventDefault();
    await axios.post(API + `/boards/${id}/lists`, { title: listTitle }, { headers: authHeaders });
    setListTitle('');
    loadLists();
  };

  const createCard = async (listId) => {
    const title = newCardTitle[listId];
    if(!title) return;
    const r = await axios.post(API + `/boards/lists/${listId}/cards`, { title }, { headers: authHeaders });
    setCards(c => ({ ...c, [listId]: [...(c[listId]||[]), r.data] }));
    setNewCardTitle(n => ({ ...n, [listId]: '' }));
  };

  const onDragStart = (e, card, fromList) => {
    e.dataTransfer.setData('cardId', card._id);
    e.dataTransfer.setData('fromList', fromList);
  };
  const onDrop = async (e, toList) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const fromList = e.dataTransfer.getData('fromList');
    if(cardId && toList){
      const toPosition = cards[toList]?.length || 0;
      const r = await axios.put(API + `/boards/lists/${fromList}/cards/move`, { cardId, toListId: toList, toPosition }, { headers: authHeaders });
      socket.emit('card-updated', { boardId: id, card: r.data });
      // local update done via socket as well
    }
  };

  return (
    <div>
      {board && <h2 style={{ padding:'0 1rem' }}>{board.name}</h2>}
      <div className="board-grid">
        {lists.map(list => (
          <div key={list._id} className="list" onDragOver={e=>e.preventDefault()} onDrop={e=>onDrop(e,list._id)}>
            <h3>{list.title}</h3>
            <div className="scroll-y">
              {(cards[list._id]||[]).sort((a,b)=>a.position-b.position).map(card => (
                <div key={card._id} className="card" draggable onDragStart={e=>onDragStart(e, card, list._id)}>
                  {card.title}
                </div>
              ))}
            </div>
            <div style={{ marginTop:8 }}>
              <input placeholder="New card" value={newCardTitle[list._id]||''} onChange={e=>setNewCardTitle(n=>({...n,[list._id]:e.target.value}))} style={{ width:'100%', marginBottom:4 }} />
              <button className="primary" style={{ width:'100%' }} onClick={()=>createCard(list._id)}>Add Card</button>
            </div>
          </div>
        ))}
        <form onSubmit={createList} className="list" style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <h3>New List</h3>
          <input placeholder="Title" value={listTitle} onChange={e=>setListTitle(e.target.value)} required />
          <button className="primary">Add List</button>
        </form>
      </div>
    </div>
  );
}
