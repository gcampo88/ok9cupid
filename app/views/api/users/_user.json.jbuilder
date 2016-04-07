json.extract! user, :id, :name, :zipcode, :email,
:search_sex, :search_age, :search_size,
:about_me, :about_life, :ideal_dog, :favorites


json.imageUrl asset_path(user.image.url)
