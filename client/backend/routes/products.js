const router = require("express").Router();
let Product = require('../models/products.model');

router.route('/category/:category').get((req, res) => { 
    category = req.params.category;
    Product.find({"category":category})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/seller/:sellerid').get((req, res) => { 
    sellerid = req.params.sellerid;
    Product.find({"sellerid":sellerid})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/buyer/:buyerid').get((req, res) => { 
  buyerid = req.params.buyerid;
  Product.find({"buyerid":buyerid})
      .then(product => res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const sellerid = "62bb10b1cdf7aa4ebba2b076";
    //to Update seller!!
    
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      sellerid
    });
  
    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    id = req.params.id;
    Product.findById(id)
      .then(product => {
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.phone = req.body.p;
        // product.image = "default_url" (to update default url)
  
        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { 
    id = req.params.id;
    Product.findById(id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;




