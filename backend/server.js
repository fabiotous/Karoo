const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

// List of products
let product_library = [
    { pid:1, hasImage:true, title:"Beats Studio Pro - Beats by Dr. Dre", name:"beats", category:"Electronics", price:349.99, stock:4, note:""},
    { pid:2, hasImage:true, title:"14 Inch Mac Book Pro - Apple", name:"macbookpro", category:"Electronics", price:2099, stock:2, note:""},
    { pid:3, hasImage:true, title:"Pink iPhone 13 - Apple", name:"iphone", category:"Electronics", price:649.99, stock:6, note:""},
    { pid:4, hasImage:true, title:"BL Clip 4 - Portable Mini Bluetooth Speaker", name:"jbl", category:"Electronics", price:69.98, stock:12, note:""},
    { pid:5, hasImage:true, title:"INIU Wireless Charger, 15W Qi", name:"charger", category:"Electronics", price:25.99, stock:23, note:""},
    { pid:6, hasImage:true, title:"Airpods 4 - Apple", name:"airpods", category:"Electronics", price:149.99, stock:8, note:""},
    { pid:7, hasImage:true, title:"Meta Quest 3S 128GB | VR Headset", name:"metaquest", category:"Electronics", price:349.99, stock:3, note:""}
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

//GET HTTP method to get all products
// TO DO
app.get('/api/products', (req, res) => {
    res.json(product_library);
    console.log(product_library);  //want to see results for debugging
});


//GET HTTP except for PID 

app.get('/api/products:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = product_library.find(b => b.pid === pid);

    if (product) {
        res.status(200).json(product); 
    } else {
        res.status(404).json({error: "Product not found"})
    }
});

 //

// POST HTTP method to add a new product
// TO DO
app.post('/api/products', express.json(), (req,res) => {
    const newProd = req.body;

    if (newProd && newProd.title && newProd.name && newProd.category && newProd.price && newProd.stock) {
        if (!newProd.hasImage) {
            newProd.hasImage = false; 
        }
        product_library.push(newProd);
        res.status(201).json(newProd);
    } else {
        res.status(400).json({ error: "Invalid Product data" });
    }
}
);


// DELETE HTTP method to delete a product
// TO DO

app.delete('/api/products/pid/:pid', (req,res) => {
    const prodId = parseInt(req.params.pid);
    const prodIndex = product_library.findIndex(b => b.pid === prodId);
    if (prodIndex !== -1) {
        const deletedProd = product_library.splice(prodIndex, 1);
        res.status(204).json(deletedProd[0]);
    } else {
        res.status(404).json({error : "Product not found"});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});