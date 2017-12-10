const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/automobiles');
mongoose.connect('mongodb://eirik:testpass@ds113935.mlab.com:13935/automobiles');  //Remote db


const express = require('express');
const app = express();

const cors = require('cors');
app.use('/', cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

const Automobile = mongoose.model('cars', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    //owner: { type: String, required: true },
    //isPublic: { type: Boolean, required: true }
});


app.get('/automobiles', (req, res) => {
    Automobile.find((err, automobiles) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        console.log("Cars: " + automobiles);
        res.send(automobiles);
    })
});

app.post('/automobiles', (req, res) => {
    const body = req.body;

    let car = new Automobile(body);
     car.save((err, savedCar) => {
        if(err) {
            //console.log("body: " + JSON.stringify(body))
            res.status(500).send(err);
        }
        console.log("savedCar: " + savedCar)
        res.send(savedCar);
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

app.listen(1234, () => console.log("Listening on port 1234!"));