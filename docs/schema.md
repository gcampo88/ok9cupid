# Schema Information

## users
Users have many Favorites.

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
zipcode     | integer   | not null
email       | string    | not null, indexed
about_me    | text      | 
about_life  | text      | 
ideal_dog   | array     | 
profile_pic | img       | 
search-size | text      | 
search-age  | text      | 
search-sex  | text      | 

users Auth: 

column name     | data type | details
----------------|-----------|-----------------------
password_digest | string    | not null
session_token   | string    | not null, indexed, unique


## favorites
Favorites belong to users, and join dogs (from petfinder's api) to users.

column name | data type | details
------------|-----------|-----------------------
user_id     | integer   | not null, foreign key (references users), indexed
dog_id      | integer   | not null, foreign key (references dogs), indexed
