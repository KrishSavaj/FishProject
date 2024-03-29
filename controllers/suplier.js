// requiring the suplier schema.
const Suplier = require("../models/suplier");
//

// renderring new form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/suplier/supadd.ejs");
};
//

// adding the complete data of suplier to database.
module.exports.addSuplier = async (req, res) => {
  const sup = new Suplier();
  sup.suplierName = req.body.suppName;
  sup.phoneNum = req.body.phoneNum;
  const savedSup = await sup.save();
  res.json(savedSup);
  // res.redirect("/");
};
//

// listing all the suplier.
module.exports.showSuplier = async (req, res) => {
  let suplier = await Suplier.find();

  res.json(suplier);

  // res.render("../views/suplier/suplier_show.ejs", { suplier });
};
//

// updating particular suplier details.
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let suplier = await Suplier.findById(id);

  res.json(suplier);

  // res.render("../views/suplier/edit_suplier.ejs", { suplier });
};

module.exports.editSuplier = async (req, res) => {
  let { id } = req.params;
  const sup = {
    suplierName: req.body.suppName,
    phoneNum: req.body.phoneNum,
  };
  const updatedObject = await Suplier.findByIdAndUpdate(id, sup, { new: true });
  res.json(updatedObject);
  // res.redirect("/");
};
//

// deleting particular suplier from the database.
module.exports.deleteSuplier = async (req, res) => {
  let { id } = req.params;
  const deletedObject = await Suplier.findByIdAndDelete(id);
  res.json(deletedObject);
  // res.redirect("/");
};
//
