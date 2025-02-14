import express from 'express';

const app = express();

app.use(express.json());

// Remove the Google OAuth endpoint
// app.post('/auth/google', async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = await verifyToken(token);
//     // Handle user authentication and session creation
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

app.listen(5173, () => {
  console.log('Server is running on port 5173');
});
