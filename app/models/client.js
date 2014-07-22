'use strict';

var Portfolio = require('./portfolio');
var Stock = require('./stock');

function Client(name, cash){
  this.name = name;
  this.cash = parseFloat(cash);
  this.portfolio = new Portfolio(name + '\'s portfolio');
}

Client.prototype.purchase = function(symbol, qty, callback){
  var that = this;
  Stock.getQuote(symbol, function(quote){
    if(that.cash >= quote * qty){
      that.cash -= quote * qty;
      that.portfolio.add(symbol, qty);
      var index = findStock(that.portfolio.stocks, symbol);
      that.portfolio.stocks[index].price = quote;
      callback(that);
    }
  });
};

Client.prototype.position = function(){
  var sum = 0;
  for(var i = 0; i < this.portfolio.stocks.length; i++){
    sum += this.portfolio.stocks[i].count * this.portfolio.stocks[i].price;
  }

  return sum;
};

// Private helper methods //

function findStock(stocks, symbol){
  for(var i = 0; i < stocks.length; i++){
    if(stocks[i].symbol === symbol.toUpperCase()){
      return i;
    }
  }

  return -1;
}

module.exports = Client;
