json.extract! user, :id, :name, :zipcode, :email,
:search_sex, :search_age, :search_size,
:about_me, :about_life, :ideal_dog


json.image_url asset_path(user.image.url)
