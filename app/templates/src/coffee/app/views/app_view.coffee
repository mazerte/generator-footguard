define [
  'backbone'
  'underscore'
  'text!templates/app.html'
], (Backbone, _, tpl) ->

  class App extends Backbone.View

    el: "#total"

    events: {}

    initialize: (options) ->


    render: ->
      @$el.html _.template( tpl, {  } )

  appView = new App()
