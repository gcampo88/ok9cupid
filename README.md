[ok9cupid](http://www.ok9cupid.com)

## Application Description
ok9cupid is a clone of the dating site OkCupid, and uses React.js on a Rails back-end. Its purpose is for users to search for adoptable dogs. Users can create profiles with information about the kind of dog they're looking for (including age, size, sex, location), then browse dogs that meet those criteria, using data pulled in from Petfinder, and Favorite those they are interested in. Impatient users can also be "quickmatch"ed with dogs that meet their search parameters.

## Features
- [x] Secure user authentication using BCrypt
- [x] Facebook login option
- [x] User profile with image upload and storage capabilities through AWS
- [x] Manipulation of Petfinder API to locate and list real adoptable dogs

## App Components
ok9cupid was written using React.js and follows the Flux architecture for one-way information flow. Example: when a user favorites a dog, an AJAX request is triggered to POST a new favorite. Upon success, the resulting json representation of that Favorite object is passed over to the Favorite Actions bundler, and is then dispatched to the Favorite Store, which then emits a notification to all listening components that there's been a change. All listening components will then take appropriate action (if any), and rerender if a state change was triggered (causing the "Add Favorite" text to change to "Remove Favorite", among other results).

## User Authentication
When a user signs up, the password he/she creates is used to instantiate a hashed & salted password_digest using the Rails gem BCrypt. For security purposes, only the digest gets stored in the database. When a user later logs in, the password he or she types is checked against its salted, hashed digest version by BCrypt, and the user successfully logs in if there's a match. Upon logging in, the user is generated a new session token using SecureRandom; this session token is how Rails determines who the current user is at all points of the app.

## User Profile
Users can enter text to fill out their profiles simply by clicking on a text box (with either their own existing text in place, or else the default placeholder text). When they click away from the text box in question ("onBlur"), an AJAX patch request fires immediately to update their profile. Users can also update and save their dog search parameters on this page. Finally, they can upload profile pictures of themselves, which will then be saved to the database and stored in AWS storage.

## Browse Dogs
The Browse Dogs page relies heavily on Petfinder's public API, specifically the pet.find(parameters) method, which accepts arguments like location, age, sex, size, breed, etc. One of the required search parameters is location; to handle this in cases where the user has yet to enter his/her zip code (most often because they logged in through facebook), I've made the search default to NYC. This site would be tough to scale up in a major way due to Petfinder's 10k requests/ day limit on API clients (which I hit earlier this week).

## QuickMatch
QuickMatch relied on another of the Petfinder API methods: pet.getRandom(parameters). I used React-Modal to pop open the modal onClick of the QuickMatch tab.

## Favorites
The Favorites table in the database is essentially a join table between my Users table and Petfinder's Dogs table, storing foreign keys for both users and dogs, plus some light information about the dogs to display on the Favorites Index page.
This gets a little tricky because when a dog gets adopted, Petfinder removes its ID from the database; so in this case, the Favorite continues to exist on the Favorites Index page, until the user clicks on the Favorite (at which point he/she is redirected to a page informing them that the pup is no longer available).



## Future work
- [ ] I'd love to add a feature that would allow users to email shelters directly from the app, potentially including their profile information as their adoption application info.
- [ ] I'd like to add omniauth for google as well.
- [ ] It would be fun to allow users to establish relationships with other users through the site, so that couples or friends who both had accounts could send each other dog profiles of note, etc.
- [ ] I'd like to add some more CSS features, like a carousel of available dogs on the home page, etc.    
