
//DEPENDENCIES
const express = require('express');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
//mongoose.connect('mongodb://eirik:testpass@ds113935.mlab.com:13935/automobiles');  //Remote db
mongoose.connect('mongodb://localhost/automobiles'); //Local db

const secret = 'topsecret';

//MODEL STRUCTURE
const User = mongoose.model('User', {
    username: {type: String, required: true},
    passwordHash: {type: String, required: true}
})

const Automobile = mongoose.model('Car', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
   });



const app = express();
app.use('/', bodyParser.json());
app.use('/', cors());

app.get('/', (req, res) => {
    res.send('hello!!!')
})

//SHOW USERS for testing purposes
app.get('/users', (req, res) => {
    User.find((err, users) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.send(users)        
    })
});
//LOG IN USER
app.post('/usersAuth', (req, res) => {

    // verify username + password
    const username = req.body.username;
    const password =  req.body.password;

    User.findOne({username: username})
        .then(user => {
            if (!bcrypt.compareSync(password, user.passwordHash)) {
                res.status(401).send('wrong password');
            } else {

        // generate token
        const token = jwt.encode({
             username
        }, secret);

        // send token
          res.send(token);
        }
      })
      .catch(err => {
        return res.status(401).send('no such user');
      })
  });


//REGISTER NEW USER
app.post('/users', (req, res) => {
    const body = req.body;
    const username = req.body.username;

    const newUser = new User({
        username: req.body.username,
        passwordHash: bcrypt.hashSync(req.body.password, 10)
    });    

    let user = new User(newUser);
    user.save((err, savedUser) => {
        if(err) {
            res.status(500).send(err);
        }
        const token = jwt.encode({
            username
        }, secret);
        res.send(token); 
    })
})

//GET BASED ON VALID TOKEN
app.get('/automobiles', (req, res) => {
    const token = req.header('X-Token');

    if(!token) {
        return res.status(401).send('No token supplied via header X-Token');
    }

    const user = jwt.decode(token, secret);
    console.log("You are authorized from server with jwt: " + JSON.stringify(user));
    if(user.username == 'testuser') {
        Automobile.find((err, automobiles) => {
            if(err) {
                res.status(500).send(err);
                return;
            }
            //console.log(automobiles)
            
            res.send(automobiles)
        }) 
    }
})


app.post('/automobiles', (req, res) => {
    console.log('Blir POST kjørt?')
    const body = req.body;

    let car = new Automobile(body);
     car.save((err, savedCar) => {
        if(err) {
            res.status(500).send(err);
        }
        res.send(savedCar); 
    });
});

app.delete('/automobiles/:_id', (req, res) => {
    console.log('Blir DELETE kjørt?')
    const id = req.params._id;
    Automobile.remove({ '_id' : id}, (err)=> {
        if(err) {
           console.log("ERROR i delete:" +  err);
        }

        res.send();
    })
})

app.listen(1234, () => console.log('LISTENING TO 1234!!!!!!'));

