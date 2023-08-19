<script>
import '../assets/base.css'
import { mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'
export default {
  name: 'HomeView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      //this.$router.push('/')
    },
    goToSignUp() {
      this.$router.push('/signup')
    }
  }
}
</script>

<template lang="pug">
.wrapper
  form(@submit.prevent="doLogin")
    h1 Login
    .input-box
      input#email(v-model="email" type="text" required)
      i.bx.bxs-envelope
    .input-box
      input#password(v-model="password" type="password" required)
      i.bx.bxs-lock-alt
    .remember-forgot
      label
        input(type='checkbox')
        | Remember me
      a(href='#' ) Forgot Password?
    button.btn(type='submit') Log in
  .sign-up-link
    p
      | Don&apos;t have an account?
      a(href="#" @click.prevent="goToSignUp")  Sign up

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
.wrapper .remember-forgot {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin: -15px 0 15px;
}

.remember-forgot label input {
  margin-right: 5px;
  accent-color: var(--text-color);
}

.remember-forgot a {
  color: var(--text-color);
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
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

.wrapper .sign-up-link {
  font-size: 0.9rem;

  text-align: center;
  margin: 20px 0 15px;
}

.sign-up-link p a {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 600;
}

.sign-up-link p a:hover {
  text-decoration: underline;
}
</style>
