const router = require("express").Router();
let User = require('../models/users.model');

router.route('/profile/:id').get((req, res) => { 
    id = req.params.id;
    User.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').get((req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ "email": email , "password" : password })
        .then(user => {
            if(user)
                res.json(user)
            else
                res.json('Invalid Email or password')
        })
        .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/register').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    //to Update seller!!

    const newUser = new User({
        username,
        email,
        password
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    id = req.params.id;
    User.findById(id)
        .then(user => {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            // user.phone = req.body.phone;
            // user.address = req.body.address;
            // user.image = req.body.image;
            // user.image = "default_url" (to update default url)

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;