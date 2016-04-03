var DogActions = require('../actions/dog_actions');

var DogUtil = {
 fetchManyDogs: function (searchParams) {
   var url = 'http://api.petfinder.com/pet.find?key=a4994cca2cf214901ee9892d3c1f58bf&output=full&format=json';
   $.ajax({
     url: url,
     type: "GET",
     dataType: "jsonp",
     data: {
       location: "10014",
       animal: "dog"
      },
     success: function (petResult) {
      //  debugger;
       DogActions.receiveDogs(petResult.petfinder.pets.pet);
     },
     error: function () {
       console.log("error in call to petfinder API");
     }
   });

 },


 fetchSingleDog: function (id) {
   var url = 'http://api.petfinder.com/pet.find?key=a4994cca2cf214901ee9892d3c1f58bf&output=full&format=json'
   $.ajax({
     url: url,
     type: "GET",
     dataType: "jsonp",
     data: {id: id},
     success: function () {
       console.log("Data retrieved from petfinder API");
     },
     error: function () {
        console.log("error in call to petfinder API");
     }
   });

 }

};

module.exports = DogUtil;
