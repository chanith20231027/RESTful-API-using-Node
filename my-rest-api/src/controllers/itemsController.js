const Item = require('../models/itemModel');

const createItem = async (req, res) => {

    const item = new Item(req.body);

    try{
        const newItem = await item.save();
        res.status(201).json(newItem);

    }catch(error){

        res.status(400).json({message: error.message});

    }

};

module.exports = {createItem};