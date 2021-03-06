// Bring in the express server
const express = require("express");

// Bring in the Express Router
const router = express.Router();

// Import the Controller
const controller = require("../controllers/treeRootsCtrl");

// Create a new Note
router.post("/addtreeroot", controller.create);

// Get all Notes
router.get("/getalltreeroots", controller.findAll);

// Get Note by Id
router.get("/gettreerootbyid/:id", controller.findOne);

// Modify existing Note
router.put("/updatetreeroot/:id", controller.update);

// Delete Note by Id
router.delete("/deletetreerootbyid/:id", controller.delete);

module.exports = router;
