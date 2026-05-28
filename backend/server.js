const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

const DATA_FILE = './data.json';

function readData() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  writeData({ wallet: 0, expenses: [] });
}

app.get('/api/expenses', (req, res) => {
  try {
    const data = readData();
    res.json(data.expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/expenses', (req, res) => {
  try {
    const newEntry = { ...req.body };
    const data = readData();

    if (newEntry.type === 'Income') {
      data.wallet += newEntry.amount;
    } else if (newEntry.type === 'Expense') {
      data.wallet -= newEntry.amount;
    }

    data.expenses.push(newEntry);
    writeData(data);

    res.status(201).json({ message: 'Entry added successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/wallet', (req, res) => {
  try {
    const data = readData();
    res.json({ balance: data.wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/wallet', (req, res) => {
  try {
    const { balance } = req.body;
    const data = readData();
    data.wallet = balance;
    writeData(data);
    res.json({ message: 'Balance updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/expenses/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = req.body;
    const data = readData();

    const index = data.expenses.findIndex(e => e.id.toString() === id.toString());
    if (index === -1) return res.status(404).json({ error: 'Expense not found' });

    const old = data.expenses[index];

    if (old.type === 'Income') data.wallet -= old.amount;
    else data.wallet += old.amount;

    if (updatedEntry.type === 'Income') data.wallet += updatedEntry.amount;
    else data.wallet -= updatedEntry.amount;

    data.expenses[index] = { ...old, ...updatedEntry };
    writeData(data);

    res.json({ message: 'Expense updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/expenses/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();

    const expenseIndex = data.expenses.findIndex(e => e.id.toString() === id.toString());
    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const [deletedExpense] = data.expenses.splice(expenseIndex, 1);

    if (deletedExpense.type === 'Income') {
      data.wallet -= deletedExpense.amount;
    } else {
      data.wallet += deletedExpense.amount;
    }

    writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});