//const ws = require('ws'); Websocket-related
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
            //console.log(automobiles)
            
            res.send(automobiles)
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


    let car = new Automobile(body);

     car.save((err, savedCar) => {
       

        if(err) {
            res.status(500).send(err);
        }
        console.log("Posted car on server: " + JSON.stringify(savedCar));
        console.log("Posted car on server: " + savedCar._id);
        res.send(savedCar);
    }); 
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
    const id = req.params._id;
    Automobile.remove({ '_id' : id}, (err)=> {
        if(err) {
           console.log("ERROR i delete:" +  err);
        }

        res.send();
    })
})

function pushToServer() {
    console.log("SERVER: Item was pushed");
}

function pushToInspirationsListPull() {
    console.log("SERVER: Item was pulled");
}


//SOCKET.IO TRY 2

io.on('connection', function(socket){
    console.log(`Socket ID: ${socket.id}`); //ID per user connected ?!QUE!?!
    socket.on('testEvent', () => io.emit('testEvent'));
});

server.listen(1234);



//httpServer = app.listen(1234, () => console.log('LISTENING TO 1234!!!!!!')); //DON'T DELETE!









































//SOCKET RELATED


//WEBSOCKETS
/** 
let sockets = [];


const wsServer = new ws.Server({
    server: httpServer,
});

wsServer.on('connection', (socket) => {
    sockets.push(socket)
    socket.send('Hello!, from server');

    socket.on('close', () => {
        console.log('Disconnected, from server :(');
        sockets = sockets.filter(savedSocket => savedSocket !== socket);
    });

    socket.on('message', text => {
        sockets.forEach(socket => socket.send(text));
    });
});
**/


//SOCKET.IO TRY 1
/*const io = require('socket.io')();

io.on('connection', (client) => {
  // here you can start emitting events to the client
  
  
    client.on('subscribeToTimer', (interval) => {
        console.log('Client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('pushToServer', (pushedItem) => {
        pushToServer();
        client.emit('pushedItem', pushToInspirationsListPush())
        
    });

    client.on('subscribeToInspirationListPull', (pushedItem) => {
        pushToInspirationsListPull();
        client.emit('pushedItem', pushToInspirationsListPull())
        
    });



});*/