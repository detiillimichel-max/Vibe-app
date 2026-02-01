​<!-- end list -->const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('<h1>Vibe App está ONLINE!</h1><p>Seu servidor acordou com sucesso.</p>');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
