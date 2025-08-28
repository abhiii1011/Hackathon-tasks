import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileCard({ name, title, avatar, bio, location, stats }) {
  return (
    <article className="profile-card">
      <div className="profile-card__header">
        <img className="profile-card__avatar" src={avatar} alt={name} />
        <div>
          <h1 className="profile-card__name">{name}</h1>
          <p className="profile-card__title">{title}</p>
          <p className="profile-card__location">{location}</p>
        </div>
      </div>
      {bio && <p className="profile-card__bio">{bio}</p>}
      <ul className="profile-card__stats">
        <li><span className="label">Followers</span><span className="value">{stats.followers}</span></li>
        <li><span className="label">Following</span><span className="value">{stats.following}</span></li>
        <li><span className="label">Repos</span><span className="value">{stats.repos}</span></li>
      </ul>
    </article>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  bio: PropTypes.string,
  location: PropTypes.string,
  stats: PropTypes.shape({
    followers: PropTypes.number,
    following: PropTypes.number,
    repos: PropTypes.number,
  }),
};

ProfileCard.defaultProps = {
  bio: '',
  location: '',
  stats: { followers: 0, following: 0, repos: 0 },
};
