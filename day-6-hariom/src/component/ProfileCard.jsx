function ProfileCard({ name, bio, image }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "16px",
      width: "250px",
      textAlign: "center",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease-in-out"
    }}>
      <img 
        src={image} 
        alt={name} 
        style={{ 
          width: "100px", 
          height: "100px", 
          borderRadius: "50%", 
          marginBottom: "12px" 
        }} 
      />
      <h2 style={{ margin: "8px 0", fontSize: "20px", color: "#333" }}>{name}</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>{bio}</p>
    </div>
  );
}

export default ProfileCard;
