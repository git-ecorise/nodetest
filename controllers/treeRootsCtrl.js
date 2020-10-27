const treeRootsModel = require("../models/treeroots");
const childrensModels = require("../models/childrens");

exports.findAll = async (req, res) => {
  try {
    var treeRoots = await treeRootsModel.find({});
    // console.log(treeRoots);
    for (let i = 0; i < treeRoots.length; i++) {
      for (let j = 0; j < treeRoots[i].liquorTree.length; j++) {
        // console.log(i, j, treeRoots[i].liquorTree[j]);
        const childrens = await childrensModels
          .find({
            parent_id: treeRoots[i].liquorTree[j]._id,
          })
          .populate("children");

        console.log("children", childrens);
        treeRoots[i].liquorTree[j].children.length = 0;
        for (let k = 0; k < childrens.length; k++) {
          treeRoots[i].liquorTree[j].children.push(childrens[k]);
        }
      }
      // console.log("treeroot - ", i, "-", treeRoots[i].liquorTree[i]);
    }
    res.send(treeRoots);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Notes",
    });
  }
};

exports.create = async (req, res) => {
  const treeRoot = req.body;

  try {
    let treeRootDoc = new treeRootsModel(treeRoot);
    await treeRootDoc.save();
    res.send(treeRoot);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    let treeRoot = await treeRootsModel.findById(id);
    res.send(treeRoot);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  let { ...data } = req.body;
  const result = await treeRootsModel.findOneAndUpdate(
    { _id: req.params.id },
    data,
    {
      new: true,
    }
  );

  res.send(result);
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;

    await treeRootsModel.findByIdAndDelete(req.params.id);

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
