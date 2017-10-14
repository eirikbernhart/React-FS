
const express = require('express');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const cors = require('cors');
const bCrypt = require('bcryptjs');

const db = require('mongoose');
db.connect('mongodb://eirik:testpass@ds113935.mlab.com:13935/automobiles');
const secret = 'topsecret';

const User = db.model('User', {
    username: {type: String, required: true},
    passwordHash: {type: String, required: true}
})

function createUser(username, password) {
    const newUser = new User({
        username,
        passwordHash: bCrypt.hashSync(password, 10)
    });
    newUser.save();
}

const app = express();
app.use('/', bodyParser.json());
app.use('/', cors());

app.get('/', (req, res) => {
    res.send('hello')
})


//const user = [];


/*app.get('/users)', (req, res) => {    
    res.send(users);
})*/



//POST
/*app.post('/authenticatedUsers', (req, res) => {
    console.log("KOM VI HER.1")
    
    //const user = req.body;
    const username = req.body.username;
    const password = req.body.password;

    /*const UserWithHashedPass = {
        username: user.username,
        password: bCrypt.hashSync(user.password)
    }*/

    /*if(!user.username) {
        res.status(400).send('Must contain username');
        return;
    }

    if(!user.password) {
        res.status(400).send('Must contain password');
        return;
    }*/

    //users.push(UserWithHashedPass);
    //res.send(201).send();

    /*User.findOne({username: username})
        .then(user => {
            if(!bCrypt.compareSync(password, user.passwordHash)) {
                res.status(401).send('wrong password');
            } else {
                const token = jwt.encode({
                    username
                }, secret);
                console.log("KOM VI HER.2")
                res.send(token);
            }
        })
        .catch(err => {
            return res.status(401).send('no such user');
        })
});*/

//GET BASED ON VALID TOKEN
app.get('/automobiles', (req, res) => {
    const token = req.header('X-Token');

    if(!token) {
        return res.status(401).send('No token supplied via header X-Token');
    }

    const user = jwt.decode(token, secret);

    Automobile.find((err, automobiles) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.send(automobiles);
    })
})



// 1. Finn brukeren med brukenavn
/*const matchedUSer = users.find(potentialMtach => potentialMtach.username === user.username)
if(matchedUSer == null ){
    res.status(401).send('No such user');
    return
}
// 2. sammelikn passord
const passMatch = bCrypt.compareSync(
    user.assword,
    matchedUSer.password
);
if(!passMatch) {
    res.send(401).send('Wrong pass');
    return
}

//3. Hvis feil 
app.post('login', (req, res) => {

})

//4. hvis rett
const token = jwt.encode(payload, jwtSecret);*/

app.listen(1234, () => console.log('listening to 1234'));

