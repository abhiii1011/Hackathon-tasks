import { useRef } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      form.current,
      "YOUR_PUBLIC_KEY"
    ).then(() => alert("Message sent ✅"))
     .catch(() => alert("Failed ❌"));
  };

  return (
    <section id="contact" className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
      <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto space-y-4">
        <input type="text" name="name" placeholder="Your Name"
          className="w-full p-3 border rounded-xl" required />
        <input type="email" name="email" placeholder="Your Email"
          className="w-full p-3 border rounded-xl" required />
        <textarea name="message" placeholder="Your Message"
          className="w-full p-3 border rounded-xl" rows="5" required />
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </section>
  );
}
