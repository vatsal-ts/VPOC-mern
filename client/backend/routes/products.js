const router = require("express").Router();
let Product = require('../models/products.model');
let User = require('../models/users.model');
const upload = require("../middleware/upload");

// const upload = multer({ dest: "public/files" });

router.post('/add',upload.single("productImage"),(req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const sellerid = req.body.sellerid;
  const productImage = req.file.filename;
  
  const newProduct = new Product({
    title,
    description,
    price,
    category,
    sellerid,
    productImage
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/allproducts').get((req, res) => { 
  category = req.params.category;
  Product.find({})
      .then(product => res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
})

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

router.route('/update/:id').post(upload.single("productImage"),(req, res) => {
  id = req.params.id;
  Product.findById(id)
    .then(product => {
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      product.category = req.body.category;
      product.productImage = req.file.filename;

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

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id
    Product.findByIdAndDelete(id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));

    User.find({})
      .then(users => {

        users.map((user)=>{
          if(user.wishList.includes(id)){
            user.wishList.pull(id)

            user.save()
          }
        })
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;




