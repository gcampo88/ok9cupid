var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var DogConstants = require('../constants/dog_constants');

var DogStore = new Store(Dispatcher);

var currentDog;

var _dogs = [];

DogStore.singleFetchedDog = function () {
  return currentDog;
};

DogStore.allFetchedDogs = function () {
  return _dogs;
};

DogStore.resetDogs = function () {
  _dogs = [];
};

DogStore.resetDog = function (dog) {
  currentDog = dog;
};

var dogItem;

DogStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DogConstants.DOGS_RECEIVED:
    DogStore.resetDogs();
    payload.dogs.forEach(function (dog) {
      dogItem = {};
      dogItem.id = dog.id.$t;
      dogItem.name = dog.name.$t;
      dogItem.age = dog.age.$t;
      dogItem.size = dog.size.$t;
      dogItem.sex = dog.sex.$t;
      dogItem.breeds = dog.breeds.breed;
      dogItem.city = dog.contact.city.$t;
      dogItem.zipcode = dog.contact.zip.$t;
      dogItem.email = dog.contact.email.$t;
      dogItem.photos = dog.media.photos.photo;
      dogItem.description = dog.description.$t;
      _dogs.push(dogItem);
      DogStore.__emitChange();

    });


      break;
    case DogConstants.DOG_RECEIVED:
      DogStore.resetDog(payload.dog);
      this.__emitChange();

      break;

  }

};

module.exports = DogStore;
