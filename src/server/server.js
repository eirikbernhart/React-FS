const express = require('express');

//*********Socket.IO-related*****/
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//*******************************/

const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://eirik:testpass@ds113935.mlab.com:13935/automobiles');  //Remote db
//mongoose.connect('mongodb://localhost/automobiles'); //Local db

const secret = 'topsecret';
const Schema = mongoose.Schema;

//MODEL STRUCTURE
const User = mongoose.model('users', {
    username: {type: String, required: true},
    passwordHash: {type: String, required: true}
})

//MODEL STRUCTURE
const Automobile = mongoose.model('cars', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: String, required: true },
    isPublic: { type: Boolean, required: true }
});



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
    console.log("JWT from client, in GET: " + JSON.stringify(user));
        Automobile.find((err, automobiles) => {
            if(err) {
                res.status(500).send(err);
                return;
            }
            var privateAutomobiles = automobiles.filter(x => x.owner === user.username);
            console.log("Private autos: " + privateAutomobiles);

            res.send(privateAutomobiles);
        }) 
    
})

app.get('/automobilesPublic', (req, res) => {
    Automobile.find((err, automobiles) => {
        if(err) {
            res.status(500).send(err);
            return;
        }

        var publicAutomobiles = automobiles.filter(x => x.isPublic === true);

        console.log("All public cars: " + publicAutomobiles);
        
        res.send(publicAutomobiles)
    }) 
})


app.post('/automobiles', (req, res) => {
    const body = req.body;
    const token = req.header('X-Token');
    if(!token) {
        return res.status(401).send('No token supplied via header X-Token');
    }
    const user = jwt.decode(token, secret);
    if(body.owner === user.username) {
        let car = new Automobile(body);

        car.save((err, savedCar) => {
       

        if(err) {
            res.status(500).send(err);
        }
        console.log("Posted car on server: " + JSON.stringify(savedCar));
        console.log("Posted car on server: " + savedCar._id);
        res.send(savedCar);
    }); 
    }
});

app.put('/automobiles/:_id', (req, res) => {
    const id = req.params._id;
    Automobile.findById(id, (err, automobile) => {
        if(err) {
            res.status(500).send(err);
        } else {
            console.log("SERVER: IS IT PUBLIC: " + automobile.isPublic);
            if(!automobile.isPublic) {                      
                automobile.isPublic = true;    
            } else if (automobile.isPublic) {
                automobile.isPublic = false;
            }
        
        automobile.save((err, automobile) => {
            if(err) {
                res.status(500).send(err);
            }
            res.status(200).send(automobile);
        });
        }
    });
});

app.delete('/automobiles/:_id', (req, res) => {

    const token = req.header('X-Token');
    if(!token) {
        return res.status(401).send('No token supplied via header X-Token');
    }
    const user = jwt.decode(token, secret);
    const id = req.params._id;
    console.log("HVAÆR ID: " + id);

    Automobile.findById(id, (err, data) => {
        if(err) {
            console.log("Permission denied!")
        } else {
            console.log("Found car: " + JSON.stringify(data));
            console.log("Found cars owner: " + data.owner);
            if(data.owner === user.username) {
                Automobile.remove({ '_id' : id}, (err)=> {
                if(err) {
                    console.log("Car not found!:" +  err);
                }

                res.send();
             })
            }
        }
    });
})

function pushToServer() {
    console.log("SERVER: Item was pushed");
}

function pushToInspirationsListPull() {
    console.log("SERVER: Item was pulled");
}


io.on('connection', function(socket){
    console.log(`Socket ID: ${socket.id}`); 
    socket.on('testEvent', () => io.emit('testEvent'));
});

server.listen(1234);

