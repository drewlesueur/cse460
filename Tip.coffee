class Tip
  #public, defaults
  rate: 15
  numberOfPeople: 0
  cost: 100
  tax: 0
  includeTax: false
  totalTip: 0
  guests: []
  #public methods
  updateTotals: () ->

  setTax: (tax) ->
    @tax = tax - 0
  setCost: (cost) ->
    @cost = cost - 0
  setRate: (rate) ->
   @rate = rate - 0
  setNumberOfPeople: (numb) ->
    if numb is ""
      return
    old = @guests.length
    diff = numb - old
    @numberOfPeople = numb - 0
    if diff <= 0
      return
    for i in [old..@numberOfPeople-1]
      @guests[i] = new Guest name: "", percent: "", cost: "", tip: "", total: ""


window.Tip = Tip


