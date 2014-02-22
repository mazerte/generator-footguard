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

      # use custom highlighting
      marked.setOptions {
        highlight: (code, lang) -> 
          if lang then hljs.highlight(lang, code).value
          else hljs.highlightAuto(code).value
      }

      ## converts markdown to html
      selector = Backbone.$('div.container')
      content = selector.html()
      selector.html(marked(content))

  appView = new App()
