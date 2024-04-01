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
  const se = req.body;

  let entry = new SuplierEntry();

  const sup = await Suplier.findOne({ suplierName: se.suppName });

  entry.date = new Date().toLocaleDateString("de-DE");
  entry.suplierId = sup._id;
  entry.boxes = se.boxes;
  entry.pieces = se.pieces;

  const addedEntry = await entry.save();

  const newse = {
    _id: addedEntry._id,
    suppName: se.suppName,
    boxes: addedEntry.boxes,
    pieces: addedEntry.pieces,
  };

  res.json(newse);

  // res.redirect("/");
};
//
//

// read operation.
module.exports.showEntry = async (req, res) => {
  const se = await SuplierEntry.find().populate("suplierId");

  const myse = [];
  for (s of se) {
    myse.push({
      _id: s._id,
      suppName: s.suplierId.suplierName,
      boxes: s.boxes,
      pieces: s.pieces,
    });
  }

  res.json(myse);

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

  const se = req.body;

  const sup = await SuplierEntry.findById(id).populate("suplierId");

  const new_sup = {
    date: sup.date,
    suplierId: sup.suplierId._id,
    boxes: se.boxes,
    pieces: se.pieces,
  };

  if (sup.suplierId.suplierName !== se.suppName) {
    const supid = await Suplier.findOne({ suplierName: se.suppName });
    new_sup.suplierId = supid._id;
  }

  const newsup = await SuplierEntry.findByIdAndUpdate(
    id,
    { ...new_sup },
    { new: true }
  );

  const newse = {
    _id: newsup._id,
    suppName: se.suppName,
    boxes: newsup.boxes,
    pieces: newsup.pieces,
  };

  res.json(newse);

  // res.redirect("/suplierentry/show");
};
//
//

// delete operation.
module.exports.deleteEntry = async (req, res) => {
  let { id } = req.params;

  const deletedObject = await SuplierEntry.findByIdAndDelete(id);

  res.json(deletedObject);

  // res.redirect("/suplierentry/show");
};
//
