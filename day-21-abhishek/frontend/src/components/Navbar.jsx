export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0">
      <h1 className="text-xl font-bold">MyPortfolio</h1>
      <nav className="space-x-6">
        <a href="#about" className="hover:text-blue-500">About</a>
        <a href="#projects" className="hover:text-blue-500">Projects</a>
        <a href="#contact" className="hover:text-blue-500">Contact</a>
      </nav>
    </header>
  );
}
