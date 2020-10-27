const childrensModels = require("../models/childrens");
const treeRootsModels = require("../models/treeroots");

exports.findAll = async (req, res) => {
  try {
    const childrens = await childrensModels.find({}).populate("children");
    res.send(childrens);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occured while retrieving Notes",
    });
  }
};

exports.create = async (req, res) => {
  const children = req.body;

  try {
    let childrenDoc = new childrensModels(children);
    const result = await childrenDoc.save();
    console.log(result._id, req.body.parent_id);
    if (result._id != null) {
      const updateresult = await treeRootsModels.findOneAndUpdate(
        { "liquorTree._id": req.body.parent_id },
        { $push: { "liquorTree.$.children": result._id } }
      );
      if (updateresult == null) {
        const updateresult1 = await childrensModels.findOneAndUpdate(
          { _id: req.body.parent_id },
          { $push: { children: result._id } }
        );
        if (updateresult1 == null) {
          res.send("false");
        } else {
          res.send("true");
        }
      } else {
        res.send("true");
      }
    } else {
      res.send("false");
    }
    // res.send(children);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    let treeRoot = await childrensModels.findById(id);
    res.send(treeRoot);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  let { ...data } = req.body;
  const result = await childrensModels.findOneAndUpdate(
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

    await childrensModels.findByIdAndDelete(req.params.id);

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
