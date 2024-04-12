//  @desc Get all Transactions
//  2route GET /api/v1/transactions

const Transaction = require('../models/Transaction');

// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
  res.send('GET transactions');
};

//  @desc Add Transactions
//  @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res) => {
  try {
    const { text, amount } = req.body;

    const transaction = new Transaction({
      text,
      amount,
    });

    await transaction.save();

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.log(err);
  }
};

//  @desc Delete Transactions
//  2route DELETE /api/v1/transactions :id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
