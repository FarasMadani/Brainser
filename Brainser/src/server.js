import express from 'express';

const app = express();

app.use(express.json());

app.listen(5173, () => {
  console.log('Server is running on port 5173');
});
