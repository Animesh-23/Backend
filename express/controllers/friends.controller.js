const friends = require("../models/friend.models");

function getFriends(req, res) {
  res.json(friends);
}
function postFriends(req, res) {
  friends.push({
    id: friends.length,
    name: req.body.name,
  });
  res.json(friends);
}
module.exports = {
  getFriends,
  postFriends,
};
