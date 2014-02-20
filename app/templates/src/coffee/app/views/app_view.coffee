define [
  'backbone'
  'underscore'
  'text!templates/app.html'
], (Bacbone, _, tpl) ->

  class App extends Backbone.View

    el: "#total"

    events: {}

    initialize: (options) ->
      console.log marked('some markdown')

    render: ->
      @$el.html _.template( tpl, {  } )

      selector = Backbone.$('div.container')
      content = selector.html()
      selector.html(marked(content))

  appView = new App()
