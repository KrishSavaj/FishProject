// requiring the fish schema.
const Fish = require("../models/fish");
//

// renderring new form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/fish/fishadd.ejs");
};
//

// adding the complete data of fish to database.
module.exports.addFish = async (req, res) => {
  let { fishname } = req.body;
  let fish = new Fish();
  fish.fishName = fishname;

  await fish.save();
  res.redirect("/");
};
//

// show all the fish details.
module.exports.showFish = async (req, res) => {
  const fish = await Fish.find();
  res.json(fish);
  // res.render("../views/fish/fish_show.ejs", { fish });
};
//

// updating particular fish details.
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let fish = await Fish.findById(id);
  res.json(fish);
  // res.render("../views/fish/edit_fish.ejs", { fish });
};

module.exports.editFish = async (req, res) => {
  let { id } = req.params;
  await Fish.findByIdAndUpdate(id, req.body.fish);
  res.redirect("/");
};
//

// deleting the particular fish.
module.exports.deleteFish = async (req, res) => {
  let { id } = req.params;
  await Fish.findByIdAndDelete(id);
  res.redirect("/");
};
//
