const express = require('express');
const users = express.Router();
const pool = require("../shared/pool");
const bcryptjs = require("bcryptjs");
const jwtoken = require('jsonwebtoken');

users.post('/signup', (req, res) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let pin = req.body.pin;
    let email = req.body.email;
    let password = req.body.password;

    pool.query(
      `select count(*) as count from users where email like '${email}'`,
      (error, resultCount) => {
        if (error) {
          res.status(500).send(error);
        } else {
          if (resultCount[0].count > 0) {
            res.status(200).send({ message: 'Email already exists' });
          } else {
            bcryptjs.hash(password, 10).then((hashedPassword) => {
              const query = `Insert into users (email,firstName,lastName,address,city,state,pin,password)
                      values
                      ('${email}','${firstName}','${lastName}','${address}','${city}','${state}','${pin}','${hashedPassword}')`;
              pool.query(query, (error, result) => {
                if (error) {
                  res.status(401).send({ error: error.code, message: error.message });
                } else {
                  res.status(201).send({ message: 'success' });
                }
              });
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send({ error: error.code, message: error.message });
  }
});

users.post('/login', (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    pool.query(
      `select * from users where email like '${email}'`,
      (error, result) => {
        if (error) {
          res.status(500).send({
            error: error.code,
            message: error.message,
          });
        } else {
          if (result.length > 0) {
            bcryptjs
              .compare(password, result[0].password)
              .then((compareResult) => {
                if (compareResult) {
                  const token = jwtoken.sign(
                    { id: result[0].id, email: result[0].email },
                    'estore-secret-key',
                    { expiresIn: '1h' }
                  );
                  res.status(200).send({
                    token: token,
                    expiresInSeconds: 3600,
                    user: {
                      firstName: result[0].firstName,
                      lastName: result[0].lastName,
                      address: result[0].address,
                      city: result[0].city,
                      state: result[0].state,
                      pin: result[0].pin,
                      udid:result[0].udid
                    }
                  });
                } else {
                  res.status(401).send({
                    message: `Invalid password.`,
                  });
                }
              });
          } else {
            res.status(401).send({
              message: `User doesn't exist.`,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send({
      error: error.code,
      message: error.message,
    });
  }
});

users.get('/getAllCustomers', async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE record_status = 'ACTIVE'`;
    pool.query(query, [], (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch Customer', error: err.message });
      } else if (result.length === 0) {
        res.status(404).json({ success: false, message: 'Customer not found' });
      } else {
        res.status(200).json({ success: true, data: result });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
});

users.get('/getCustomerById/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const query = `SELECT * FROM users WHERE udid = ? AND record_status = 'ACTIVE'`;
    pool.query(query, [customerId], (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch product', error: err.message });
      } else if (result.length === 0) {
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        res.status(200).json({ success: true, data: result[0] });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
});


module.exports = users;