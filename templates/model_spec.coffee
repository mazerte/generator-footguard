define ['app/models/<% if( folder ) { print(folder +"/"); } %><%= name %>_model'], (<%= _.classify(name) %>) ->

  describe 'Test <%= _.classify(name) %> Model', ->

    it '<%= _.classify(name) %> is defined', ->
      expect(<%= _.classify(name) %>).not.to.be(undefined)
