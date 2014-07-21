/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Client = require('../../app/models/client');

describe('Client', function(){
  describe('constructor', function(){
    it('should create a new client', function(){
      var bob = new Client('Bob Smith', 10000);

      expect(bob).to.be.instanceof(Client);
      expect(bob.cash).to.equal(10000);
      expect(bob.portfolios).to.have.length(0);
    });
  });
});
