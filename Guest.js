(function() {
  var Guest;
  Guest = function(obj) {
    obj.prototype = Guest;
    return obj;
    return this;
  };
  window.Guest = Guest;
}).call(this);
