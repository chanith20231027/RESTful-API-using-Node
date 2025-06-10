const express = require('express');
const app = express();
const itemsRoutes = require('./routes/itemsRoutes');

app.use(express.json());
app.use('/api/items', itemsRoutes);

module.exports = app;