// requiring the cash counter schema.
const CashCounter = require("../models/cash_counter");
const Customer = require("../models/customer");
const Suplier = require("../models/suplier");
const Fish = require("../models/fish");
//

const { mongoose } = require("mongoose");

// renderring new form.
module.exports.renderAddForm = (req, res) => {
  res.render("../views/cashcounter/cash_counter.ejs");
};
//

// adding the complete data entry to database.
module.exports.AddEntry = async (req, res) => {
  const cash = req.body.cash;

  let entry = new CashCounter();

  const sup = await Suplier.findOne({ suplierName: cash.supname });
  const cust = await Customer.findOne({ customerName: cash.custname });
  const fish = await Fish.findOne({ fishName: cash.fishname });

  entry.date = new Date().toLocaleDateString("de-DE");
  entry.suplierId = sup._id;
  entry.customerId = cust._id;
  entry.subName = cash.subname;
  entry.fishId = fish._id;
  entry.kg = cash.kg;
  entry.rate = cash.rate;
  entry.amount = cash.kg * cash.rate;

  await Suplier.findByIdAndUpdate(sup._id, {
    $inc: { sales: entry.amount },
  });

  if (cust._id != "65d6c52be679795fbe3def03") {
    await Customer.findByIdAndUpdate(entry.customerId, {
      $inc: { credit: entry.amount },
    });
  }

  await entry.save();

  res.redirect("/");
};
//

// read operation.
module.exports.showCashCounter = async (req, res) => {
  const today_date = new Date().toLocaleDateString("de-DE");

  const cc = await CashCounter.find({ date: today_date })
    .populate("suplierId")
    .populate("customerId")
    .populate("fishId");

  res.json(cc);
  // res.render("../views/cashcounter/cash_counter_show.ejs", { cc });
};
//

// edit operation.
// edit form renderring.
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const cash = await CashCounter.findById(id)
    .populate("suplierId")
    .populate("customerId")
    .populate("fishId");

  res.json(cash);

  res.render("../views/cashcounter/cash_counter_edit.ejs", { cash });
};
//

// updating the entry.
module.exports.editEntry = async (req, res) => {
  const { id } = req.params;
  const cash = req.body.cash;

  const cc = await CashCounter.findById(id)
    .populate("suplierId")
    .populate("customerId")
    .populate("fishId");

  let cashcounter = {
    _id: cc._id,
    date: cc.date,
    suplierId: cc.suplierId._id,
    customerId: cc.customerId._id,
    subName: cash.subname,
    fishId: cc.fishId._id,
    kg: cash.kg,
    rate: cash.rate,
    amount: cash.kg * cash.rate,
  };

  if (cash.supname !== cc.suplierId.suplierName) {
    const sup = await Suplier.findOne({ suplierName: cash.supname });
    cashcounter.suplierId = sup._id;
  }

  if (cash.fishname !== cc.fishId.fishName) {
    const fish = await Fish.findOne({ fishName: cash.fishname });
    cashcounter.fishId = fish._id;
  }

  if (cash.custname !== cc.customerId.customerId) {
    if (cash.custname == "CASH SALES") {
      await Customer.findByIdAndUpdate(cc.customerId._id, {
        $inc: { credit: -cc.amount },
      });
      cashcounter.customerId = "65d6c52be679795fbe3def03";
    } else if (cc.customerId.customerName == "CASH SALES") {
      const cust = await Customer.findOneAndUpdate(
        { customerName: cash.custname },
        { $inc: { credit: cashcounter.amount } },
        { new: true }
      );
      cashcounter.customerId = cust._id;
    } else {
      await Customer.findByIdAndUpdate(cc.customerId._id, {
        $inc: { credit: -cc.amount },
      });
      const cust = await Customer.findOneAndUpdate(
        { customerName: cash.custname },
        { $inc: { credit: cashcounter.amount } },
        { new: true }
      );
      cashcounter.customerId = cust._id;
    }
  } else if (cc.amount != cashcounter.amount) {
    if (cc.customerId._id != "65d6c52be679795fbe3def03") {
      await Customer.findByIdAndUpdate(cc.customerId._id, {
        $inc: { credit: cashcounter.amount - cc.amount },
      });
    }
  }

  await CashCounter.findByIdAndUpdate(id, { ...cashcounter });

  res.redirect("/");
};
//
//

// deleting particular entry.
module.exports.deleteEntry = async (req, res) => {
  let { id } = req.params;
  const deleteObject = await CashCounter.findByIdAndDelete(id);

  if (deleteObject.customerId != "65d6c52be679795fbe3def03") {
    await Customer.updateOne(
      { _id: deleteObject.customerId },
      { $inc: { credit: -deleteObject.amount } }
    );
  }

  await Suplier.findByIdAndUpdate(deleteObject._id, {
    $inc: { sales: -deleteObject.amount },
  });

  res.redirect("/");
};
//
