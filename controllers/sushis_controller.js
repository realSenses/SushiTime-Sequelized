// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models');

// Extracts the sequelize connection from the models object
var sequelizeConnection = models.sequelize;

// Sync the tables
sequelizeConnection.sync();

// Redirect to index
router.get('/', function (req, res) {
  res.redirect('/index');
});

// RENDER
router.get('/index', function (req, res) {
  models.sushis.findAll({
   include: [{model: models.Customer}]
  }).then(function(data){
   // console.log(data.length);
    var object = { sushis: data };
    res.render("index", object);
  })
});

// NEW
router.post('/api/sushis', function (req, res) {
  models.sushis.create({
    sushi_name: req.body.name
  }).then(function(dbPost){
    res.json(dbPost);
  });
});

// EAT
router.put("/api/sushis/:id", function(req, res) {

  models.Customer.create({
    name: req.body.myname
    //sushiId: req.params.id // not used
  }).then(function(dbPost) {
    models.sushis.update({
      eaten: "1",
      CustomerId: dbPost.id
    },{
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost)
    })
  });
});

// DELETE
router.delete("/api/sushis/:id", function(req, res) {
  models.sushis.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

// Export routes for server.js to use.
module.exports = router;