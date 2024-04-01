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

  cust.customerName = req.body.custName;
  cust.mobileNumber = req.body.phoneNum;

  const newcust = await cust.save();

  const newcs = {
    _id: newcust._id,
    custName: newcust.customerName,
    phoneNum: newcust.mobileNumber,
    credit: newcust.credit,
  };

  res.json(newcs);

  // res.redirect("/");
};
//

// listing all the customer..
module.exports.showCustomer = async (req, res) => {
  let cust = await Customer.find();

  const myse = [];
  for (s of cust) {
    myse.push({
      _id: s._id,
      custName: s.customerName,
      phoneNum: s.mobileNumber,
      credit: s.credit,
    });
  }

  res.json(myse);

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

  const newcust = {
    customerName: req.body.custName,
    mobileNumber: req.body.phoneNum,
  };

  const updatedObject = await Customer.findByIdAndUpdate(
    id,
    { ...newcust },
    { new: true }
  );

  const updatecust = {
    _id: updatedObject._id,
    custName: updatedObject.customerName,
    phoneNum: updatedObject.mobileNumber,
    credit: updatedObject.credit,
  };

  res.json(updatecust);

  // res.redirect("/");
};
//

// deleting the particular customer.
module.exports.deleteCustomer = async (req, res) => {
  let { id } = req.params;
  const deletedObject = await Customer.findByIdAndDelete(id);

  res.json(deletedObject);

  // res.redirect("/");
};
//
