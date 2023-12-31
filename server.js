const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/recipeModel');
const User = require('./models/loginModel');
const favRecipe = require('./models/favRecipeModel');
const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.static('public'))
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3000;

//post data
app.post('/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//get data
app.get('/login', async (req, res) => {
    try {
        const { username, password } = req.query;

        // Check if username and password match a user in the database
        const user = await User.findOne({ username, password });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ success: false });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.get('/recipes/:id', async (req, res) => {
    try {
        // `req.params.id` contains the id from the URL
        const recipe = await Recipe.findById(req.params.id);

        // If recipe doesn't exist, send a 404 error
        if (!recipe) {
            return res.status(404).json({ message: 'No such recipe found' });
        }

        // Respond with the recipe
        res.json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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

app.post("/addFavRecipe", async (req, res) => {
    try {
        const recipe = await favRecipe.create(req.body);

        res.status(200).json(recipe);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.delete("/deleteFavRecipe", async (req, res) => {
    try {
        const recipe = await favRecipe.findOneAndDelete(req.body);

        res.status(200).json(recipe);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.get('/getFavRecipes', async (req, res) => {
    try {
        const{user} = req.query;
        const favRecipes = await favRecipe.find({user});
        const recipeIds = favRecipes.map(fav => fav.recipe);

        const recipes = await Recipe.find({ _id: { $in: recipeIds } });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.delete("/deleteRecipe/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({_id: req.params.id, user: req.body.user});

        if (!recipe) {
            res.status(404).json({message: "No recipe found or user not authorized to delete this recipe"});
            return;
        }

        res.status(200).json({message: "Recipe deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.put('/updateRecipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        { _id: id},
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            fName: user.fName,
            lName: user.lName
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/recipes/:id/addComment', async (req, res) => {
    try {
        const { id } = req.params;
        const { commentText, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }

        const user = await User.findById(userId); // Fetch user details

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $push: { comments: { user: userId, commentText: commentText } } },
            { new: true }
        ).populate('comments.user', 'fName lName');

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const latestComment = updatedRecipe.comments[updatedRecipe.comments.length - 1];

        res.status(200).json({ userName: `${user.fName} ${user.lName}`, commentText: latestComment.commentText });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/recipes/:id/deleteComment/:commentId', async (req, res) => {
    try {
        const { id, commentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ error: 'Invalid IDs' });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json({message: "Comment deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
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
