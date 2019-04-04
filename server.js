const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mathList', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
  operation: String,
  expression: String,
  result: String,
});

const Item = mongoose.model('Item', itemSchema);



let favoritesList = [];

app.post('/api/favoritesList', async (req, res) => {
  let item = new Item({
    operation: req.body.operation,
    expression: req.body.expression,
    result: req.body.result,
  });
  try {
    await item.save();
    console.log(item);
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/favoritesList', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));