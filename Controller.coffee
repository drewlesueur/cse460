class Controller
  constructor: () ->
    @view = new View(this)
    @tip = new Tip()
    window.tip = @tip
    @view.renderInitial(@tip)
    @tip.setNumberOfPeople 5
    @view.render @tip
    @handle_numberOfPeople @tip.numberOfPeople
  handleChange: (field, val) ->
     
    #handles a change in the view
    this["handle_" + field](val)

  handle_numberOfPeople: (numb) ->
    if  @tip.setNumberOfPeople numb
      @view.renderGuests(@tip)
  handle_tax: (tax) ->
    @tip.setTax tax
    @view.renderGuests(tip)
  handle_cost: (cost) ->
    @tip.setCost cost
    @view.renderGuests tip
  handle_rate: (rate) ->
    @tip.setRate rate
    @view.renderGuests tip
  handleGuestChange: (id, field, val) ->
    @tip.guests[id][field] = val
    if field is "percent"
      if _.s(val, -1, 1) is "%"
        val = _.s(val, 0, -1) - 0 
      @view.renderPersonTotal @tip, id
        
    
window.Controller = Controller
