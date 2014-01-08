define [
  'backbone'<% if( model ) { %>
  'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model' <% } %>
], (Backbone<% if( model ) { print(", " + _.classify(model)); } %>) ->

  class <%= _.classify(name) %>Collection extends Backbone.Collection
    <% if( model ) { %>
    model: <%= _.classify(model) %>
    <% } %>
