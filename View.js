(function() {
  var View;
  View = function(controller) {
    this.controller = controller;
    return this;
  };
  View.prototype.initialRendered = false;
  View.prototype.render = function(tip) {
    $('#tax').val(tip.tax || "");
    $('#rate').val(tip.rate || "");
    $('#cost').val(tip.cost || "");
    $('#tip').val(tip.rate * .01 * (tip.cost + tip.tax));
    $('#grand').val(($('#tip').val() - 0) + ($('#tax').val() - 0) + ($('#cost').val() - 0));
    return $('#numberOfPeople').val(tip.numberOfPeople);
  };
  View.prototype.renderPersonTotal = function(tip, id) {
    var guest, tippy;
    guest = tip.guests[id];
    tippy = (tip.cost / tip.numberOfPeople) * guest.percent * .01;
    $("#person_" + (id) + " .tip").val(tippy);
    return $("#person_" + (id) + " .total").val(tippy + (tip.cost / tip.numberOfPeople));
  };
  View.prototype.renderGuests = function(tip) {
    var _result, id;
    $('#guests').empty();
    this.render(tip);
    _result = [];
    for (id = 0; (0 <= tip.numberOfPeople - 1 ? id <= tip.numberOfPeople - 1 : id >= tip.numberOfPeople - 1); (0 <= tip.numberOfPeople - 1 ? id += 1 : id -= 1)) {
      _result.push(this.renderGuest(tip, id));
    }
    return _result;
  };
  View.prototype.renderGuest = function(tip, id) {
    var controller, cost, guest, percent, tippy, total;
    percent = tip.rate;
    cost = (tip.cost + tip.tax) / tip.numberOfPeople;
    tippy = (percent * .01) * cost;
    total = cost + tippy;
    guest = tip.guests[id];
    $('#guests').append($("<div class=\"person\" id=\"person_" + (id) + "\">\n  <pre>\n  Name        <input type=\"text\" class=\"name\" value=\"" + (guest.name) + "\" />\n  Percent     <input size=\"4\" type=\"text\" class=\"percent\" value=\"" + (percent) + "\"/>%\n  cost w tax $<input type=\"text\" readonly class=\"cost\" value=\"" + (cost) + "\" />\n  tip        $<input type=\"text\" readonly class=\"tip\" value=\"" + (tippy) + "\"/>\n  total      $<input type=\"text\" readonly class=\"total\" value=\"" + (total) + "\"/>\n  </pre>\n</div>"));
    controller = this.controller;
    return $("#person_" + (id)).find('input').each(function() {
      return $(this).keyup(function(e) {
        return controller.handleGuestChange(id, $(this).attr("class"), $(this).val());
      });
    });
  };
  View.prototype.renderInitial = function(tip) {
    var controller;
    this.initialRendered = true;
    $('body').append($("<h1>Drew LeSueur's Tip Calculator</h1>\n<pre>\nLocale:             <select><option>USA</option></select>\nTotal tax          $<input type=\"text\" id=\"tax\" value=\"\"/>\n(If tax entered, will be included)\nTip rate:           <input type=\"text\" id=\"rate\" value=\"\"/>%\nCost of Bill:      $<input type=\"text\" id=\"cost\" value=\"\"/>\nTotal Tip          $<input type=\"text\" readonly id=\"tip\" value=\"\"/>\nGRAND TOTAL:        <input type=\"text\" readonly id=\"grand\" value=\"\"/>\nNumber of people:   <input type=\"text\" id=\"numberOfPeople\" value=\"\"/>\n</pre>\n<div id=\"guests\">\n\n</div>"));
    this.render(tip);
    controller = this.controller;
    return $('input').keyup(function(e) {
      return controller.handleChange($(this).attr('id'), $(this).val());
    });
  };
  window.View = View;
}).call(this);
