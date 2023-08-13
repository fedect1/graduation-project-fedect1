<script>
import axios from 'axios'
export default {
  name: 'LoginForm',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/users', { email: this.email })
        console.log(this.email)
        if (response.status === 201) {
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error request')
      }
    }
  }
}
</script>
<template>
  <h1>Sign Up</h1>
  <div class="card mb-3 text-bg-secondary">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="../assets/img/loginCard.jpg"
          class="img-fluid rounded-start max-w-100"
          alt="Imagen"
        />
      </div>
      <div class="col-md-8">
        <form class="mb-5 mx-3" @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>

          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>
