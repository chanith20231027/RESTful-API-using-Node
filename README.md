# RESTful-API-using-Node
building a RESTful API using Node 

-Post (to add a item)
-Get (to view items)

Tech Stack: (Node js + Express), MongoDB
================================================================================

1. Project Setup
Create a new directory for your project:
Code

    mkdir my-rest-api
    cd my-rest-api
Initialize a new Node.js project.
Code

    npm init -y
Install necessary packages.
Code

    npm install express mongoose dotenv
    npm install --save-dev nodemon
express: For creating the API server, mongoose: For interacting with MongoDB, dotenv: For managing environment variables, and nodemon: For automatically restarting the server during development.
------------------------------------------------------------------------------------
2. File Structure
Code

my-rest-api/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── itemsController.js
│   ├── models/
│   │   └── itemModel.js
│   ├── routes/
│   │   └── itemsRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
├── package-lock.json

---------------------------------------------------------------------------------
3. Code Implementation

.env: Store your MongoDB connection string and other secrets here:
Code

    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
    PORT=5000

src/config/db.js: Connect to MongoDB:

    const mongoose = require('mongoose');

    const connectDB = async () => {
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
    };

    module.exports = connectDB;

src/models/itemModel.js: Define your data model:

    const mongoose = require('mongoose');

    const itemSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      description: String,
    });

    module.exports = mongoose.model('Item', itemSchema);

src/controllers/itemsController.js: Handle API logic:

    const Item = require('../models/itemModel');

    const getItems = async (req, res) => {
      try {
        const items = await Item.find();
        res.json(items);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    const createItem = async (req, res) => {
      const item = new Item(req.body);
      try {
        const newItem = await item.save();
        res.status(201).json(newItem);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

    module.exports = { getItems, createItem };

src/routes/itemsRoutes.js: Define API routes:

    const express = require('express');
    const router = express.Router();
    const { getItems, createItem } = require('../controllers/itemsController');

    router.get('/', getItems);
    router.post('/', createItem);

    module.exports = router;

src/app.js: Set up Express app:

    const express = require('express');
    const app = express();
    const itemsRoutes = require('./routes/itemsRoutes');

    app.use(express.json());
    app.use('/api/items', itemsRoutes);

    module.exports = app;

src/server.js: Start the server:

    require('dotenv').config();
    const app = require('./app');
    const connectDB = require('./config/db');
    const PORT = process.env.PORT || 5000;

    connectDB().then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });


package.json: Add a start script:

    "scripts": {
        "start": "node ./src/server.js",
        "dev": "nodemon ./src/server.js"
      }
---------------------------------------------
4. run the API

    npm start
---------------------------------------------
5. test the API end-points using Postman 

    POST http://localhost:5000/api/items
        for request body:
            {
                "name":"Apple iphone 16",
                "description":"made in usa"
            }
    --------------------------------------        
    GET http://localhost:5000/api/items