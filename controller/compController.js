const Comp = require("../model/componentmodel");

const getComp = async (req, res) => {
  const comps = await Comp.find({});
  res.status(200).json(comps);
};

module.exports = {
  getComp,
};
