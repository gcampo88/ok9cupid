# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all

User.create!(name: "Gigi", zipcode: 10014, email: "gigi.campo@gmail.com",
search_sex: "F", search_age: 3, search_size: "small", about_me: "I have a pup!",
about_life: "snuggles and playing fetch", password: "lunapup", ideal_dog: ["snuggling", "fetching", "sleeping"])
