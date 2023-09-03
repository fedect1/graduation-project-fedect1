<script>
import { useAccountStore } from "../../stores/account";
import { mapActions } from "pinia";
export default {
  name: "Navbar",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isProfileRoute() {
      return this.$route.path === "/profile";
    },
    isFeedRoute() {
      return this.$route.path === "/feed";
    },
  },
  methods: {
    ...mapActions(useAccountStore, ["logout"]),
    async handleLogout() {
      await this.logout();
      this.$router.push("/");
    },
  },
};
</script>
<template>
  <header class="header">
    <a href="/" class="logo">
      White Dwarfs Messenger
    </a>
    <span class="user-greeting">
      Hi {{ user.name }}
    </span>
    <nav class="navbar">
      <a v-if="!isProfileRoute" href="/profile">Profile</a>
      <a v-if="!isFeedRoute" href="/feed">Feed</a>
      <a v-if="user" @click="handleLogout" href="#">Log out</a>
    </nav>
  </header>
</template>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: var(--m-padding);
    background: var(--page-background);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }
  .logo {
    font-size: var(--h4-size);
    color: var(--text-color);
    text-decoration: none;
    font-weight: 700;
  }
  .navbar a {
    position: relative;
    color: var(--text-color);
    font-size: var(--h4-size);
    text-decoration: none;
    font-weight: 500;
    margin-left: var(--m-padding);
  }

  .navbar a::before{
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: .3s;
  }

  .navbar a:hover::before{
    width: 100%;
  }

  .user-greeting {
    position: relative;
    color: var(--primary-color);
    font-size: var(--h2-size);
    text-decoration: none;
    font-weight: 500;
    margin-left: var(--m-padding);
  }
</style>
