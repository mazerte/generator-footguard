define ['underscore'], (_)->

	create_context = (stubs)->
		map = {}
		to_define = {}
		for key, value of stubs
			continue unless value
			if value is true
				map[key] = "spec/fixtures/#{key.replace('app/', '')}"
			else if _.isString value
				map[key] = "spec/fixtures/#{value}"
			else if _.isFunction(value) or _.isObject(value) or _.isArray(value)
				map[key] = "stub-#{key}"
				to_define[key] = value

		config = _.extend( _.clone(requirejs.s.contexts['_'].config),
			context: "test-" + Math.floor(Math.random() * 1000000)
			map: 
				'*' : map
		)

		_(to_define).each (value, key)->
			define map[key], [], ()->
				return value

		return  requirejs.config config