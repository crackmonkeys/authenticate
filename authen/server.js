const uri = require('./uri.js'); 
const { MongoClient } = require('mongodb'); 


const client = new MongoClient(uri); 
const dbName = "users";
const collectionName = "users"; 
const accountsCollection = client.db(dbName).collection(collectionName); 


// express server 
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const app = express();
//localhost:3000 
const port = 3000;


// CORS MIDDLEWARE 
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}


app.use(cors());
app.use(allowCrossDomain); 
app.use(bodyParser.json());


const connectToDatabase = async () => { 
  try { 
    await client.connect();
    console.log("Connected to database"); 
  } catch (e) { 
    console.error(e);
  }
}; 


// POST REQUEST 
app.post('/login', (req, res) => { 
  const user = req.body.username;
  const pass = req.body.password; 


  findUser(user, pass)
    .then((result) => { 
      if (result != null) {
        res.send("result"); 
      } else { 
        res.send("not found"); 
      }
    })
    .catch((err) => { 
      res.send("not found"); 
    });

}
);
    

const findUser = (user, pass) => {
  return new Promise((resolve, reject) => { 
   accountsCollection.findOne({username: user, password: pass}, (err, result) => {
       if (err) {
           reject(err);
       } if (user) {
           resolve(result);
       } else { 
           reject("User not found");  
       }
   }); 
   });
} 


app.put('/signup', (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;


  insertUser(user, pass) 
    .then((result) => {
      res.send("added");
    })
    .catch((err) => {
      res.send("not added");
    }
    );
}
); 


const insertUser = (user, pass) => { 
  return new Promise((resolve, reject) => { 
    accountsCollection.insertOne({username: user, password: pass}, (err, result) => { 
      if (err) {
        reject(err);
      } if (user) {
        resolve(result);
      } else {
        reject("User not added");
      }
    });
  });
}


const main = async () => {
    try {
        await connectToDatabase(); 
    } catch (e) { 
        console.error(e); 
    }

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);    
  });
  
 }

main();