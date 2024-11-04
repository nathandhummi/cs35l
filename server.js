const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myMernApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
