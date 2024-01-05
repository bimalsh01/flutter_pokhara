const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const cloudinary = require("cloudinary");

const createProduct = async (req, res) => {
    // step:1 Check incomming data
    console.log(req.body);
    console.log(req.files);

    // step: 2 Destructuring
    const {productName, 
        productPrice, 
        productDescription, 
        productCategory} = req.body;
    const {productImage} = req.files;

    // step: 3 Validate
    if(!productName || !productPrice || !productDescription || !productCategory || !productImage){
        return res.send("Enter all the fields!!");
    }

    try {

        // step 4 : Upload image to cloudinary
        const uploadImage = await cloudinary.v2.uploader.upload(
            productImage.path,
            {
                folder : "Products",
                crop : "scale"
            }
        )

        // step 5 : Save the product to database
        const newProduct = new Product({
            productName : productName,
            productPrice : productPrice,
            productDescription : productDescription,
            productCategory : productCategory,
            productImageUrl : uploadImage.secure_url
        })
        await newProduct.save();
        res.json({
            message : "Product created successfully!!",
            newProduct
        })
        
    } catch (error) {
        console.log(error);
        res.send ("Server error!");
    }

};

// get all products:
const getAllProducts = async (req,res) =>{
    try {
        const AllProducts = await Product.find({});
        res.json({
            message : "All products fetched successfully!!",
            products : AllProducts
        })
        
    } catch (error) {
        console.log(error);
        res.send("Server error!");
    }
}

// update product:
// delete product:
const deleteProduct = async (req,res) =>{
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.send("Product deleted successfully!!");
        
    } catch (error) {
        console.log(error);
        res.send("Server error!");
    }
}


// order product:
const orderProduct = async (req,res) =>{
    console.log(req.body);
    // step: 2 Destructuring
    const {
        orderId,
        total,
        payment,
        cart,
        address,
        userId
    } = req.body;

    // step: 3 Validate
    if(!orderId || !total || !cart || !address || !payment){
        return res.send("Enter all the fields!!");
    }

    try {
        // step 4 : Save the order to database
        const newOrder = new Order({
            orderId : orderId,
            total : total,
            cart : cart,
            address : address,
            payment : payment,
            userId : userId
        })
        await newOrder.save();
        res.json({
            message : "Order created successfully!!",
            newOrder
        })
        
    } catch (error) {
        console.log(error);
        res.send ("Server error!");
    }


}

// getOrders by id
const getOrdersbyId = async (req,res) =>{
    try {
        const userId = req.params.id;
        const orders = await Order.find({userId : userId});
        res.json({
            message : "Order fetched successfully!!",
            orders : orders
        })
        
    } catch (error) {
        console.log(error);
        res.send("Server error!");
    }
}





module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    orderProduct,
    getOrdersbyId
};