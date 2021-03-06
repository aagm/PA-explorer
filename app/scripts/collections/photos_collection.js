define([
  'jquery',
  'underscore',
  'underscoreString',
  'backbone'
], function($, _, underscoreString, Backbone) {

  'use strict';

  var PhotosCollection = Backbone.Collection.extend({

    url: 'http://www.panoramio.com/map/get_panoramas.php',

    parse: function(data) {
      return data.photos;
    },

    getByBounds: function(bounds) {
      var deferred = new $.Deferred();
      this.fetch({
        dataType: 'jsonp',
        data: {
          set: 'public',
          from: 0,
          to: 2000,
          minx: bounds.getSouthWest().lng,
          miny: bounds.getSouthWest().lat,
          maxx: bounds.getNorthEast().lng,
          maxy: bounds.getNorthEast().lat,
          size: 'medium',
          mapfilter: false
        },
        success: deferred.resolve,
        error: function(err) {
          throw err.textStatus;
        }
      });
      return deferred.promise();
    }

  });

  return PhotosCollection;

});
