<template>
 <div class="box">
  <div class="inner-box">
    <div class="forms-wrap">
      <form action="index.html" autocomplete="off" class="sign-in-form">
        <div class="logo">
          <!-- <img src="./img/logo.png" alt="easyclass" /> -->
          <h4>easyclass</h4>
        </div>

        <div class="heading">
          <h2>Welcome Back</h2>
          <h6>Not registred yet?</h6>
          <a href="#" class="toggle">Sign up</a>
        </div>

        <div class="actual-form">
          <div class="input-wrap">
            <input
              type="text"
              minlength="4"
              class="input-field"
              autocomplete="off"
              required
            />
            <label>Name</label>
          </div>

          <div class="input-wrap">
            <input
              type="password"
              minlength="4"
              class="input-field"
              autocomplete="off"
              required
            />
            <label>Password</label>
          </div>

          <input type="submit" value="Sign In" class="sign-btn" />

          <p class="text">
            Forgotten your password or you login datails?
            <a href="#">Get help</a> signing in
          </p>
        </div>
      </form>

      <form action="index.html" autocomplete="off" class="sign-up-form">
        <div class="logo">
          <!-- <img src="./img/logo.png" alt="easyclass" /> -->
          <h4>easyclass</h4>
        </div>

        <div class="heading">
          <h2>Get Started</h2>
          <h6>Already have an account?</h6>
          <a href="#" class="toggle">Sign in</a>
        </div>

        <div class="actual-form">
          <div class="input-wrap">
            <input
              type="text"
              minlength="4"
              class="input-field"
              autocomplete="off"
              required
            />
            <label>Name</label>
          </div>

          <div class="input-wrap">
            <input
              type="email"
              class="input-field"
              autocomplete="off"
              required
            />
            <label>Email</label>
          </div>

          <div class="input-wrap">
            <input
              type="password"
              minlength="4"
              class="input-field"
              autocomplete="off"
              required
            />
            <label>Password</label>
          </div>

          <input type="submit" value="Sign Up" class="sign-btn" />

          <p class="text">
            By signing up, I agree to the
            <a href="#">Terms of Services</a> and
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </form>
    </div>

    <div class="carousel">
      <div class="images-wrapper">
        <img src="frontend/src/assets/img/loginCard.jpg" class="image img-1 show" alt="" />
        <img src="frontend/src/assets/img/loginCard.jpg" class="image img-2" alt="" />
        <img src="frontend/src/assets/img/loginCard.jpg" class="image img-3" alt="" />
      </div>

      <div class="text-slider">
        <div class="text-wrap">
          <div class="text-group">
            <h2>Create your own courses</h2>
            <h2>Customize as you like</h2>
            <h2>Invite students to your class</h2>
          </div>
        </div>

        <div class="bullets">
          <span class="active" data-value="1"></span>
          <span data-value="2"></span>
          <span data-value="3"></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.box {
  position: relative;
  max-width: 100%;
  height: 640px;
  background: #ab0aad;
  border-radius: 3.3rem;
}
.inner-box {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
