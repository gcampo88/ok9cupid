var DogUtil = {
 fetchManyDogs: function () {
   var url = 'http://api.petfinder.com/pet.getRandom?&key=a4994cca2cf214901ee9892d3c1f58bf&output=full&format=json';
   $.ajax({
     url: url+'&callback=?',
     type: "GET",
     dataType: "jsonp",
     data: {},
     succcess: function () {
       alert("made it");
       console.log("Data retrieved from petfinder API");
     },
     error: function () {
       console.log("error in call to petfinder API");
     },
     complete: function () {
       console.log("completed ajax petfinder call..")
     }
   });

 },

 fetchSingleDog: function (id) {
   $.ajax({
     url: "",
     type: "GET",
     dataType: "",
     data: "",
     contentType: false,
     processData: false,
     succcess: function () {
       console.log("Data retrieved from petfinder API");
     },
     error: function () {
        console.log("error in call to petfinder API");
     }
   });

 }

};

module.exports = DogUtil;
