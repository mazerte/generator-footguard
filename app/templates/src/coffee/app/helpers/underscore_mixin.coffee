define ['underscore'], (_)->

  _.mixin
    isUsable: ( obj )->
      !_.isNull( obj ) and !_.isUndefined( obj ) and obj not ""

    usable: ( obj, value )->
      if !_.isNull( obj ) and !_.isUndefined( obj ) and obj not ""
        return obj
      else
        if _(value).isUsable()
          return value
        else
          return null

  return _
