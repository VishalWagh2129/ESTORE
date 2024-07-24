const express = require('express');
const pool = require('../shared/pool');
const brand = express.Router();
const genrateId = require('../utility/common');

brand.post('/saveBrand', async (req, res) => {
  try {
    const { name, createdBy, updatedBy, status, description } = req.body;
    const brandId = await genrateId('BRND');
    const query = `INSERT INTO brands (UDID,CREATED_BY,UPDATED_BY,CREATED_DATE,UPDATED_DATE,RECORD_STATUS, NAME, DESCRIPTION) VALUES (?, ?, ?, NOW(),NOW(),? ,? ,?)`;

    pool.query(query, [brandId, createdBy, updatedBy, status, name, description], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Unsuccessful saving Brand', error: err.message });
      }
      res.status(200).json({ success: true, message: 'Brand created successfully', data: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unsuccessful saving Brand', error: error.message });
  }
});

// Get all brands
brand.get('/getAllBrands', async (req, res) => {
  try {
    const query = `SELECT * FROM brands`;

    pool.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch Brands' });
      }
      res.status(200).json({ success: true, message: 'All Brands Fetched', data: results });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Brands' });
  }
});

// Get brand by ID
brand.get('/getBrandByID/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required' });
    }

    const query = `SELECT * FROM brands WHERE UDID = ?`;

    pool.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch Brand' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      res.status(200).json({ success: true, data: result[0] });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Brand' });
  }
});

// Update brand by ID
brand.put('/updateBrand/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, createdBy, updatedBy, status, description } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required' });
    }
    const query = `UPDATE brands SET CREATED_BY = ?, UPDATED_BY = ?, CREATED_DATE = NOW(), UPDATED_DATE = NOW(),RECORD_STATUS = ?,NAME = ?, DESCRIPTION = ? WHERE UDID = ?`;
    pool.query(query, [createdBy, updatedBy, status, name, description, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update Brand' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      res.status(200).json({ success: true, message: 'Brand updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Brand' });
  }
});

// Delete brand by ID
brand.delete('/deleteBrand/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required' });
    }
    const query = `DELETE FROM brands WHERE UDID = ?`;
    pool.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete Brand' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      res.status(200).json({ success: true, message: 'Brand deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Brand' });
  }
});

brand.get('/getAllActiveBrands', async (req, res) => {
  try {
    const query = `SELECT * FROM brands where RECORD_STATUS='ACTIVE'`;
    pool.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch Brands' });
      }
      res.status(200).json({ success: true, message: 'All Brands Fetched', data: results });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Brands' });
  }
});

module.exports = brand;