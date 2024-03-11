var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var UserService = require('../services/UserService');
var db = require('../models');
var userService = new UserService(db);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  //swagger.tags = ['Users]
  //swagger.description = "Gets the list of all users"
  let users = await userService.getAll();
  res.send(users);
});

router.post('/', jsonParser, async function(req, res, next) {
  //swagger.tags = ['Users]
  //swagger.description = "Adds the user based on parameters provided in the request's body"
  /* #swagger.parameters['body'] =  {
    "name": "body",
    "in": "body",
      "schema": {
        $ref: "#/definitions/User"
      }
    }
  */
  let username = req.body.Username;
  let password = req.body.Password;
  let score = req.body.Score;
  await userService.create(username, password, score)
  res.end();
});

router.delete('/:id', jsonParser, async function(req, res, next) {
    //swagger.tags = ['Users]
    //swagger.description = "Deletes a user of ID provided in the request's body"
  await userService.delete(req.params.id);
  res.end();
});

module.exports = router;
