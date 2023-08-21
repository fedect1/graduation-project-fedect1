<script>
import { useCreateUserStore } from '../stores/createUser'
import { mapActions } from 'pinia'
export default {
  data() {
    return {
      email: '',
      password1: '',
      password2: '',
      passwordsMatch: true
    }
  },
  watch: {
    password2: function () {
      this.passwordsMatch = this.password1 === this.password2
    }
  },
  methods: {
    ...mapActions(useCreateUserStore, ['createUser']),
    async register() {
      await this.createUser(this.email, this.password1)
      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
.wrapper
  form(@submit.prevent="register")
    h1 Sign up
    .input-box
      input#email(v-model="email" type="text" placeholder="Email" required)
      i.bx.bxs-envelope
    .input-box
      input#password1(v-model="password1" type="password" placeholder="Password" required)
      i.bx.bxs-lock-alt
    .input-box
      input#password2(v-model="password2" type="password" placeholder="Repeat your password" :class="{ 'password-mismatch': !passwordsMatch }" required)
      i.bx.bxs-lock-alt
    button.btn(type='submit' :disabled="password1 !== password2 || !password1 || !password2") Create account


</template>

<style scoped>
.wrapper {
  padding: 30px 40px;
  width: 100%;
  background: transparent;
  border: 2px solid var(--tertiary-color, 0.2);

  color: var(--text-color);
  border-radius: 10px;
}

.wrapper h1 {
  font-size: 1.8rem;
  text-align: center;
}

.wrapper .input-box {
  position: relative;
  max-width: 100%;
  height: 50px;
  background-color: transparent;
  margin: 30px 0;
}

.input-box input {
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  border: 2px solid var(--tertiary-color, 0.2);
  border-radius: 40px;
  font-size: 1rem;
  color: var(--text-color);
  padding: 20px 45px 20px 20px;
}
.input-box input::placeholder {
  color: var(--text-color);
}
.input-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.wrapper .btn {
  width: 100%;
  height: 50px;
  background-color: var(--text-color);
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 5px var(--text-color, 0.1);
  cursor: pointer;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.wrapper .btn:hover {
  background-color: var(--page-background);
}

.password-mismatch {
  border-color: red;
}
</style>
