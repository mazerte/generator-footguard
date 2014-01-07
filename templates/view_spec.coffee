define ['app/views/<% if( folder ) { print(folder +"/"); } %><%= name %>_view'], (<%= _.classify(name) %>)->

  describe 'Test <%= _.classify(name) %> View', ()->

    it '<%= _.classify(name) %> is defined', ()->
      expect(<%= _.classify(name) %>).not.to.be(undefined)
