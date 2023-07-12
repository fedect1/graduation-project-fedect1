//Domain: DW Messenger
const User = require('./user')
const Post = require('./post')

//User 1
const fede = new User('Federico', 'fedect1', 'fede@gmail.com', 'Berlin', 35)
const fedePost = new Post()
fedePost.addPost(fede.username, '10/07/2023', '17:30', 'This is my first post')
fedePost.addPost(fede.username, '11/07/2023', '18:30', 'This is my second post')
fedePost.addPost(fede.username, '12/07/2023', '19:30', 'This is my third post')
console.log(fede.getInfo())
console.log(fedePost.getPosts())

//User 2
const marvin = new User('Marvin', 'crazyHadrid', 'westernunion@gmail.com', 'Asuncion', 75)
const marvinPost = new Post()
marvinPost.addPost(marvin.username, '08/07/2023', '22:30', 'This is my first post and I am happy')
marvinPost.addPost(marvin.username, '09/07/2023', '03:30', 'This is my second post and I will cry')

console.log(marvin.getInfo())
console.log(marvinPost.getPosts())

//User 3
const batman = new User('Bruce', 'brucito', 'goticbruce@gmail.com', 'Gotham City', 30)
const batmanPost = new Post()
batmanPost.addPost(
  batman.username,
  '05/07/2023',
  '17:30',
  'I would love to be Spiderman, he has super powers. I have only got a belt with bat things'
)
batmanPost.addPost(
  batman.username,
  '07/07/2023',
  '23:15',
  'Today Alfred found me crying in the bat bathroom. It was so humiliating'
)
batmanPost.addPost(
  batman.username,
  '08/07/2023',
  '15:12',
  'Today I reacted to a story to batgirl and she responded with a haha.... What am I doing wrong? '
)

console.log(batman.getInfo())
console.log(batmanPost.getPosts())

console.log('Testing if Slack channel is working')
