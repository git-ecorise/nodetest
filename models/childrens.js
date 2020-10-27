const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildrensSchema = new mongoose.Schema(
  {
    label: String,
    data: String,
    parent_id: { type: Schema.Types.ObjectId, ref: "treeroots" },
    expanded: Boolean,
    expandedIcon: String,
    collapsedIcon: String,
    leaf: Boolean,
    children: [{ type: Schema.Types.ObjectId, ref: "childrens" }],
  },
  { timestamps: true }
);

const ChildrensModel = mongoose.model("childrens", ChildrensSchema);
module.exports = ChildrensModel;
