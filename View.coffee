class View

  initialRendered: false
  constructor: (controller) ->
    @controller = controller 
  render: (tip) ->
    $('#tax').val tip.tax
    $('#rate').val tip.rate
    $('#cost').val tip.cost
    $('#tip').val tip.rate * .01 * (tip.cost + tip.tax)

    $('#grand').val ($('#tip').val() - 0) + ($('#tax').val() - 0) + ($('#cost').val() - 0)
    $('#numberOfPeople').val tip.numberOfPeople
  renderPersonTotal: (tip, id) ->
    guest = tip.guests[id]
    tippy = (tip.cost/tip.numberOfPeople) * guest.percent * .01
    $("#person_#{id} .tip").val tippy
    $("#person_#{id} .total").val tippy + (tip.cost / tip.numberOfPeople)
  renderGuests: (tip) ->
    $('#guests').empty()
    @render tip
    for id in [0..tip.numberOfPeople-1]
      @renderGuest tip, id 
  renderGuest: (tip, id) ->
    percent =  tip.rate
    cost = (tip.cost + tip.tax) / tip.numberOfPeople
    tippy = ( percent * .01 ) * cost
    total = cost + tippy
    guest = tip.guests[id]
    $('#guests').append $ """
      <div class="person" id="person_#{id}">
        <pre>
        Name        <input type="text" class="name" value="#{guest.name}" />
        Percent     <input size="2" type="text" class="percent" value="#{percent}"/>%
        cost w tax $<input type="text" readonly class="cost" value="#{cost}" />
        tip        $<input type="text" readonly class="tip" value="#{tippy}"/>
        total      $<input type="text" readonly class="total" value="#{total}"/>
        </pre>
      </div>
    """
    controller = @controller
    $("#person_#{id}").find('input').each () ->
      $(this).keyup (e) ->
        controller.handleGuestChange id, $(this).attr("class"), $(this).val() 

  renderInitial: (tip) ->
    @initialRendered  = true
    $('body').append $ """
      <h1>Drew LeSueur's Tip Calculator</h1>
      <pre>
      Locale:             <select><option>USA</option></select>
      Total tax          $<input type="text" id="tax" value=""/>
      (If tax entered, will be included)
      Tip rate:           <input type="text" id="rate" value=""/>%
      Cost of Bill:      $<input type="text" id="cost" value=""/>
      Total Tip          $<input type="text" readonly id="tip" value=""/>
      GRAND TOTAL:        <input type="text" readonly id="grand" value=""/>
      Number of people:   <input type="text" id="numberOfPeople" value=""/>
      </pre>
      <div id="guests">

      </div>
    """
    @render tip
    #notify the controller of any change
    controller = @controller
    $('input').keyup (e) ->
      controller.handleChange $(this).attr('id'), $(this).val()


window.View = View
