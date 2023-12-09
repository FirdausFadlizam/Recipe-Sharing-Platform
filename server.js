const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/loginModel');
app.use(cors({origin: '*'}));
app.use(express.json());
const PORT = 3000;

//Mongoose connection
mongoose.connect('mongodb+srv://jaishree:malaysiaboleh@atlascluster.iwsfcui.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log("successfully connected to MongoDB!");
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

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

app.get('/login', async (req, res) => {
    try {
        const { username, password } = req.query;

        // Check if username and password match a user in the database
        const user = await User.findOne({ username, password });

        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//get users data
/*app.get('/users', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//get a single product
app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//modify data
/*app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        if(!user) {
            return res.status(404).json(
                {message: `cannot find user with id ${id}`}
                );
        }//end if

        const updatedUser = await User.findById(id);

        res.status(200).json(updatedUser);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});



app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);

        if(!user) {
            return res.status(404).json({message: `cannot find user with id ${id}`});
        }

        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});*/
