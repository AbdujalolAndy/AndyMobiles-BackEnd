const assert = require("assert");
const Definer = require("../lib/Definer");
const BankCard = require("../modals/BankCard");

const bankCadController = module.exports;

bankCadController.createBankCard = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);
    const data = req.body;
    const bankCard = new BankCard();
    const result = await bankCard.createBankCardData(req.member, data);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log("ERROR: cont/createBankCard");
    res.json({ state: "fail", message: err.message });
  }
};

bankCadController.updateCard = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);
    const updateData = req.body;
    const bankcard = new BankCard(),
      result = await bankcard.updateCardData(req.member, updateData);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log("ERROR: cont/updateCard");
    res.json({ state: "fail", message: err.message });
  }
};

bankCadController.getTargetCard = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);
    const bankCard = new BankCard();
    const result = await bankCard.getTargetCardData(req.member);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log("ERROR: cont/getAllbankCards");
    res.json({ state: "fail", message: err.message });
  }
};
