const e = require('express');
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours' , (req, res) => {
    res.status(200).json({
        message: 'success',
        result: tours.length,
        data: {
            tours: tours
        }
    })
})

app.post('/api/v1/tours' , (req, res) => {
    const ID = tours[tours.length-1].id+1;
    console.log(ID);
    const data = {
        id: ID,
        message: "success",
        data: req.body
    }
    const push = tours.push(data);
    console.log(req.body);
    console.log(push);
    console.log(tours);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json` , tours)
    res.send('DONE!');
})

// app.get('/', (req, res) => {
//     res.json({message: 'Hello from the server!' , value: 10}); 
// })

// app.post('/', (req, res) => {
//     res.send('listen to the server endpoint!');
// })

app.listen(3000 , () => {
    console.log('server has started to listen');
})