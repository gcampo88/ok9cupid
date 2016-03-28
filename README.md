# ok9cupid

[Heroku link TK]


## Minimum Viable Product

ok9cupid is a web application inspired by OKCupid built using Ruby on Rails
and React.js. ok9cupid allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete profile information and photos
- [ ] Browse adoptable dogs
- [ ] Search for adoptable dogs that match specific parameters like age, size, sex, location, breed
- [ ] Add dogs to and remove dogs from their list of favorites
- [ ] Be "quickmatched" with a random adoptable dog that meets their search parameters

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: User Model, API, and basic APIUtil (1 day)

**Objective:** User profile information can be created, read, edited and destroyed through
the API.

- [ ] flesh out "User" model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for profile information 
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1 day)

**Objective:** User profile information can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- [ ] implement user component, building out the flux loop as needed.
- [ ] save user search params to the DB anytime they change.
  after editing.

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Browsing Dogs (2 days)

**Objective:** Users can search for adoptable dogs with or without search parameters.

- [ ] set up connection with Petfinder's API
- [ ] set up dogs front end, including index, show, and search pages
- [ ] build form for user to set search parameters, following petfinder's API docs
- [ ] enable infinite search with react-scroll
- [ ] design root page with links to Browse, Quickmatch (tk), Favorites (tk). 
- [ ] create carousel on root page with randomly selected dog photos from dog index 
- Use CSS to style new views


### Phase 6: Favorites (1 day)

**Objective:** Users can add dogs to and remove them from their Favorites list. 

- [ ] create 'Favorites' model
- build out API, Flux loop, and components for:
  - [ ] adding dogs to favorites
  - [ ] viewing specific dogs within Favorites list, as well as all Favorites at same time
  - [ ] removing dogs from favorites
- [ ] Style new elements

### Phase 7: QuickMatch (0.5 days)

**objective:** Enable quickmatch functionality. 

- [ ] QuickMatch pulls in one dog at random from the results of the user's most recent search
- [ ] enable modal pop-up with quickmatch result using react-modal

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] allow users to email shelters directly from app using Sendgrid
- [ ] mimic okCupid's immediate user feedback (like "Ahhh, [location]" that pops up when you enter your zip code). 


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
