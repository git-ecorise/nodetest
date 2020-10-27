const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TreeRootsSchema = new mongoose.Schema(
  {
    liquorTree: [
      {
        label: String,
        id: Number,
        data: String,
        expanded: Boolean,
        expandedIcon: String,
        collapsedIcon: String,
        leaf: Boolean,
        children: [{ type: Schema.Types.ObjectId, ref: "childrens" }],
      },
    ],
  },
  { timestamps: true }
);

const treeRootsModel = mongoose.model("treeroots", TreeRootsSchema);
module.exports = treeRootsModel;
