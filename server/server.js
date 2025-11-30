const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'bkzmi4mvr8trijqwb9a63-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'u6c9gtkmoscoy44j',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'bkzmi4mvr8trijqwb9a63',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET all items
app.get('/items', async (req, res) => {
  try {
    console.log('GET /items');
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM Items');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new item
app.post('/items', async (req, res) => {
  try {
    const { name, isComplete } = req.body;
    console.log('POST /items', { name, isComplete });
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO Items (Name, IsComplete) VALUES (?, ?)',
      [name, isComplete || 0]
    );
    connection.release();
    
    res.status(201).json({
      id: result.insertId,
      name: name,
      isComplete: isComplete || false
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update item
app.put('/items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { isComplete } = req.body;
    console.log('PUT /items/:id', { id, isComplete });
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE Items SET IsComplete = ? WHERE Id = ?',
      [isComplete ? 1 : 0, id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ id, isComplete });
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
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'DELETE FROM Items WHERE Id = ?',
      [id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
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
