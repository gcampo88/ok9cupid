# Phase 6: Favorites (1 day)

## Rails
### Models
Favorites

### Controllers
Favorites: create, show, index, destroy

### Views
* favorites/index.json.jbuilder
* favorites/show.json.jbuilder

## Flux
### Views (React Components)
* FavoritesIndex
  * FavoritesIndexItem

### Stores
* Favorites

### Actions
* FavoritesActions.fetchAllFavorites <- triggered by API Util
* FavoritesActions.fetchSingleFavorite <- triggered by API Util
* FavoritesActions.destroyFavorite
* FavoritesActions.createFavorite

### API Util: 
* APIUtil.fetchAllFavorites
* APIUtil.fetchSingleFavorite



## Gems/Libraries
