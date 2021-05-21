<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" @click.prevent="goHome">
        <img src="@/assets/OJAN_free-file.png" style="height: 50px" alt="">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-icon icon="cart4" variant="light" style="margin-top: 10px; cursor: pointer;" @click.prevent="goToCart"></b-icon>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Menu</em>
            </template>
            <b-dropdown-item @click="signIn" v-if="isLogin === false">Sign In</b-dropdown-item>
            <b-dropdown-item @click="signOut" v-else>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    checkLogin () {
      if (!localStorage.access_token) {
        this.isLogin = false
      } else {
        this.isLogin = true
      }
    },
    signIn () {
      router.push('/login')
    },
    signOut () {
      this.$store.dispatch('signOut')
    },
    goHome () {
      if (!localStorage.access_token) {
        router.push('/')
      } else {
        router.push('/user')
      }
    },
    goToCart () {
      this.$store.dispatch('goToCart')
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
