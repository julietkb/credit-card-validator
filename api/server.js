const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const port = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const validateCreditCard = (creditCard) => {
  // TODO: implement validation algorithm
  return true;
};

app.post('/api/validateCreditCard', async (req, res) => {
  const { creditCard } = req.body;
  if (!creditCard) {
    return res.status(400).json({ error: 'A credit card number is required.' });
  }
  const isValid = validateCreditCard(creditCard);
  res.json({ isValid });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});