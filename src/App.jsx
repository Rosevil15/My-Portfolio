import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('Sending...');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setStatus('Message sent successfully.');
      setForm({ name: '', email: '', message: '' });
    } else {
      const data = await response.json();
      setStatus(data?.error || 'Unable to send message.');
    }
  }

  return (
    <div className="app-shell">
      <header>
        <h1>My Portfolio</h1>
        <p>React + Node + Supabase starter</p>
      </header>

      <section>
        <h2>Projects</h2>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link}>View project</a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label>
            Message
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </label>

          <button type="submit">Send Message</button>
        </form>
        {status && <p className="status">{status}</p>}
      </section>

      <footer>
        <p>Built with React, Node, and Supabase.</p>
      </footer>
    </div>
  );
}

export default App;
