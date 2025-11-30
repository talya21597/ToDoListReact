const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Connection Pool
console.log('Connecting to PostgreSQL...');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connection successful!');
    console.log('Connection details:', {
      host: client.host,
      database: client.database,
      user: client.user
    });
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection failed:', err.message);
    console.error('Full error:', err);
  });

// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    iscomplete BOOLEAN DEFAULT FALSE
  );
`;

pool.query(createTableQuery)
  .then(() => {
    console.log('✅ Items table ready!');
  })
  .catch(err => {
    console.error('❌ Error creating table:', err.message);
  });

// GET all items
app.get('/items', async (req, res) => {
  try {
    console.log('GET /items');
    const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new item
app.post('/items', async (req, res) => {
  try {
    const { name, iscomplete } = req.body;
    console.log('POST /items received:', { name, iscomplete });
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const result = await pool.query(
      'INSERT INTO items (name, iscomplete) VALUES ($1, $2) RETURNING *',
      [name, iscomplete || false]
    );
    
    console.log('Item inserted successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Database error on POST:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// PUT update item
app.put('/items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { iscomplete } = req.body;
    console.log('PUT /items/:id', { id, iscomplete });
    
    const result = await pool.query(
      'UPDATE items SET iscomplete = $1 WHERE id = $2 RETURNING *',
      [iscomplete, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE item
app.delete('/items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log('DELETE /items/:id', { id });
    
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
