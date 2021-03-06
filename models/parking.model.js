const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schema');

const ParkingSchema = mongoose.Schema(
  {
    idUser: Number,
    text: String,
    idParking: Number,
    location: {
      type: { type: String },
      coordinates: [Number]
    },

    isEnterParking: Boolean
  },
  {
    timestamps: true
  }
);
/*The coordinates will be stored as an array in the format 
[longitude, latitude]. We index on location and let mongoDB know we are using a “2dsphere”. */
ParkingSchema.index({ location: '2dsphere' });
// ParkingSchema.index({ location: '2d' });
/* 
location: {
  type: "Point",
  coordinates: [36.098948, -112.110492]
  },
  */

const ParkingData = mongoose.model('parkings', ParkingSchema);
module.exports = ParkingData;
