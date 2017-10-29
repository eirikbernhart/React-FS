const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/automobiles');

const express = require('express');
const app = express();

const cors = require('cors');
app.use('/', cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

const automobileSchema = new mongoose.Schema({
 name: { type: String, required: true },
 price: { type: Number, required: true },
});

const Automobile = mongoose.model('Car', automobileSchema);

app.get('/automobiles', (req, res) => {
    Automobile.find((err, automobiles) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.send(automobiles);
    })
});

app.post('/automobiles', (req, res) => {
    const body = req.body;

    let car = new Automobile(body);
     car.save((err, savedCar) => {
        if(err) {
            console.log("body: " + JSON.stringify(body))
            res.status(500).send(err);
            console.log("savedCar: " + savedCar)
        }
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