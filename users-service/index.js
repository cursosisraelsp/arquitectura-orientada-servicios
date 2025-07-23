// users-service/index.js
const express = require('express');
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Israel' },
  { id: 2, name: 'Ana' },
];

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    console.log(id,req.params)
  const user = users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(3002, () => {
  console.log('Users service running on port 3002');
});