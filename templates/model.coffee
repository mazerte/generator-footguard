define [
  'backbone'
], (Backbone)->

  class <%= _.classify(name) %>Model extends Backbone.Model

    defaults:
      key: "value"
