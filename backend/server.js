const express = require('express');
const cors      = require('cors');
const app = express();
const path = require('path');
const { default: mongoose } = require('mongoose');
const Product = require('./models/Product');
const Beauty = require('./models/Beauty');
const Electronic = require('./models/Electronic');
const Apparel = require('./models/Apparel');
const User = require('./models/User');
const authRoutes = require("./routes/auth");
const http = require('http');
const { Server } = require('socket.io');

const PORT = 8080;
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 27017;

//Enable CORS for frontend requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// === AUTH ROUTES ===
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    }
  });

io.on('connection', (socket) => {
    console.log(`${socket.id} is connected`);
  
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
    });
  });

io.on('connection', (socket) => {
  
    socket.on('new_product_added', (productData) => {
      socket.broadcast.emit('update_product_list', productData);
    });
  
    socket.on('product_deleted', (pid) => {
      socket.broadcast.emit('remove_product_from_list', pid);
    });
  
    socket.on('product_updated', (pid) => {
      socket.broadcast.emit('refresh_single_product', pid);
    });
  
  });
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

db.dropDatabase();

// List of products
let product_library = [
    { pid:1, hasImage:true, title:"Beats Studio Pro - Beats by Dr. Dre", name:"beats", price:349.99, stock:4, inCart:false, note:""},
    { pid:2, hasImage:true, title:"14 Inch Mac Book Pro - Apple", name:"macbookpro",  price:2099, stock:2, inCart:false, note:""},
    { pid:3, hasImage:true, title:"Pink iPhone 13 - Apple", name:"iphone", price:649.99, stock:6, inCart:false, note:""},
    { pid:4, hasImage:true, title:"BL Clip 4 - Portable Mini Bluetooth Speaker", name:"jbl", price:69.98, stock:12, inCart:false, note:""},
    { pid:5, hasImage:true, title:"INIU Wireless Charger, 15W Qi", name:"charger",  price:25.99, stock:23, inCart:false, note:""},
    { pid:6, hasImage:true, title:"Airpods 4 - Apple", name:"airpods",  price:149.99, stock:8, inCart:false, note:""},
    { pid:7, hasImage:true, title:"Meta Quest 3S 128GB | VR Headset", name:"metaquest",  price:349.99, stock:3, inCart:false, note:""}
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

let blib = [
    { pid:8, hasImage:false, title:"purse", name:"purse", price:349.99, stock:4, brand:"lululemon", note:""},
    { pid:9, hasImage:false, title:"lipstick", name:"lipstick",  price:2099, stock:2, brand:"shein" ,note:""}];

/*************************************************/
/********* Defining (CRUD) API routes ************/
/*************************************************/

async function addBeautyInit() {
    const bcount = await Beauty.countDocuments();

    if (bcount === 0) {
        console.log('Adding test beauty products to db ...');

        blib.forEach(product => {
            const newProduct = new Beauty(product);
            newProduct.save()
                .then(() => console.log('Product added with Title' + product.title))
                .catch(err => console.error('Error adding product with Title: ' + product.title + ' ' + err));
        });
    }
    else {
        console.log('Beauts already exist. Not adding test products.');
        return;
    }
}

async function addTestProductsToMongoDB() {
    const productCount = await Electronic.countDocuments();

    if (productCount === 0) {
        console.log('Adding test electronics to db ...');

        product_library.forEach(product => {
            const newProduct = new Electronic(product);
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
addBeautyInit();

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

app.get('/api/beauty', async (req, res) => {
    try {
            const products = await Beauty.find({});           
            console.log("Products found:", products.length);
            res.json(products); 
        } catch (err) {
            console.error(err);
        }
});

app.get('/api/apparel', async (req, res) => {
    try {
            const products = await Apparel.find({});           
            console.log("Products found:", products.length);
            res.json(products); 
        } catch (err) {
            console.error(err);
        }
});

app.get('/api/electronic', async (req, res) => {
    try {
            const products = await Electronic.find({});           
            console.log("Products found:", products.length);
            res.json(products); 
        } catch (err) {
            console.error(err);
        }
});

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

app.delete('/api/products/pid/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid;

        const productToDelete = await Product.findOne({ pid: prodId.toString() });

        if (!productToDelete) {
            return res.status(404).json({ error: "Product not found" });
        }

        await User.updateMany(
            {}, 
            { $pull: { cart: { product: productToDelete._id } } }
        );

        await Product.deleteOne({ _id: productToDelete._id });

        res.status(204).send();

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Server Error while deleting product" });
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

app.post('/api/cart/add', async (req, res) => {
    try {
        const { email, productId } = req.body; 

        const user = await User.findOne({ email: email });

        user.cart.push({ product: productId });

        await user.save();
        res.status(200).json(user.cart);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post('/api/cart/remove', async (req, res) => {
    try {
        const { email, productId } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $pull: { cart: { product: productId } } },
            { return: 'after' } 
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Removed successfully", cart: updatedUser.cart });

    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get('/api/cart/:email', async (req, res) => {
    try {
        const email = req.params.email;
        
        if (!email) {
            return res.status(400).json({ message: "Email is required to fetch cart." });
        }

        const user = await User.findOne({ email: email }).populate('cart.product');
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user.cart);

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});