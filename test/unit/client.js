/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Client = require('../../app/models/client');
//var Stock = require('../../app/models/stock');

describe('Client', function(){
  describe('constructor', function(){
    it('should create a new client', function(){
      var bob = new Client('Bob Smith', 10000);

      expect(bob).to.be.instanceof(Client);
      expect(bob.cash).to.equal(10000);
      expect(bob.portfolio.stocks).to.have.length(0);
    });
  });
  describe('#purchase', function(){
    it('should decrease cash and add stock to position', function(done){
     var bob = new Client('Bob Smith', 10000);

     bob.purchase('aapl', 50, function(client){
      expect(client.cash).to.be.below(10000);
      expect(client.portfolio.stocks.length).to.be.above(0);
      expect(client.position()).to.be.above(0);
     });
     bob.purchase('msft', 25, function(client){
      expect(client.cash).to.be.below(10000);
      expect(client.portfolio.stocks.length).to.be.above(0);
      expect(client.position()).to.be.above(0);
      done();
     });
    });
  });

});
