//Domain: DW Messenger
const User = require('./user')
const Tests = require('./test')

//Users
const fede = new User('fede@gmail.com', 'fedect1')
const julio = new User('julio@gmail.com', 'julio')
const maria = new User('maria@gmail.com', 'maria')
const pepita = new User('pepita@gmail.com', 'pepita')
const rambo = new User('rambo@gmail.com', 'rambo')

//User: fede
fede.profileDescription = 'Hi! I am Fede! Alles gut?'
fede.profilePictureURL = 'hereGoesAnUrl.jpg'
fede.addPost('This is my first message')
fede.addPost('Checking if it is working')
fede.addPost('Hey you')
fede.posts[0].addComment(julio, 'It is working')
fede.posts[0].addComment(maria, 'Arrivederci')
fede.posts[0].addComment(pepita, 'Well done')
fede.posts[0].addLike(rambo)
fede.posts[0].addLike(maria)

fede.follow(julio)
fede.follow(maria)
fede.follow(pepita)
fede.follow(rambo)
fede.unfollow(pepita)
fede.deletePost(2)

console.log(fede.profileInfo)
console.log(fede.interactionInfo)
console.log(fede.postsInfo)
