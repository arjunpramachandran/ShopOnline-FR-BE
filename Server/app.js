const express = require('express')
const mongoose = require('mongoose')
const Product = require('./model/product')

const app = express()
const port = 3000

const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret_key = process.env.JWT_SECRET_KEY

const cors = require('cors');
const bcrypt = require('bcryptjs');
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World')

})



async function main() {
    await mongoose.connect('mongodb+srv://achuarjun138:arjunpramachandran123@cluster0.4i0cc.mongodb.net/Entri-e54')
}
main()
    .then(() => console.log('DB Connected Successfully'))
    .catch(err => console.log(err))



const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return res.sendStatus(401)
    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).json(err)    //invalid token
        req.user = user;
        next()
    })

}

//Create product

app.post('/products', authenticateToken, async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Product Details Cannot be Empty" })
        }
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
})

//Get All Products

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
//Get Product by Count price greaterthan input value

app.get('/products/count/:price', async (req, res) => {
    try {
        const price = Number(req.params.price)
        const productCount = await Product.aggregate([
            { $match: { price: { $gt: price } } },
            { $count: "Product Count" }
        ])
        res.status(200).send(productCount)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

//get the average price of all products

//Get Product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ error: "Invalid Product ID format" })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        else {
            res.status(200).json(product)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


//update 

app.patch('/products/:id', async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(400).json({ error: "Product ID is required" })
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Product Details Cannot be Empty" })
        }

        if (!mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ error: "Invalid Product ID format" })
        }

        const product = await Product.findByIdAndUpdate(productID, req.body, { new: true })
        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})

//delete
app.delete('/products/:id', async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(400).json({ error: "Product ID is required" })
        }



        if (!mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ error: "Invalid Product ID format" })
        }

        const product = await Product.findByIdAndDelete(productID)
        if (!product) {
            return res.status(404).json({ error: "Product Not Found" })
        }
        res.status(200).json({ message: "Product Deleted Succesfully" })


    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})


//Users

const User = require('./model/user')
const user = require('./model/user')


//create User -SignUp form for frontend

app.post('/user', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "User Details Cannot be Empty" })
        }
        const { email ,phone} = req.body;

        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const existingUserPhone = await User.findOne({ phone });
        if (existingUserPhone) {
            return res.status(400).json({ message: "Phone Number already exists" });
        }
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {


            var userItem = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                createdAt: new Date()
            }

            var user = new User(userItem)
            await user.save()
            res.status(201).json(user)


        })


    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


//Login-SignIn from Frontend

app.post('/login', async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ message: "Login Details Cannot be Empty" })
        }
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({message: "Email and Password are Required" })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })

        }


        const isValid =await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(500).json({ message: "Invalid Password" })
        }


        //Create Token

        let payload = { user: email }


        let token = jwt.sign(payload, secret_key)
        res.status(200).json({ message: 'Login Succesfull', token: token })


    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }



})

app.listen(port, () => {
    console.log("Server Started");

})