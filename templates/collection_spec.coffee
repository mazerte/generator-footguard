define ['app/collections/<% if( folder ) { print(folder +"/"); } %><%= name %>_collection'], (<%= _.classify(name) %>) ->

  describe 'Test <%= _.classify(name) %> Collection', ->

    it '<%= _.classify(name) %> is defined', ->
      expect(<%= _.classify(name) %>).not.to.be(undefined)
