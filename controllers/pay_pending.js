// requiring the customer schema.
const Customer = require("../models/customer");
//

const PayPending = require("../models/pay_pending");

// renderring new form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/paypending/pay_pending.ejs");
};
//

// adding the complete data of paypending to database.
module.exports.updateEntry = async (req, res) => {
  let customer = req.body.custName;
  let amt = req.body.amount;

  await Customer.updateOne(
    { customerName: customer },
    { $inc: { credit: -amt } }
  );

  let pay_pending = new PayPending();
  pay_pending.date = new Date().toLocaleDateString("de-DE");
  let cust = await Customer.findOne({ customerName: customer });
  pay_pending.customerId = cust._id;
  pay_pending.amount = amt;

  await pay_pending.save();

  const pay = {
    _id: pay_pending._id,
    custName: customer,
    amount: amt,
  };

  res.json(pay);

  // res.redirect("/");
};
//

// listing all the cash receipt entry.
module.exports.showPayPending = async (req, res) => {
  const pay = await PayPending.find().populate("customerId");

  const newpay = [];

  for (p of pay) {
    newpay.push({
      _id: p._id,
      custName: p.customerId.customerName,
      amount: p.amount,
    });
  }

  res.json(newpay);

  // res.render("../views/paypending/pay_pending_show.ejs", { pay });
};
//

// updating particular paypending entry.
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let p = await PayPending.findById(id).populate("customerId");

  res.json(p);

  // res.render("../views/paypending/pay_pending_edit.ejs", { p });
};

module.exports.editPayPending = async (req, res) => {
  let { id } = req.params;
  const pay = req.body;

  const data = await PayPending.findById(id).populate("customerId");

  let pp = {
    _id: id,
    date: data.date,
    customerId: data.customerId._id,
    amount: pay.amount,
  };

  if (pay.customerName != data.customerId.customerName) {
    await Customer.findByIdAndUpdate(data.customerId._id, {
      $inc: { credit: data.amount },
    });

    const updatedCustomer = await Customer.findOneAndUpdate(
      { customerName: pay.custName },
      { $inc: { credit: -pay.amount } },
      { new: true }
    );

    pp.customerId = updatedCustomer._id;
  } else {
    await Customer.findByIdAndUpdate(data.customerId._id, {
      $inc: { credit: data.amount - pay.amount },
    });
  }

  await PayPending.findByIdAndUpdate(id, {
    $set: {
      customerId: pp.customerId,
      amount: pp.amount,
    },
  });

  const send = {
    _id: pay._id,
    custName: pay.custName,
    amount: pay.amount,
  };

  res.json(send);

  // res.redirect("/");
};
//

// deleting particular pay-pending entry.
module.exports.deletePayPending = async (req, res) => {
  let { id } = req.params;
  // the entry is deleted from this pay-pending collection.
  const deleteObject = await PayPending.findByIdAndDelete(id);

  //we have to update croponding credit amount from the customer table.
  const deletedObject = await Customer.updateOne(
    { _id: deleteObject.customerId },
    { $inc: { credit: deleteObject.amount } }
  );

  res.json(deleteObject);

  // res.redirect("/");
};
//
