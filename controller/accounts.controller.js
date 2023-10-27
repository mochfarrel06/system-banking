const {ResponseTemplate} = require("../helper/template.helper");
const {PrismaClient} = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();

const router = express.Router();

async function InsertAccounts(req, res) {
  const {user_id, bank_name, bank_account_number, balance} = req.body;

  try {
    const account = await prisma.bank_accounts.create({
      data: {
        user_id,
        bank_name,
        bank_account_number,
        balance,
      },
    });

    res.send({
      data: account,
      message: "Berhasil menambahkan account",
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function GetAccounts(req, res) {
  try {
    const accounts = await prisma.bank_accounts.findMany();

    res.send({
      data: accounts,
      message: "Berhasil menampilkan data",
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function GetAccountsById(req, res) {
  const {id} = req.params;

  try {
    const account = await prisma.bank_accounts.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!account) {
      return res.status(404).json({message: "Account not found"});
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function EditAccounts(req, res) {
  const {id} = req.params;
  try {
    const {user_id, bank_name, bank_account_number, balance} = req.body;
    const updateAccount = await prisma.bank_accounts.update({
      where: {
        id: parseInt(id),
      },
      data: {
        user_id,
        bank_name,
        bank_account_number,
        balance,
      },
    });

    res.json(updateAccount);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function DeleteAccounts(req, res) {
  const {id} = parseInt(req.params.id);

  try {
    await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });

    await prisma.transactions.delete({
      where: {
        id: parseInt(id),
      },
    });

    const deleteAccounts = await prisma.bank_accounts.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(deleteAccounts);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

module.exports = {
  InsertAccounts,
  GetAccounts,
  GetAccountsById,
  EditAccounts,
  DeleteAccounts,
};
