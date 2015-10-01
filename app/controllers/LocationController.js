
module.exports = {

    index: function(req, res, next) {
        res.ok('Location API. Add, update and search');
    },

    add: function(req, res, next) {

        if (!Utils.hasProperty(req.body, ['name','location'])) {
            var err = new Error('Required location data is not submitted');
            err.status = 403;
            return next(err);
        }

        var location = req.body.location;
        if (!Utils.hasProperty(location, ['lat','lng'])) {
            var err = new Error('Required location data is not submitted');
            err.status = 403;
            return next(err);
        }

        var place = {};
        if (req.body.place && _.isObject(req.body.place) && !_.isArray(req.body.place)) {
            place = req.body.place;
        }

        var locationData = {
            name: req.body.name,
            location: { type: 'Point', coordinates: [req.body.location.lng, req.body.location.lat] },
            place: place,
        };

        Location.create(locationData, function(err, result) {
            if (err) {
                err.status = 500;
                return next(err);
            }

            res.ok(result, 'New location added');
        });

    },

    update: function(req, res, next) {
        res.ok('Location API. Coming soon');
    },

    search: function(req, res, next) {

        if (!Utils.hasProperty(req.query, ['lng','lat'])) {

            if (!Utils.hasProperty(req.query, ['name'])) {
                var err = new Error('Required location data is not submitted');
                err.status = 403;
                return next(err);
            }            else {
                searchByName(req.query.name, req, res, next);
            }

        }        else {

            var search = {
                location: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
                maxDistance: req.query.max ? parseInt(req.query.max) : 5,
                name: req.query.name ? req.query.name : null,
            };

            searchByCoordinate(search, req, res, next);
        }

        function attachDistance(reference, places) {
            var placesWithDistance = _.map(places, function(place) {
                var newPlace = place.toObject();
                newPlace['distance'] = Geo.getDistance(reference, place.location.coordinates);
                return newPlace;
            });

            return placesWithDistance;
        }

        function searchByName(name, req, res, next) {
            Location.find({name: new RegExp(name, 'i')}, function(err, docs) {
                if (err) {
                    err.status = 500;
                    return next(err);
                }                else {
                    res.ok(docs, 'Location list');
                }
            });
        }

        function searchByCoordinate(search, req, res, next) {

            var query = {
                location: {
                    $near: {
                        $geometry: { type: 'Point',  coordinates: search.location },
                        $maxDistance: search.maxDistance * 1000,
                    },
                },
            };

            if (search.name) {
                query.name = new RegExp(search.name, 'i');
            }

            Location.find(query, function(err, docs) {
                if (err) {
                    err.status = 500;
                    return next(err);
                }                else {
                    res.ok(attachDistance(search.location, docs), 'Location list');
                }
            });
        }

    },

};

/*
Location.aggregate(
  [
    { "$geoNear": {
      "near": {
        "type": "Point",
        "coordinates": search.location
      },
      "distanceField": "distance",
      "maxDistance": search.maxDistance,
      "spherical": true,
      "query": { "location.type": "Point" }
    }},
    { "$sort": { "distance": -1 } } // Sort nearest first
  ],
  function(err,docs) {
    if (err) {
      err.status = 500;
      return next(err);
    }
    else {
      res.ok(docs, 'Location list');
    }
  }
);
*/

/*
Location.geoNear(point, { maxDistance : search.maxDistance, spherical : true }, function(err, results, stats) {
  if (err) {
    err.status = 500;
    return next(err);
  }
  else {
    res.ok(results, 'Location list');
  }
});
*/

