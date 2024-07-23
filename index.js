const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: {type: String}, 
  mySID: {type: String}
})

// Create a Model object
const Student = new mongoose.model("S24student", studentSchema);

const me = new Student({
  myName: "Isabel Agbu",
  mySID: "300378791"
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const myURI = req.body.myuri;
  // connect to the database and log the connection
  //connect to the cloud
mongoose.connect(myURI, { useNewUrlParser: true }) 
.then(data => { 
console.log('Mongo DB connection success!') 
}) 
.catch(err => { 
console.log('Mongo DB connection failed: ' + err.message) 
});


  // add the data to the database
  me.save()
  .then(student => console.log(student))
  .catch(err => console.error(err));

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
