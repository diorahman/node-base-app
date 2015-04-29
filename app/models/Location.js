
var mongoose = require('mongoose');

var timestamp = require("./plugins/timestamp");

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  location: {
    'type' : { type: String, default: 'Point' },
    coordinates: [
      {type: 'Number'}
    ]
  },
  place: Schema.Types.Mixed
});

LocationSchema.plugin(timestamp.useTimestamps);

LocationSchema.index({ location: '2dsphere', name: 1 });

global['Location'] = mongoose.model('Location', LocationSchema);