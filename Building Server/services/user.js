const joi = require('@hapi/joi');
const db = require('../db');
var bcrypt = require('bcryptjs');
const User = db.User;

// Fetch Request Query Parameters With req.query
// Usage: http://localhost:3000/Users?sortBy=date
const getUsers = (req, res, next) => {
    User.find()
    .then((users) => {
        res.json(users)
    }).catch((err) => {
        return next(err)
    })
};      

// Fetch Request Parameters With req.params
// Usage: http://localhost:3000/books/2
const getUser = async (req, res) => {
    console.log('id :', req.params);
    const user = await User.findById(req.params.id);
    if (!user) return next({message: 'No User Found !'})
    res.json(user);
};

// Add New Book With Validations
const createUser = async (req, res) => {
    console.log('body :', req.body);
    const { error } = validatePayload(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    req.body.hash = bcrypt.hashSync(req.body.password, 8);
    delete req.body.password;
    return User.create(req.body, (err, data) => {
        if (err) return next(err);
        res.json(data)
    })
}

const authenticateUser = async (req, res, next) => {
    if (!req.body.password || !req.body.email) {
        return next('Email OR Password is missing')
    }
    console.log('credentials :', req.body)
    const user = await User.findOne({email: req.body.email})
    console.log('user :', user);
    if (!user) return next('No User Found With This Email !')
    const isMatched = await bcrypt.compareSync(req.body.password, user.hash)
    console.log('isMatched :', isMatched);
    if (!isMatched) return next('Password is incorrect !')
    res.json(user);
}


// Add Book With Validations
const updateBook = (req, res) => {
    const book = books.find( book => book.id === parseInt(req.params.id));
    if (!book) return res.status(400).send('Book Not Found ! Please provide a valid ID')
    const { error } = validatePayload(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    book.name = req.body.name;
    res.send(book)
}

// Validate Payload Functionality
const validatePayload = (data) => {
    const schema = {
        firstName : joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string(),
        password: joi.string()
    }
    return joi.validate(data, schema);
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    authenticateUser
};