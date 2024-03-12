var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);
/* GET users listing. */
router.get('/', async function(req, res, next) {
    // #swagger.tags = ['Users']
    // #swagger.description = "Gets the list of all users."
    var users = await userService.getAll()
    res.send(users);
});
router.post('/', jsonParser, async function(req, res, next) {
  // #swagger.tags = ['Users]
  // #swagger.description = "Adds the user based on parameters provided in the request's body"
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
  /*
  #swagger.tags = ['Users']
  #swagger.description = "Deletes a user with the specified ID."
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the user to delete',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: 'User deleted successfully'
  }
  #swagger.responses[404] = {
    description: 'User not found'
  }
  */
  await userService.delete(req.body.id);
  res.end();
});
module.exports = router;