const router = require("express").Router();
let Product = require('../models/products.model');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/uploads/images');
  },
  filename: function(req, file, cb) {  
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({storage , fileFilter });

// const upload = multer({ dest: "public/files" });

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const sellerid = req.body.sellerid;
  // const productImage = req.file.filename;

  console.log(req.file)
  
  const newProduct = new Product({
    title,
    description,
    price,
    category,
    sellerid,
    // productImage
  });

  // console.log(newProduct)
  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


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
});

router.route('/buyer/:buyerid').get((req, res) => { 
  buyerid = req.params.buyerid;
  Product.find({"buyerid":buyerid})
      .then(product => res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    id = req.params.id;
    Product.findById(id)
      .then(product => {
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        //product.profileImage = "default_url" (to update default url)
  
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




