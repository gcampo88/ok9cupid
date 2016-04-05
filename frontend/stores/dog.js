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
      if (dog.media.photos) {
        dogItem.photos = dog.media.photos.photo;
      }
      dogItem.description = dog.description.$t;
      _dogs.push(dogItem);
      DogStore.__emitChange();

    });


      break;
    case DogConstants.DOG_RECEIVED:
      receivedDog = {};
      receivedDog.id = payload.dog.id.$t;
      receivedDog.name = payload.dog.name.$t;
      receivedDog.age = payload.dog.age.$t;
      receivedDog.size = payload.dog.size.$t;
      receivedDog.sex = payload.dog.sex.$t;
      receivedDog.breeds = payload.dog.breeds.breed;
      receivedDog.city = payload.dog.contact.city.$t;
      receivedDog.zipcode = payload.dog.contact.zip.$t;
      receivedDog.email = payload.dog.contact.email.$t;
      receivedDog.photos = payload.dog.media.photos.photo;
      receivedDog.description = payload.dog.description.$t;
      DogStore.resetDog(receivedDog);
      this.__emitChange();

      break;

  }

};

module.exports = DogStore;
