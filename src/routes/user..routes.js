const express=require('express');
const rutass=express.Router();

const {mostrarusers}= require("../controllers/node.controllers");

rutass.get('/crud',mostrarusers);

module.exports= rutass;