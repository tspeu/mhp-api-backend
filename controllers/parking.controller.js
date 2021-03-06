const Parking = require('../models/parking.model.js');

// create new parking
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: 'Data content can not be empty'
    });
  }

  const paking = new Parking({
    idUser: req.body.idUser,
    text: req.body.text,
    idParking: req.body.idParking,
    location: {
      type: 'Point',
      coordinates: [
        req.body.location.coordinates.lat,
        req.body.location.coordinates.lon
      ]
    },
    isEnterParking: req.body.isEnterParking
  });
  paking
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Something wrong while creating the parking data.'
      });
    });
};

// Retrieve all parking from the database.
exports.findAll = (req, res) => {
  console.log('findAll');
  Parking.find()
    .then(p => {
      console.log('----------> ' + p);
      res.send(p);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Something wrong while retrieving parking data.'
      });
    });
};

// Find a single parking with a parkin
exports.findOne = (req, res) => {
  Parking.find({ idUser: req.params.idUser })
    .then(p => {
      console.log('---> ' + p);
      if (!p) {
        return res.status(404).send({
          message: 'user not found with id p' + req.params.idUser
        });
      }
      res.send(p);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        console.log('Error es  ->' + err);
        return res.status(404).send({
          message: 'user not found with id  esto ' + req.params.idUser + err
        });
      }
      return res.status(500).send({
        message: 'Something wrong retrieving user with id ' + req.params.idUser
      });
    });
};

// Update a parking
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: 'User data content can not be empty'
    });
  }

  // Find and update product with the request body
  Parking.findByIdAndUpdate(
    req.params.userId,
    {
      idUser: req.body.idUser,
      text: req.body.text || '',
      idParking: req.body.isParking,
      location: {
        type: { type: 'Point' },
        coordinates: [req.bodylat, req.body.lng]
        //lat: -34.397, lng: 150.644
      },
      isEnterParking: Boolean || true
    },
    { new: true }
  )
    .then(p => {
      if (!p) {
        return res.status(404).send({
          message: 'Data User not found with id ' + req.params.idUser
        });
      }
      res.send(p);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'ParkingData item not found with id ' + req.params.idUser
        });
      }
      return res.status(500).send({
        message:
          'Something wrong updating parkingData item with id ' +
          req.params.idUser
      });
    });
};

// Delete a parking with the specified userId in the request
exports.delete = (req, res) => {
  Parking.findByIdAndRemove(req.params.idUser)
    .then(p => {
      if (!p) {
        return res.status(404).send({
          message: 'parkin item not found with id ' + req.params.idUser
        });
      }
      res.send({ message: ' item deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: ' item not found with id ' + req.params.idUser
        });
      }
      return res.status(500).send({
        message: 'Could not delete  item with id ' + req.params.idUser
      });
    });
};
