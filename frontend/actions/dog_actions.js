var Dispatcher = require('../dispatcher/dispatcher');
var DogConstants = require('../constants/dog_constants');


module.exports = {
  receiveDogs: function (dogs, offset) {
    Dispatcher.dispatch({
      actionType: DogConstants.DOGS_RECEIVED,
      dogs: dogs,
      offset: offset
    });
  },

  receiveSingleDog: function (dog) {
    Dispatcher.dispatch({
      actionType: DogConstants.DOG_RECEIVED,
      dog: dog
    });
  }
};
