const projects = [
  {
    title: "E-commerce Store",
    desc: "Full MERN stack online store with cart & payments",
    github: "https://github.com/example",
    demo: "https://demo.com",
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio with React & Tailwind",
    github: "https://github.com/example",
    demo: "https://demo.com",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p, i) => (
          <div key={i} className="p-6 border rounded-2xl shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-600 mb-4">{p.desc}</p>
            <div className="flex gap-4">
              <a href={p.github} target="_blank" className="text-blue-600 underline">GitHub</a>
              <a href={p.demo} target="_blank" className="text-green-600 underline">Live Demo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
