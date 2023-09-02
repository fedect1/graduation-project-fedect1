<script>
export default{
  name: 'HeroView',
  data() {
    return {
      signUpMode: false,
      currentPage: 0,
      pages: [
        {
          title: 'Connect Authentically',
          subtitle: 'Explore White Dwarfs Messenger',
          content: 'Discover an ephemeral space where you can express your thoughts and emotions authentically, free from judgment or long-term consequences. Your voice matters in the here and now.'
        },
        {
          title: 'Find Meaningful Communities',
          subtitle: 'Connect with Like-Minded People',
          content: 'Join communities of minimalist and spiritually inclined individuals. With White Dwarfs Messenger, you can engage in meaningful conversations, share experiences, and build authentic connections in a positive, toxicity-free environment.'
        },
        {
          title: 'Cultivate Mental Well-being',
          subtitle: 'Unleash Your Thoughts',
          content: 'Use this platform to unleash your thoughts and clear your mind. Our focus on ephemeral content allows you to stay in the present and nurture your emotional well-being. Start expressing yourself today.'
        }
      ]
    };
  },
  methods: {
    moveSlider(index) {
      this.activeIndex = index;
    },
    getImageSrc(index) {
      if(index===0) return 'https://res.cloudinary.com/do9shwcmh/image/upload/v1693578270/img-carrousel1_voyb0f.jpg'
      if(index===1) return 'https://res.cloudinary.com/do9shwcmh/image/upload/v1693578270/img-carrousel2_aiydov.jpg'
      if(index===2) return 'https://res.cloudinary.com/do9shwcmh/image/upload/v1693578270/img-carrousel3_nkqy2n.jpg'
    },
    changePage(index) {
      this.currentPage = index;
    },
    toggleSignUpMode() {
      this.signUpMode = !this.signUpMode;
      console.log(this.signUpMode);
    },

  },

}

</script>
<template lang="pug">
main(:class="{ 'sign-up-mode': signUpMode }")
  .box
    .inner-box
      .forms-wrap
        form.sign-in-form(action='index.html' autocomplete='off' @submit.prevent='signIn')
          .logo
            h4 White Dwarfs Messenger
          .heading
            h2 Welcome Back
            h6 Not registred yet?
            a.toggle(href='#' @click='toggleSignUpMode') Sign Up
          .actual-form
            .input-wrap
              input.input-field(type='text' minlength='4' autocomplete='off' required='' placeholder="Enter your email")
            .input-wrap
              input.input-field(type='password' minlength='4' autocomplete='off' required='' placeholder="Enter your password")
            input.sign-btn(type='submit' value='Sign In')

        form.sign-up-form(action='index.html' autocomplete='off' @submit.prevent='signUp')
          .logo
            h4 White Dwarfs Messenger
          .heading
            h2 Get Started
            h6 Already have an account?
            a.toggle(href='#' @click='toggleSignUpMode') Sign In
          .actual-form
            .input-wrap
              input.input-field(type='text' minlength='4' autocomplete='off' required='')
              label Name
            .input-wrap
              input.input-field(type='email' autocomplete='off' required='')
              label Email
            .input-wrap
              input.input-field(type='password' minlength='4' autocomplete='off' required='')
              label Password
            input.sign-btn(type='submit' value='Sign Up')
            p.text
              | By signing up, I agree to the
              a(href='#') Terms of Services
              |  and
              a(href='#') Privacy Policy
      .carousel
        .images-wrapper
          img.image(v-for="(page, index) in pages" :key="index" :src="getImageSrc(index)" :class="{ show: currentPage === index }")
          .carouser-content
            .carouser-page(v-for="(page, index) in pages" :key="index" :class="{ active: currentPage === index }")
              h1 {{ page.title }}
              h2 {{ page.subtitle }}
              p {{ page.content }}
        .bullets
          span(v-for="(page, index) in pages" :key="index" :class="{ active: currentPage === index }" @click="changePage(index)")
</template>
<style scoped>
main {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-color: var(--page-background);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}


.box {
  position: relative;
  width: 100%;
  max-width: 1020px;
  height: 640px;
  background-color: #fff;
  border-radius: 3.3rem;
  box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
}

.inner-box {
  position: absolute;
  width: calc(100% - 4.1rem);
  height: calc(100% - 4.1rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.forms-wrap {
  position: absolute;
  height: 100%;
  width: 45%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  transition: 0.8s ease-in-out;
}

form {
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;
}

form.sign-up-form {
  opacity: 0;
  pointer-events: none;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 27px;
  margin-right: 0.3rem;
}

.logo h4 {
  font-size: 1.1rem;
  margin-top: -9px;
  letter-spacing: -0.5px;
  color: #151111;
}

.heading h2 {
  font-size: 2.1rem;
  font-weight: 600;
  color: #151111;
}

.heading h6 {
  color: #bababa;
  font-weight: 400;
  font-size: 0.75rem;
  display: inline;
}

.toggle {
  color: #151111;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 0.3s;
}

.toggle:hover {
  color: #8371fd;
}

.input-wrap {
  position: relative;
  height: 37px;
  margin-bottom: 2rem;
}

.input-field {
  position: absolute;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid #bbb;
  padding: 0;
  font-size: 0.95rem;
  color: #151111;
  transition: 0.4s;
}

label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  color: #bbb;
  pointer-events: none;
  transition: 0.4s;
}

.input-field.active {
  border-bottom-color: #151111;
}

.input-field.active + label {
  font-size: 0.75rem;
  top: -2px;
}

.sign-btn {
  display: inline-block;
  width: 100%;
  height: 43px;
  background-color: #151111;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.8rem;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

.sign-btn:hover {
  background-color: #8371fd;
}

.text {
  color: #bbb;
  font-size: 0.7rem;
}

.text a {
  color: #bbb;
  transition: 0.3s;
}

.text a:hover {
  color: #8371fd;
}

main.sign-up-mode form.sign-in-form {
  opacity: 0;
  pointer-events: none;
}

main.sign-up-mode form.sign-up-form {
  opacity: 1;
  pointer-events: all;
}

main.sign-up-mode .forms-wrap {
  left: 55%;
}

main.sign-up-mode .carousel {
  left: 0%;
}

.carousel {
  position: relative;
  left: 0%;
  height: 100%;
  width: 55%;
  top: 0;
  left: 45%;
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.8s ease-in-out;
}
main.sign-up-mode .carousel {
  left: 0%;
}
.carousel .images-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel .images-wrapper .image {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  transition: 0.8s ease-in-out;
  filter: brightness(0.2);
  border-radius: 10px;
}

.carousel .images-wrapper .image.show {
  opacity: 1;
}

.carousel .carouser-content {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.carousel .carouser-content .carouser-page {
  position: absolute;
  height: 90%;
  width: 80%;
  opacity: 0;
  transition: 0.8s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.carousel .carouser-content .carouser-page.active {
  opacity: 1;
}

.carousel .carouser-content .carouser-page h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.carousel .carouser-content .carouser-page h2 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
  margin: 0.5rem 0 1rem;
}

.carousel .carouser-content .carouser-page p {
  font-size: 0.9rem;
  width: 80%;
  font-weight: 400;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}



.carousel .bullets {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel .bullets span {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: #bbb;
  margin: 0 0.2rem;
  cursor: pointer;
  transition: 0.3s;
}

.carousel .bullets span.active {
  background-color: #151111;
}



@media (max-width: 850px) {
  .box {
    height: auto;
    max-width: 550px;
    overflow: hidden;
  }

  .inner-box {
    position: static;
    transform: none;
    width: revert;
    height: revert;
    padding: 2rem;
  }

  .forms-wrap {
    position: revert;
    width: 100%;
    height: auto;
  }

  form {
    max-width: revert;
    padding: 1.5rem 2.5rem 2rem;
    transition: transform 0.8s ease-in-out, opacity 0.45s linear;
  }

  .heading {
    margin: 2rem 0;
  }

  form.sign-up-form {
    transform: translateX(100%);
  }

  main.sign-up-mode form.sign-in-form {
    transform: translateX(-100%);
  }

  main.sign-up-mode form.sign-up-form {
    transform: translateX(0%);
  }

  .carousel {
    position: revert;
    height: auto;
    width: 100%;
    padding: 3rem 2rem;
    display: flex;
  }

  .images-wrapper {
    display: none;
  }

  .text-slider {
    width: 100%;
  }
}

@media (max-width: 530px) {
  main {
    padding: 1rem;
  }

  .box {
    border-radius: 2rem;
  }

  .inner-box {
    padding: 1rem;
  }

  .carousel {
    padding: 1.5rem 1rem;
    border-radius: 1.6rem;
  }

  .text-wrap {
    margin-bottom: 1rem;
  }

  .text-group h2 {
    font-size: 1.2rem;
  }

  form {
    padding: 1rem 2rem 1.5rem;
  }
}
</style>
