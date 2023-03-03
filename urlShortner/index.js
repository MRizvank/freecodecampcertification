require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser=require('body-parser')
const validate = require('url-validator')
// Basic Configuration
const port = process.env.PORT || 3000;
// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }
let shortendUrls={};
let counter=1;
// let shortendUrls=localStorage.getItem('urls')||[];
// let counter=shortendUrls.length;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



app.post('/api/shorturl',(req,res)=>{
  const url=req.body.url;
  // console.log(url);
if(!validate(url)){
  res.json({"error":"invalid url"});
  return;
}
  shortendUrls[counter]=url;
  res.send({original_url :req.body.url,short_url:counter})
  counter++;
})
app.get('/api/shorturl/:id',(req,res)=>{
  const id=req.params.id
  const url=shortendUrls[id];
  res.redirect(url)
  
})

app.listen(port, function() {
    console.log(`Listening on port http://localhost:${port}`);
  });