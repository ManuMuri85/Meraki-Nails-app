const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/services', (req, res) => {
  res.json({ services: [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API running on ' + PORT));