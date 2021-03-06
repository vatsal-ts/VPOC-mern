const router = require("express").Router();
let Category = require('../models/category.model');


router.route('/').get((req, res) => { 
    Category.find({})
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
