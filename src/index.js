//Domain: DW Messenger
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000'
async function main() {
  // CREATE USERS
  const fede = await axios.post('/users', { email: 'Fede' })
  const juli = await axios.post('/users', { email: 'juli' })
  const maria = await axios.post('/users', { email: 'maria' })
  const pepita = await axios.post('/users', { email: 'pepita' })
  const rambo = await axios.post('/users', { email: 'rambo' })

  // CREATE POSTS
  const firstPost = await axios.post('/posts', {
    user: fede.data._id,
    bodyPost: 'This is my first message',
  })
  const secondPost = await axios.post('/posts', {
    user: fede.data._id,
    bodyPost: 'This is my second message',
  })

  // DELETE POST
  await axios.delete(`/posts/${fede.data._id}/delete/${secondPost.data._id}`) //remove delete

  // FOLLOW
  await axios.post(`/users/${fede.data._id}/follow`, { user: juli.data._id }) //follower
  await axios.post(`/users/${fede.data._id}/follow`, { user: rambo.data._id })
  await axios.post(`/users/${fede.data._id}/follow`, { user: pepita.data._id })
  await axios.post(`/users/${fede.data._id}/follow`, { user: maria.data._id })

  // UNFOLLOW
  await axios.delete(`/users/${fede.data._id}/unfollow/${pepita.data._id}`)

  //COMMENT
  const firstComment = await axios.post(`/posts/${firstPost.data._id}/comments`, {
    user: juli.data._id,
    text: 'It is working', //text or body
  })
  const secondComment = await axios.post(`/posts/${firstPost.data._id}/comments`, {
    user: pepita.data._id,
    text: 'Well done', //text or body
  })

  // DELETE
  //await axios.delete(`/posts/${firstPost.data._id}/comments/${secondComment.data._id}`)

  // Get user Fede
  const allUsers = await axios.get('http://localhost:3000/users')
  console.log('List of all users: ', allUsers.data)
  // // Get Post of Fede
  // const allPosts = await axios.get('http://localhost:5000/posts')
  // console.log('Comment of a the post in position 0: ', allPosts.data[0])
}
main() //.catch(err => console.log(err.data.message ? err.data.message : err))

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
