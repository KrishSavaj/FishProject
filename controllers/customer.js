// requiring the customer schema.
const Customer = require("../models/customer");
//

// renderring new form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/customer/custadd.ejs");
};
//

// adding the complete data of customer to database.
module.exports.addCustomer = async (req, res) => {
  let cust = new Customer();

  cust.customerName = req.body.custname;
  cust.mobileNumber = req.body.custnumber;

  await cust.save();
  res.redirect("/");
};
//

// listing all the customer..
module.exports.showCustomer = async (req, res) => {
  let cust = await Customer.find();

  res.json(cust);

  // res.render("../views/customer/customer_show.ejs", { cust });
};
//

// updatig particular customer detais.
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let customer = await Customer.findById(id);

  res.json(customer);
  // res.render("../views/customer/edit_customer.ejs", { customer });
};

module.exports.editCustomer = async (req, res) => {
  let { id } = req.params;
  await Customer.findByIdAndUpdate(id, req.body.customer);
  res.redirect("/");
};
//

// deleting the particular customer.
module.exports.deleteCustomer = async (req, res) => {
  let { id } = req.params;
  await Customer.findByIdAndDelete(id);
  res.redirect("/");
};
//
