const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Post = require('../src/models/post')

describe('User test', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Post.deleteMany()
  })

  it('should create a new user', async () => {
    const email = 'Fede'
    const expectedOutput = {
      email: email,
      name: '',
      posts: [],
      description: '',
      avatar: '',
    }
    const actualOutput = await request(app).post('/users').send({ email: email })
    expect(actualOutput.body.email).toEqual(expectedOutput.email)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
  })
  it('should create a post', async () => {
    // Create user
    const email = 'Fede'
    const user = await request(app).post('/users').send({ email: email })
    // Create post with this user
    const bodyPost = 'This is a test post'
    const expectedOutput = {
      bodyPost: bodyPost,
      comments: [],
      likes: [],
      status: true,
      user: user.body._id,
    }
    const actualOutput = await request(app).post('/posts').send({ bodyPost: bodyPost, user: user.body._id })

    // Creat a test expected output
    expect(actualOutput.body.bodyPost).toEqual(expectedOutput.bodyPost)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body.createdAt).toBeDefined()
    expect(actualOutput.body.expirationDate).toBeDefined()
  }),
    it('should delete a post', async () => {
      //create user
      const email = 'Fede'
      const user = await request(app).post('/users').send({ email: email })
      //create post with this user
      const bodyPost = 'This is a test post'
      const post = await request(app).post('/posts').send({ bodyPost: bodyPost, user: user.body._id })
      //delete post
      const expectedOutput = { message: 'Post deleted successfully' }
      const actualOutput = await request(app).delete(`/posts/${user.body._id}/${post.body._id}`)
      //create expected output
      expect(actualOutput.body).toMatchObject(expectedOutput)
      expect(actualOutput.body.message).toEqual(expectedOutput.message)
    })
})
