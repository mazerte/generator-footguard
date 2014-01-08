define ['modernizr'], (Modernizr) ->

  Modernizr.addTest 'fullscreen', ->
    ancelFullScreen = 'ancelFullScreen' # make string minifiable

    # FF9 pre-check
    if document.mozCancelFullScreen and !document.mozFullScreenEnabled
      return false
    for pre in Modernizr._domPrefixes
      if document[[pre.toLowerCase(),'C',ancelFullScreen].join('')]
        return true
    return !!document[['c',ancelFullScreen].join('')] || false
