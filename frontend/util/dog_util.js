var DogActions = require('../actions/dog_actions');

var DogUtil = {
 fetchManyDogs: function (searchParams) {
   var data = searchParams ? searchParams : ({ location: "10014", animal: "dog" });
   var url = 'http://api.petfinder.com/pet.find?key=a4994cca2cf214901ee9892d3c1f58bf&output=full&format=json';
   $.ajax({
     url: url,
     type: "GET",
     dataType: "jsonp",
     data: data,
     success: function (petResult) {
       DogActions.receiveDogs(petResult.petfinder.pets.pet, petResult.petfinder.lastOffset.$t);
     },
     error: function () {
     }
   });

 },

 fetchSingleDog: function (id) {
  //  debugger;
   var url = 'http://api.petfinder.com/pet.get?key=a4994cca2cf214901ee9892d3c1f58bf&format=json';
   $.ajax({
     url: url,
     type: "GET",
     dataType: "jsonp",
     data: {id: id},
     success: function (petResult) {
       DogActions.receiveSingleDog(petResult.petfinder.pet);
     },
     error: function () {
     }
   });

 },

 fetchRandomDog: function (searchParams) {
   var url = 'http://api.petfinder.com/pet.getRandom?key=a4994cca2cf214901ee9892d3c1f58bf&format=json&output=full';
   $.ajax({
     url: url,
     type: "GET",
     dataType: "jsonp",
     data: searchParams,
     success: function (petResult) {
       DogActions.receiveSingleDog(petResult.petfinder.pet);
     },
     error: function () {
     }
   });

 }

};

module.exports = DogUtil;
