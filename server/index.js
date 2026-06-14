import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env');
}

const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern responsive portfolio built with React and Node.',
    link: '#'
  },
  {
    id: 2,
    title: 'Supabase Contact API',
    description: 'Secure backend API for saving form submissions to Supabase.',
    link: '#'
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }

  const { data, error } = await supabase.from('contacts').insert([{ name, email, message }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ message: 'Contact saved', data });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
