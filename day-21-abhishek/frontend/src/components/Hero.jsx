export default function Hero() {
  return (
    <section id="about" className="h-screen flex flex-col justify-center items-center text-center px-6">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-32 h-32 rounded-full shadow-lg mb-4"
      />
      <h2 className="text-4xl font-bold mb-2">Hi, I'm Abhishek 👋</h2>
      <p className="text-lg text-gray-600 mb-6">
        A passionate Full-Stack Developer who loves building web apps 🚀
      </p>
      <a
        href="#projects"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        View My Work
      </a>
    </section>
  );
}
