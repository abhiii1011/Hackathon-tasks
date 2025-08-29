import ProfileCard from "./component/ProfileCard";

function App() {
  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      <ProfileCard 
        name="Abhishek Namdeo" 
        bio="CSE Student | Web Developer" 
        image="https://via.placeholder.com/100"
      />
      <ProfileCard 
        name="John Doe" 
        bio="React Enthusiast | UI Designer" 
        image="https://via.placeholder.com/100"
      />
      <ProfileCard 
        name="Jane Smith" 
        bio="Frontend Developer | React Lover" 
        image="https://via.placeholder.com/100"
      />
    </div>
  );
}

export default App;
