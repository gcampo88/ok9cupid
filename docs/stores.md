# Flux Stores

### ProfileStore

Holds all persisted user profile data.

##### Actions:
- `receiveProfileItems`

##### Listeners:
- `ProfileIndex` (passes to `ProfileIndexItem` via props)


### DogsStore

Holds all persisted dog data, as well as user search parameters to send to the Petfinder API.

##### Actions:
- `receiveAllDogs`
- `receiveSingleDog`

##### Listeners:
- `DogsIndex`
- `DogsIndexItem`


### FavoritesStore

Holds all persisted favorites data

##### Actions:
- `receiveFavorites`

##### Listeners:
- `FavoritesIndex`(passes to `FavoritesIndexItem` on props)


