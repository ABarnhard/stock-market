'use strict';

var Portfolio = require('./portfolio');
var Stock = require('./stock');

function Client(name, cash){
  this.name = name;
  this.cash = parseFloat(cash);
  this.portfolio = new Portfolio(name + '\'s portfolio');
}

Client.prototype.purchase = function(symbol, qty, callBack){
  var that = this;
  qty = parseInt(qty);
  Stock.getQuote(symbol, function(quote){
    if(that.cash >= quote * qty){
      that.cash -= quote * qty;
      that.portfolio.add(symbol, qty);
      var index = findStock(that.portfolio.stocks, symbol);
      that.portfolio.stocks[index].price = quote;
      callBack(that);
    }
  });
};

Client.prototype.sell = function(symbol, qty, callBack){
  var that = this;
  qty = parseInt(qty);
  var index = findStock(this.portfolio.stocks, symbol);
  if(index >= 0){
    if(this.portfolio.stocks[index].count >= qty){
      Stock.getQuote(symbol, function(quote){
        that.cash += qty * quote;
        that.portfolio.stocks[index].price = quote;
        that.portfolio.del(symbol, qty);
        callBack(that);
      });
    }
  }
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
