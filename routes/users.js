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
    // #swagger.tags = ['Users']
    // #swagger.description = "Adds the user based on parameters provided in the request's body"
    /* #swagger.parameters['body'] = {
          "name": "body",
          "in": "body",
          "schema": {
              "$ref": "#/definitions/User"
          }
      } */
    const {username, password, score} = req.body
    await userService.create(username, password, score);
    res.end();
});
router.delete('/', jsonParser, async function(req, res, next) {
    // #swagger.tags = ['Users']
    // #swagger.description = "Deletes a user of ID provided in the request's body."
    await userService.deleteUser(req.body.id);
    res.end();
});
module.exports = router;