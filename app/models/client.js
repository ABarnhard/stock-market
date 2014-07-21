'use strict';

function Client(name, cash){
  this.name = name;
  this.cash = parseFloat(cash);
  this.portfolios = [];
  
}

module.exports = Client;
