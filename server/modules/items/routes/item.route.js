// itemRoutes.js

var express = require('express');
var app = express();
var itemRoute = express.Router();

// Require Item model in our routes module
var Item = require('../models/Item');

// Defined store route
itemRoute.route('/add').post(function (req, res) {
  var item = new Item(req.body);
  item.save().then(item => {
    res.status(200).json({ item });
  }).catch(err => {
    res.status(400).send("An error occurred: " + err);
  });
});

// Defined get data(index or listing) route
itemRoute.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoute.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
    if(err){
      console.log(err);
    } else {
      res.json(item);
    }
  });
});

//  Defined update route
itemRoute.route('/update/:id').put(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item) {
      return next(new Error('Could not load Document'));
    } else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
          res.json({ item });
      }).catch(err => {
            res.status(400).send("An error occurred: " + err);
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRoute.route('/delete/:id').delete(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = itemRoute;
