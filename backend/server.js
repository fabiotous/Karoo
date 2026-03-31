const express = require('express');
const cors      = require('cors');
const app = express();
const path = require('path');
const { default: mongoose } = require('mongoose');
const Product = require('./models/Product');
const authRoutes = require("./routes/auth");

const PORT = 8080;
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 27017;

//Enable CORS for frontend requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// === AUTH ROUTES ===
app.use("/api/auth", authRoutes);

//database connect
const dbURL = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/product_library`;
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on('error', function(e) {
    console.log('error connecting:' + e);
});
db.on('open', function() {
    console.log('database connected!');
});

// List of products
let product_library = [
    { pid:1, hasImage:true, title:"Beats Studio Pro - Beats by Dr. Dre", name:"beats", category:"Electronics", price:349.99, stock:4, inCart:false, note:""},
    { pid:2, hasImage:true, title:"14 Inch Mac Book Pro - Apple", name:"macbookpro", category:"Electronics", price:2099, stock:2, inCart:false, note:""},
    { pid:3, hasImage:true, title:"Pink iPhone 13 - Apple", name:"iphone", category:"Electronics", price:649.99, stock:6, inCart:false, note:""},
    { pid:4, hasImage:true, title:"BL Clip 4 - Portable Mini Bluetooth Speaker", name:"jbl", category:"Electronics", price:69.98, stock:12, inCart:false, note:""},
    { pid:5, hasImage:true, title:"INIU Wireless Charger, 15W Qi", name:"charger", category:"Electronics", price:25.99, stock:23, inCart:false, note:""},
    { pid:6, hasImage:true, title:"Airpods 4 - Apple", name:"airpods", category:"Electronics", price:149.99, stock:8, inCart:false, note:""},
    { pid:7, hasImage:true, title:"Meta Quest 3S 128GB | VR Headset", name:"metaquest", category:"Electronics", price:349.99, stock:3, inCart:false, note:""}
];

app.use('/', express.static(path.join(__dirname, '../frontend/public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/homepage.html'));
});

app.get('/homepage.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/homepage.html'));
});

app.get("/electronic-products.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/electronic-products.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/under-construction.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/under-construction.html'));
});

app.get('/staff.html', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/staff.html'));
});

/*************************************************/
/********* Defining (CRUD) API routes ************/
/*************************************************/

async function addTestProductsToMongoDB() {
    const productCount = await Product.countDocuments();

    if (productCount === 0) {
        console.log('Adding test products to db ...');

        product_library.forEach(product => {
            const newProduct = new Product(product);
            newProduct.save()
                .then(() => console.log('Product added with Title' + product.title))
                .catch(err => console.error('Error adding product with Title: ' + product.title + ' ' + err));
        });
    }
    else {
        console.log('Products already exist. Not adding test products.');
        return;
    }
}
addTestProductsToMongoDB();

//GET HTTP method to get all products
async function getAllProductsfromMongoDB() {
    app.get('/api/products', async (req, res) => {
        try {
            const products = await Product.find({});           
            console.log("Products found:", products.length);
            res.json(products); 
        } catch (err) {
            console.error(err);
        }
    });
}
getAllProductsfromMongoDB();


//GET HTTP except for PID 

app.get('/api/products/search', async (req, res) => {
    const prodTitle = req.query.title; 

    if (!prodTitle) {
        return res.status(400).json({error : "Please enter in a product name"});
    }

    const prods = await Product.find({title : {$regex: prodTitle, $options: "i"}});

    if (prods.length > 0) {
        res.status(200).json(prods); 
    } else {
        res.status(404).json({ error: "No prods found" });
    }
});

app.get('/api/products:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await Product.findOne({pid : pid.toString()});

    if (product) {
        res.status(200).json(product); 
    } else {
        res.status(404).json({error: "Product not found"})
    }
});

 app.patch('/api/products/pid/:pid', express.json(), async (req, res) => {
    
    const prodId = req.params.pid;
    const updatedProd = req.body; 

    const result = await Product.updateOne({pid : prodId.toString()}, {$set: updatedProd});

    res.json(result);

 });

// POST HTTP method to add a new product
// TO DO
app.post('/api/products', express.json(), (req,res) => {
    const newProd = req.body;

    if (newProd && newProd.title && newProd.name && newProd.category && newProd.price && newProd.stock && newProd.note) {
        if (!newProd.hasImage) {
            newProd.hasImage = false; 
        }
        if (!newProd.inCart) {
            newProd.inCart = false;
        }
        const nuProd = new Product(newProd);
        nuProd.save()
            .then(() => console.log('Product added ' + nuProd.pid))
            .catch(err => console.error('error on' + nuProd.pid));

        res.status(201).json(newProd);
    } else {
        res.status(400).json({ error: "Invalid Product data" });
    }
}
);

// DELETE HTTP method to delete a product
// TO DO

app.delete('/api/products/pid/:pid', async (req,res) => {
    const prodId = req.params.pid;
    const result = await Product.deleteOne({pid : prodId.toString()});

    if (result.deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json({error : "Product not found"});
    }
});

// PATCH HTTP method for updating product.inCart
app.patch('/api/products/:pid/cart', express.json(), async (req, res) => {
    const { pid } = req.params;
    const { inCart } = req.body;  
    const product = await Product.findOneAndUpdate(
        { pid },
        { $set: { inCart } }
      );
    res.json(product);
    });


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});