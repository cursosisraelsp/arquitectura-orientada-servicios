// orders-service/index.js
const express = require('express');

const app = express();
app.use(express.json());

const orders = [
  { id: 101, userId: 1, product: 'Laptop' },
  { id: 102, userId: 2, product: 'Phone' },
  { id: 103, userId: 3, product: 'Tablet' },
];

// Endpoint que devuelve pedido con info de usuario
app.get('/orders/:id', async (req, res) => {
  const order = orders.find(o => o.id === +req.params.id);
  console.log("order ",order)
  if (!order) return res.status(404).json({ error: 'Order not found' });

  try {
    // Llamamos a users-service para obtener datos de usuario usando fetch
    const userResponse = await fetch(`http://localhost:3002/users/${order.userId}`);
    if (!userResponse.ok) { // Verifica si la respuesta HTTP fue exitosa
      // Intenta parsear el cuerpo del error si está disponible
      const errorData = await userResponse.json().catch(() => ({}));
      throw new Error(`HTTP error! status: ${userResponse.status}, message: ${errorData.error || userResponse.statusText}`);
    }
    const user = await userResponse.json(); // Parsea la respuesta JSON

    // Respondemos con el pedido + info usuario
    res.json({ ...order, user });
  } catch (error) {
    // Si falla obtener usuario o hay un error HTTP
    console.error('Error fetching user from users-service:', error.message);
    res.status(500).json({ error: 'User service error or user not found' });
  }
});

app.listen(3001, () => {
  console.log('Orders service running on port 3001');
});