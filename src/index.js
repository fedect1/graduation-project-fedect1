//Domain: DW Messenger
const User = require('./user')
const Post = require('./post')

//User 1
const fede = new User('Federico', 'fedect1', 'fede@gmail.com', 'Berlin', 35)

fede.post('08/07/2023', '22:30', 'This is my first message')
fede.post('09/07/2023', '03:30', 'Checking if it is working')
//fede.deletePost('post')
console.log(fede.info)
