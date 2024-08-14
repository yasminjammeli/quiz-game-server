const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json(err));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email, password })
    .then(employee => {
        if (employee) {
            res.json(employee);
        } else {
            res.status(400).json({ error: 'Invalid email or password' });
        }
    })
    .catch(err => res.status(400).json(err));
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
