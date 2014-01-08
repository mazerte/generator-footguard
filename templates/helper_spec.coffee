define ['app/helpers/<% if( folder ) { print(folder +"/"); } %><%= name %>_helper'], (<%= _.classify(name) %>) ->

  describe 'Test <%= _.classify(name) %> Helper', ->

    it '<%= _.classify(name) %> is defined', ->
      expect(<%= _.classify(name) %>).not.to.be(undefined)
      expect(<%= _.classify(name) %>).to.be.a("function")
