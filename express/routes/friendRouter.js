const { Router } = require("express");
const friendController = require("../controllers/friends.controller");
const friendRouter = Router();

friendRouter.get("/", friendController.getFriends);
friendRouter.post("/", friendController.postFriends);

module.exports = friendRouter;
