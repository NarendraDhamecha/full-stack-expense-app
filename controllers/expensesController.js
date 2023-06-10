const Expenses = require("../models/expensesModel");

exports.getExpenses = (req, res) => {
  Expenses.findAll()
    .then((expenses) => {
      const data = [];
      for (let i of expenses) {
        data.push(i.dataValues);
      }
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.postExpenses = (req, res) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;

  Expenses.create({
    amount,
    description,
    category,
  })
    .then((result) => res.json(result.dataValues))
    .catch((err) => console.log(err));
};

exports.deleteExpenses = (req, res) => {
    Expenses.destroy({where: {id : req.params.id}})
    .then(() => res.sendStatus('202'))
    .catch(err => console.log(err));
}
