//This class is a collection of stops of a given type (bars, restaurants, etc.)
//that the user can visit on their trip.

//A new collection in the database can be created using:
//_______________

//Each stop has the following properties:
//name:  The name of the stop (string)
//address:  The address of the stop (string)
//latitude:  The latitude of the stop (floating point number)
//longitude:  The longitude of the stop (floating point number)
//rating:  The stop's Yelp rating from 0 - 5 (integer)
//price:  The stop's Yelp price, 0 - 5 $'s (integer)
//tags:  Optional tags for the stop.  E.g. "irish pub", "michelin star", "non-smoking", etc. (array of strings)

//The available methods are:
//addStop(data, callback):
//Adds a new stop to the database.
//data is an object whose key value pairs are the data for the new stop.
//  E.g. {name: "Tempest", address: "431 Natoma Street, San Francisco, CA   94103", ...}
//callback is a function that is called when new stop has been created.  The callback is passed
//  err which contains error information if there is an error and is ________ otherwise and the
//  newly created stop.
//
//removeStop(options, callback)
//Removes any stops from the database that match the provided options.
//options is an object whose key value pairs are the data from the schema used to select stops
//  to remove.  For example {price: 3} would remove stops whose yelp price is "$$$".
//Callback ______________
//
//updateStop(___)
//
//findStop(options)
//

class Stops () {
  constructor(modelName) {
    this._schema = new mongoose.Schema({
      name: String,       //The name of the stop
      address: String,    //The address of the stop as a string
      latitude: Number,   //The latitude of the stop
      longitude: Number,  //The longitude of the stop
      rating: Number,     //The stop's Yelp rating from 0 - 5
      price: Number,      //The stop's Yelp price, 0 - 5 $'s
      tags: []            //Optional tags for the stop.  E.g. "irish pub", "michelin star", "non-smoking", etc.
    });

    this._name = _modelName;

    this._model = mongoose.Model(modelName, this._Schema);
  }

  addStop(data, callback) {
    this._model.create(data, callback);
  }

  removeStop(options, callback) {
    this._model.remove(options, callback);
  }

  updateStop(id, data) {

  }

  findStop(options) {

  }
}