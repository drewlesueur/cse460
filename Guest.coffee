class Guest
  constructor: (obj) ->
    obj.prototype = Guest
    return obj
window.Guest = Guest

