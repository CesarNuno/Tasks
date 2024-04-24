import { PrismaClient } from "@prisma/client";
import { response } from "express";
import {createHash} from 'crypto'
import jwt from 'jsonwebtoken'
import { env } from "process";

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  const user = req.body.user;
  const test = await prisma.user.findMany({
    where: {
      userId: user,
    },
  });
  res.json(test);
};

export const addUser = async (req, res) => {
  try{
    const { name, email, pass } = req.body;
    const password = createHash('sha256').update(pass).digest('hex')
    const register = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    res.json(register);
  }catch(e){
    if(e.code === 'P2002'){
      res.status(400).send('El correo ya esta en uso');
    }else{
      res.status(400).send('Error: ' + e)
    }
  }
  
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const test = await prisma.user.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(test);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;
  const up = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      password: password,
    },
  });
  res.json(up);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const del = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(del);
};

export const verifyLogin = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const password = createHash('sha256').update(pass).digest('hex')
    const verify = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    const token = jwt.sign({id:verify.id, email:verify.email}, env.SECRET);
    const data = {
      data:verify,
      token:token
    }
    res.json(data);
  } catch (e) {
    if(e === 'P1012'){
      res.status(400).send('El correo ya esta en uso');
    }else{
      res.status(400).send('Error: ' + e)
    }
  }
};
