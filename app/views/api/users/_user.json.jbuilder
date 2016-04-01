json.extract! user, :id, :name, :zipcode, :email,
:search_sex, :search_age, :search_size,
:about_me, :about_life, :ideal_dog

# debugger

json.image asset_path(user.image.url)
