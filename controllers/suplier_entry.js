// requiring the suplier schema.
const SuplierEntry = require("../models/suplier_entry");

const Suplier = require("../models/suplier");
//

// create operation.
// renderring the suplier entry details form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/suplier_entry/suplier_entry.ejs");
};
//

// storing data into database.
module.exports.addEntry = async (req, res) => {
  const se = req.body.se;

  let entry = new SuplierEntry();

  const sup = await Suplier.findOne({ suplierName: se.supname });

  entry.date = new Date().toLocaleDateString("de-DE");
  entry.suplierId = sup._id;
  entry.boxes = se.boxes;
  entry.pieces = se.pieces;

  await entry.save();

  res.redirect("/");
};
//
//

// read operation.
module.exports.showEntry = async (req, res) => {
  const se = await SuplierEntry.find().populate("suplierId");

  res.json(se);

  // res.render("../views/suplier_entry/suplier_entry_show.ejs", { se });
};
//

// update operatoin.
// rendering the edit suplier-entry detail form.
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  const se = await SuplierEntry.findById(id).populate("suplierId");

  res.json(se);

  // res.render("../views/suplier_entry/suplier_entry_edit.ejs", { se });
};
//

// storing changes in database.
module.exports.editSuplierEntry = async (req, res) => {
  let { id } = req.params;

  const se = req.body.se;

  const sup = await SuplierEntry.findById(id).populate("suplierId");

  const new_sup = {
    date: sup.date,
    suplierId: sup.suplierId._id,
    boxes: se.boxes,
    pieces: se.pieces,
  };

  if (sup.suplierId.suplierName !== se.supname) {
    const supid = await Suplier.findOne({ suplierName: se.supname });
    new_sup.suplierId = supid._id;
  }

  await SuplierEntry.findByIdAndUpdate(id, { ...new_sup });

  res.redirect("/suplierentry/show");
};
//
//

// delete operation.
module.exports.deleteEntry = async (req, res) => {
  let { id } = req.params;

  await SuplierEntry.findByIdAndDelete(id);

  res.redirect("/suplierentry/show");
};
//
