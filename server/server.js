const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let items = [
  { id: 1, name: 'Learn React', isComplete: false },
  { id: 2, name: 'Build a To-Do app', isComplete: false }
];
let nextId = 3;

// GET all items
app.get('/items', (req, res) => {
  console.log('GET /items');
  res.json(items);
});

// POST new item
app.post('/items', (req, res) => {
  const { name, isComplete } = req.body;
  console.log('POST /items', { name, isComplete });
  
  const newItem = {
    id: nextId++,
    name: name,
    isComplete: isComplete || false
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { isComplete } = req.body;
  console.log('PUT /items/:id', { id, isComplete });
  
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  item.isComplete = isComplete;
  res.json(item);
});

// DELETE item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('DELETE /items/:id', { id });
  
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items.splice(index, 1);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
