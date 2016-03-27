# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Dogs (from petfinder's API) 

- `GET` (api.petfinder.com/pet.find/)
  - Dogs index/search
  - accepts query params to filter dogs by size, location, age, gender
- `GET /api/dogs/:id` (api.petfinder.com/pet.get/)


### Favorites

- `GET /api/favorites`
- `POST /api/favorites`
- `GET /api/favorites/:id`
- `DELETE /api/favorites/:id`

### Quickmatch

- `GET /api/quickmatch`

