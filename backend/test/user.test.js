const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Post = require('../src/models/post')

describe('Create user test', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Post.deleteMany()
  })
  // Test 1 Signup
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
