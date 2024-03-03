const assert = require("assert");
const Definer = require("../lib/Definer");
const BankCard = require("../modals/BankCard");

const bankCadController = module.exports;

bankCadController.createBankCard = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);
    const data = req.body;
    const bankCard = new BankCard();
    const result = await bankCard.createBankCard(req.member, data);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log("ERROR: cont/createBankCard");
    res.json({ state: "fail", message: err.message });
  }
};
