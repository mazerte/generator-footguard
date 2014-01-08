define [
  'backbone'
  'underscore'<% if( tpl ) { %>
  'text!templates/<% if( folder ) { print(folder +"/"); } %><%= tpl %>.html'<% } %><% if( model ) { %>
  'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model'<% } %>
], (Bacbone, _<% if( tpl ) { print(', tpl'); } %><% if( model ) { print(', ' + _.classify(model)); } %>) ->

  class <%= _.classify(name) %>View extends Backbone.View

    events: {}

    initialize: (options)->
      <% if( model ) { %>@model = options.model if options.model <% } %>

    render: ->
      <% if( tpl ) { %>@$el.html _.template( tpl, { <% if( model ) { %>model: @model<% } %> } )<% } %>
