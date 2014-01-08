define ['underscore'], (_) ->

  _.mixin
    isUsable: (obj) ->
      !_.isNull( obj ) and !_.isUndefined( obj ) and obj isnt ""

    usable: (obj, value) ->
      if !_.isNull( obj ) and !_.isUndefined( obj ) and obj isnt ""
        return obj
      else
        if _(value).isUsable()
          return value
        else
          return null

  return _
