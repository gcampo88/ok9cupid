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
      //  debugger;
       DogActions.receiveDogs(petResult.petfinder.pets.pet, petResult.petfinder.lastOffset.$t);
     },
     error: function () {
     }
   });

 },


 fetchSingleDog: function (id) {
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

 }

};

module.exports = DogUtil;
