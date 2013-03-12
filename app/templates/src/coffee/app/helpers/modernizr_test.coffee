define ['modernizr'], (Modernizr)->

	Modernizr.addTest 'fullscreen', ()->
		ancelFullScreen = 'ancelFullScreen' # make string minifiable

		# FF9 pre-check
		return false if document.mozCancelFullScreen and !document.mozFullScreenEnabled
		return true for pre in Modernizr._domPrefixes when document[[pre.toLowerCase(),'C',ancelFullScreen].join('')]
		return !!document[['c',ancelFullScreen].join('')] || false
