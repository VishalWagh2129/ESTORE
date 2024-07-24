const express = require('express');
const productCategories = express.Router();
const pool = require("../shared/pool");

productCategories.get('/getAllCategories', (req, res) => {
  pool.query('select * from categories', (error, categories) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(categories);
    }
  });
});

productCategories.get('/getAllMainCategories', (req, res) => {
  pool.query(`SELECT * FROM categories WHERE parent_category_id IS NULL`, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch Category' });
    } else {
      res.status(200).json({ success: true, message: 'All Categories Fetched', data: results });
    }
  });
});

module.exports = productCategories;
