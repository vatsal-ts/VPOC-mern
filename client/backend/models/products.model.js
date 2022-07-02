const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required:true
    },
    productImage: {
        type : String
    },
    sellerid: {
        type: String,
        required: true,
    },
    buyerid : {
        type : String,
        // reequired:true
    }
}, {
    timestamps: true,
}
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
