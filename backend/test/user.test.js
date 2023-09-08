const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Post = require('../src/models/post')

describe('Create user test', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Post.deleteMany()
  })

  it('should signup a new user', async () => {
    const userData = {
      name: 'Fede',
      email: 'fede@gmail.com',
      password: '123456',
    }
    const expectedOutput = {
      name: 'Fede',
      email: 'fede@gmail.com',
      description: '',
      avatar: '',
    }

    const response = await request(app).post('/users').send(userData)
    expect(response.body.name).toEqual(expectedOutput.name)
    expect(response.body.email).toEqual(expectedOutput.email)
    expect(response.body.description).toEqual(expectedOutput.description)
    expect(response.body.avatar).toEqual(expectedOutput.avatar)
    expect(response.body._id).toBeDefined()
  })

  it('should not signup a new user with an existing email', async () => {
    // Create a user
    const initialUser = {
      name: 'Fede',
      email: 'fede@gmail.com',
      password: '123456',
    }
    await request(app).post('/users').send(initialUser)

    // Try to create a user with the same email
    const userData = {
      name: 'Federico',
      email: 'fede@gmail.com',
      password: '123456',
    }
    const expectedOutput = {
      message: 'Email already exists',
    }
    const response = await request(app).post('/users').send(userData)
    expect(response.body.message).toEqual(expectedOutput.message)
  })

  it('should not create a user without a password', async () => {
    const userData = {
      name: 'Fede',
      email: 'fede@gmail.com',
      password: '',
    }
    const expectedOutput = {
      message: '"password" is not allowed to be empty',
    }
    const response = await request(app).post('/users').send(userData)
    expect(response.body.validation.body.message).toEqual(expectedOutput.message)
  })
})

describe('Profile routes', () => {
  let testUser

  beforeEach(async () => {
    await User.deleteMany()

    testUser = await User.create({
      name: 'Fede',
      email: 'fede@gmail.com',
      password: '123456',
    })

    userToFollow = await User.create({
      name: 'Raul',
      email: 'raul@gmail.com',
      password: '123456',
    })
  })
  afterEach(async () => {
    await User.deleteMany()
  })

  it('should update name of user', async () => {
    const newName = 'Federico'
    const response = await request(app).put(`/users/profile/${testUser._id}/name`).send({ name: newName })
    expect(response.status).toEqual(204)
    expect(response.body).toEqual({})
  })

  it('should update description of user', async () => {
    const newDescription = 'This is a description'
    const response = await request(app)
      .put(`/users/profile/${testUser._id}/description`)
      .send({ description: newDescription })
    expect(response.status).toEqual(204)
    expect(response.body).toEqual({})
  })

  it('should allow the current user to follow another user', async () => {
    const response = await request(app)
      .put(`/users/profile/${testUser._id}/follow`)
      .send({ userToFollow: userToFollow._id })
    expect(response.status).toBe(201)
    //Verify that the user is following the other user
    const updatedTestUser = await User.findById(testUser._id)
    expect(updatedTestUser.following.toString()).toContain(userToFollow._id.toString())
    //Verify that the other user has a new follower
    const updatedUserToFollow = await User.findById(userToFollow._id)
    expect(updatedUserToFollow.followedBy.toString()).toContain(testUser._id.toString())
  })
  it('should allow the current user to unfollow another user', async () => {
    const response = await request(app).delete(`/users/profile/${testUser._id}/unfollowing/${userToFollow._id}`).send()
    expect(response.status).toBe(204)
  })
})
