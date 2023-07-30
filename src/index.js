//Domain: DW Messenger
const axios = require('axios')

async function main() {
  // Create user Fede
  await axios.post('http://localhost:3000/users', { email: 'Fede' })
  // Create user Julio
  await axios.post('http://localhost:3000/users', { email: 'juli' })
  // Create user Maria
  await axios.post('http://localhost:3000/users', { email: 'maria' })
  // Create user Pepita
  await axios.post('http://localhost:3000/users', { email: 'pepita' })
  // Create user Rambo
  await axios.post('http://localhost:3000/users', { email: 'rambo' })

  // // Create post for Fede
  // await axios.post('http://localhost:5000/posts', {
  //   email: 'Fede',
  //   message: 'This is my first message',
  // })
  // // Create post for Fede
  // await axios.post('http://localhost:5000/posts', {
  //   email: 'Fede',
  //   message: 'This is my second message',
  // })

  // // Delete post for Fede by index
  // await axios.delete('http://localhost:5000/posts/0', { data: { email: 'Fede' } })

  // // Post a new follow
  // await axios.post('http://localhost:5000/users/follow', { email: 'Fede', userToFollow: 'juli' })

  // Create comment for a post of Fede
  // await axios.post('http://localhost:5000/comments', {
  //   //Change url http://localhost:5000/posts/0/comments
  //   email: 'Fede',
  //   indexPost: 0,
  //   author: 'juli',
  //   comment: 'It is working', //text or body
  // })

  // Get user Fede
  const allUsers = await axios.get('http://localhost:3000/users')
  console.log('List of all users: ', allUsers.data)
  // // Get Post of Fede
  // const allPosts = await axios.get('http://localhost:5000/posts')
  // console.log('Comment of a the post in position 0: ', allPosts.data[0])
}
main().catch(err => console.log(err.data.message ? err.data.message : err))

// Fetch users with axios
// axios.get('http://localhost:3000/users').then(response => {
//   console.log(response.data)
// })
// Create a new user with axios
// axios.post('http://localhost:3000/users', { email: 'Fede@gmail.com', username: 'fede' }).then(response => {
//   console.log(response.data)
// })

// //Users
// const fede = new User('fede@gmail.com', 'fedect1')
// const julio = new User('julio@gmail.com', 'julio')
// const maria = new User('maria@gmail.com', 'maria')
// const pepita = new User('pepita@gmail.com', 'pepita')
// const rambo = new User('rambo@gmail.com', 'rambo')

// //User: fede
// fede.profileDescription = 'Hi! I am Fede! Alles gut?'
// fede.profilePictureURL = 'hereGoesAnUrl.jpg'
// fede.addPost('This is my first message')
// fede.addPost('Checking if it is working')
// fede.addPost('Hey you')
// fede.posts[0].addComment(julio, 'It is working')
// fede.posts[0].addComment(maria, 'Arrivederci')
// fede.posts[0].addComment(pepita, 'Well done')
// fede.posts[0].addLike(rambo)
// fede.posts[0].addLike(maria)

// fede.follow(julio)
// fede.follow(maria)
// fede.follow(pepita)
// fede.follow(rambo)
// fede.unfollow(pepita)
// fede.deletePost(2)

// console.log(fede.profileInfo)
// console.log(fede.interactionInfo)
// console.log(fede.postsInfo)
