const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connection=require('./config/db')
const bodyParser=require('body-parser')
const userRoutes=require('./routes/user.routes')

const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use('/api',userRoutes)


const listener = app.listen(process.env.PORT || 3000,async() => {
  try{
    await connection
    console.log('connected to db')
    console.log('Your app is listening on http://localhost:' + listener.address().port)
    
  }catch (error){
    console.log('cannot connect to db')
    console.log({"msg":error.message})
  }
})
