// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebase');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data (this could be replaced by a database in a real app)
const posts = [
  { id: 1, title: 'First Post', body: 'This is the body of the first post' },
  { id: 2, title: 'Second Post', body: 'This is the body of the second post' },
];

// GET /posts - Fetch all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);  // Send the posts data as JSON
});

// POST endpoint to create a new user
app.post('/createUser', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Add a new document in the "users" collection
    const userRef = await db.collection('users').add({
      name: name,
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send(`User created with ID: ${userRef.id}`);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).send('Error creating user');
  }
});

// Get all users from Firestore
app.get('/getUsers', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    res.status(200).json(usersList);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).send('Error fetching users');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// GET /posts/:id - Fetch a specific post by ID
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// POST /posts - Create a new post
app.post('/api/posts', (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: posts.length + 1, title, body };
  posts.push(newPost);
  res.status(201).json(newPost);  // Send back the created post
});

// PUT /posts/:id - Update a specific post by ID
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, body } = req.body;
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { id: postId, title, body };
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// DELETE /posts/:id - Delete a specific post by ID
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
