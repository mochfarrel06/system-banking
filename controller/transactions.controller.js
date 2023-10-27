const {ResponseTemplate} = require("../helper/template.helper");
const {PrismaClient} = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();

async function sendMoney(req, res) {
  const {source_account_id, destination_account_id, amount} = req.body;
  try {
    const sourceAccount = await prisma.bank_accounts.findUnique({
      where: {id: source_account_id},
    });
    const destinationAccount = await prisma.bank_accounts.findUnique({
      where: {id: destination_account_id},
    });
    if (!sourceAccount || !destinationAccount) {
      return res
        .status(404)
        .json({message: "Source or destination account not found"});
    }
    if (sourceAccount.balance < amount) {
      return res.status(400).json({message: "Insufficient funds"});
    }
    await prisma.bank_accounts.update({
      where: {id: source_account_id},
      data: {balance: {decrement: amount}},
    });
    await prisma.bank_accounts.update({
      where: {id: destination_account_id},
      data: {balance: {increment: amount}},
    });
    const transaction = await prisma.transactions.create({
      data: {
        amount,
        source_account_id,
        destination_account_id,
      },
    });
    res.send({
      data: transaction,
      message: "Berhasil mengirim uang",
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await prisma.transactions.findMany({
      include: {
        source: true,
        destination: true,
      },
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function getTransactionById(req, res) {
  try {
    const {id} = req.params;
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        source: true,
        destination: true,
      },
    });

    if (!transaction) {
      return res.status(404).json({message: "Transaction not found"});
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

module.exports = {
  sendMoney,
  getTransactions,
  getTransactionById,
};
