// Create web server
// Load express module
const express = require('express');
// Create express server
const app = express();
// Load body-parser module
const bodyParser = require('body-parser');
// Load comments module
const comments = require('./comments');
// Load cors module
const cors = require('cors');

// Use body-parser to parse JSON data
app.use(bodyParser.json());
// Use cors to allow cross-origin requests
app.use(cors());

// Create GET request for comments
app.get('/comments', (req, res) => {
  // Send comments as response
  res.json(comments);
});

// Create POST request for comments
app.post('/comments', (req, res) => {
  // Get comment from request body
  const comment = req.body;
  // Add comment to comments
  comments.push(comment);
  // Send comment as response
  res.json(comment);
});

// Create DELETE request for comments
app.delete('/comments/:id', (req, res) => {
  // Get comment id from request parameters
  const id = req.params.id;
  // Find index of comment with id
  const index = comments.findIndex(comment => comment.id === id);
  // Remove comment with index from comments
  comments.splice(index, 1);
  // Send success message as response
  res.json({ message: 'Comment deleted' });
});

// Create PUT request for comments
app.put('/comments/:id', (req, res) => {
  // Get comment id from request parameters
  const id = req.params.id;
  // Get comment from request body
  const comment = req.body;
  // Find index of comment with id
  const index = comments.findIndex(comment => comment.id === id);
  // Update comment with index in comments
  comments[index] = comment;
  // Send comment as response
  res.json(comment);
});

// Start server on port 3000
app.listen(3000, () => console.log('Server is running on port 3000'));