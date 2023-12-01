const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const port = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const validateCreditCard = (creditCard) => {
  if (creditCard.length < 15 || creditCard.length > 16) {
    return false;
  }

  const digits = creditCard.split("").map(d => Number(d));
  for (let i = digits.length - 2; i >= 0; i -= 2) {
    let double = digits[i] * 2;
    if (double > 9) {
      double -= 9;
    }
    digits[i] = double;
  }
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return sum % 10 === 0;
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