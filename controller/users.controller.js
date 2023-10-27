const {ResponseTemplate} = require("../helper/template.helper");
const {PrismaClient} = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();

function TestUser(req, res) {
  let resp = ResponseTemplate(null, "success", null, 200);
  res.json(resp);
}

async function InsertUsers(req, res) {
  const {name, email, password, profiles} = req.body;

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
        profiles: {
          create: profiles,
        },
      },
      include: {
        profiles: true,
      },
    });

    res.send({
      data: user,
      message: "Succes Menambahkan data",
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function Get(req, res) {
  try {
    const users = await prisma.users.findMany({
      include: {
        profiles: true,
      },
    });

    res.send({
      data: users,
      message: "Berhasil menampilkan data",
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function GetByPK(req, res) {
  const {id} = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        profiles: true,
      },
    });

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    res.send({
      data: user,
      message: "Berhasil menampilkan data",
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

async function EditUsers(req, res) {
  const {id} = req.params;
  const {name, email, password} = req.body;

  const updatedUser = await prisma.users.update({
    where: {id: parseInt(id)},
    data: {
      name,
      email,
      password,
    },
  });

  res.json(updatedUser);
}

async function DeleteUsers(req, res) {
  const {id} = req.params;

  try {
    // Hapus terlebih dahulu data terkait di tabel Profiles
    await prisma.profiles.delete({
      where: {user_id: parseInt(id)},
    });

    // Hapus pengguna setelah data terkait dihapus
    const deletedUser = await prisma.users.delete({
      where: {id: parseInt(id)},
    });

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

module.exports = {
  TestUser,
  InsertUsers,
  Get,
  GetByPK,
  EditUsers,
  DeleteUsers,
};
