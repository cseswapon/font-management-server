const express = require("express");
const router = express.Router();
const GroupController = require("../controller/groupController");

router.post("/groups", GroupController.createGroup);

router.get("/groups", GroupController.getAllGroups);

router.get("/groups/:id", GroupController.getGroupById);

router.put("/groups/:id", GroupController.updateGroupById);

router.delete("/groups/:id", GroupController.deleteGroupById);

module.exports = router;
