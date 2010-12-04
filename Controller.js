(function() {
  var Controller;
  Controller = function() {
    this.view = new View(this);
    this.tip = new Tip();
    window.tip = this.tip;
    this.view.renderInitial(this.tip);
    this.tip.setNumberOfPeople(5);
    this.view.render(this.tip);
    this.handle_numberOfPeople(this.tip.numberOfPeople);
    return this;
  };
  Controller.prototype.handleChange = function(field, val) {
    return this["handle_" + field](val);
  };
  Controller.prototype.handle_numberOfPeople = function(numb) {
    this.tip.setNumberOfPeople(numb);
    return this.view.renderGuests(this.tip);
  };
  Controller.prototype.handle_tax = function(tax) {
    this.tip.setTax(tax);
    return this.view.renderGuests(tip);
  };
  Controller.prototype.handle_cost = function(cost) {
    this.tip.setCost(cost);
    return this.view.renderGuests(tip);
  };
  Controller.prototype.handle_rate = function(rate) {
    this.tip.setRate(rate);
    return this.view.renderGuests(tip);
  };
  Controller.prototype.handleGuestChange = function(id, field, val) {
    this.tip.guests[id][field] = val;
    if (field === "percent") {
      if (_.s(val, -1, 1) === "%") {
        val = _.s(val, 0, -1) - 0;
      }
      return this.view.renderPersonTotal(this.tip, id);
    }
  };
  window.Controller = Controller;
}).call(this);
