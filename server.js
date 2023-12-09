const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/recipeModel');
const User = require('./models/userModel');

app.use(express.json());
app.use(express.static('public'))
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('hello node and Express API!');
})

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// app.post("/register", (req, res) => {
//     // req.body is the result of using app.use(express.urlencoded())
//     console.log(req.body); // This would show the form data in the console.
  
//     // You can then interact with your database here by invoking an operation on a User model.
  
//     User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     }, 
//     (err, user) => {
//       if (err) {
//         console.log(err);
//         res.send("Error registering user.");
//       } else {
//         console.log("Registered user: ", user);
//         res.send("Registered successfully.");
//       }
//     });
//   });
app.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json(user);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//post data
app.post("/createRecipe", async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);

        res.status(200).json(recipe);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});






//Mongoose connection
mongoose.connect('mongodb+srv://user:pa55word@cis435-project4-cluster.msmyrbb.mongodb.net/Node-API')
    .then(() => {
        console.log("Successfully connected to MongoDB!");
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        })  
    })
    .catch((error) => {
        console.log(error);
    });



