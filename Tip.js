(function() {
  var Tip;
  Tip = function() {};
  Tip.prototype.rate = 15;
  Tip.prototype.numberOfPeople = 0;
  Tip.prototype.cost = 100;
  Tip.prototype.tax = 0;
  Tip.prototype.includeTax = false;
  Tip.prototype.totalTip = 0;
  Tip.prototype.guests = [];
  Tip.prototype.updateTotals = function() {};
  Tip.prototype.setTax = function(tax) {
    this.tax = tax - 0;
    return _.isNaN(this.tax) ? (this.tax = 0) : null;
  };
  Tip.prototype.setCost = function(cost) {
    this.cost = cost - 0;
    return _.isNaN(this.cost) ? (this.cost = 0) : null;
  };
  Tip.prototype.setRate = function(rate) {
    this.rate = rate - 0;
    return _.isNaN(this.rate) ? (this.rate = 0) : null;
  };
  Tip.prototype.setNumberOfPeople = function(numb) {
    var diff, i, old;
    if (numb === "") {
      return false;
    }
    old = this.guests.length;
    diff = numb - old;
    this.numberOfPeople = numb - 0;
    if (diff <= 0) {
      return true;
    }
    for (i = old; (old <= this.numberOfPeople - 1 ? i <= this.numberOfPeople - 1 : i >= this.numberOfPeople - 1); (old <= this.numberOfPeople - 1 ? i += 1 : i -= 1)) {
      this.guests[i] = new Guest({
        name: "",
        percent: "",
        cost: "",
        tip: "",
        total: ""
      });
    }
    return true;
  };
  window.Tip = Tip;
}).call(this);
