# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)




gigi = User.create!(name: "Gigi", zipcode: "10014", email: "gigi.campo@gmail.com",
password_digest: "$2a$10$OprmvzZSU/TLZ/fxq/EbkegN2H0Ub.FfMK3tOMY6zIZ5s5WvpjTJe",
search_sex: "F", search_age: "Young", search_size: "Small",
about_me: "I am an App Academy student with tons of free time to spend playing with a puppy.",
about_life: "My dog will be showered with treats constantly and should expect 20-100 minutes
of belly rubs per day.", ideal_dog: "likes to sleep in, but is still game to go out for a jog in the morning. Also, loves carrots.")
