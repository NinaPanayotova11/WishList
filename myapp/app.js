const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();
app.use(express.urlencoded({extended: true}));
const mongodb = 'mongodb+srv://new_user_12:NodejsProject12@cluster0.edl64.mongodb.net/item-database?retryWrites=true&w=majority'
app.set('view engine', 'ejs');
mongoose.connect(mongodb, { useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
  console.log('connected');
  app.listen(3000);
}).catch(err=>console.log(err));

// app.get('/create-item',(req,res)=>{
//   const item = new Item({
//     name:'computer', 
//     price:2000
//   });
//   item.save().then(result=>res.send(result));
// });

app.get('/',(req,res)=>{
  res.redirect('/get-items')
  // res.sendFile('./views/index.html',{root:__dirname})
});
app.get('/get-items',(req,res)=>{
  Item.find().then(result=> 
    res.render('index', {items:result})).catch(err=>console.log(err));;
});
app.get('/add-item',(req,res)=>{
  res.render('add-item')
  // res.sendFile('./views/add-item.html',{root:__dirname})
});

app.post('/items',(req,res)=>{
  console.log(req.body);
  const item = Item(req.body);
  item.save().then(()=>{
    res.redirect('/get-items')
  }).catch(err=>console.log(err));
});

app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findById(id).then(result => {
      console.log('result', result);
      res.render('item-details', { item: result })
  })
});

app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id).then(result => {
    res.json({redirect: '/get-items'})
  })
});

app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body).then(result => {
    res.json({msg: 'Updated Successfully'})
  })
});

app.use((req,res)=>{
  res.render('404')
  // res.sendFile('./views/404.html',{root:__dirname})
});
