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

const getItems = async (req, res) => {

    try{
        const items = await Item.find();
        res.status(200).json(items);

    }catch(error){
        res.status(404).json({message: error.message});

    }
}

module.exports = {createItem, getItems};