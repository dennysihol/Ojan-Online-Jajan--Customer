import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productDetail: [],
    carts: []
  },
  mutations: {
    insertProducts (state, payload) {
      state.products = payload
    },
    insertProductDetail (state, payload) {
      state.productDetail = payload
    },
    insertCarts (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'post',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ user }) => {
          router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signIn (context, payload) {
      axios({
        method: 'post',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token
          localStorage.id = data.id
          this.dispatch('checkLocalStorage')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signOut () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('id')
      this.dispatch('checkLocalStorage')
    },
    checkLocalStorage () {
      if (!localStorage.access_token) {
        router.push('/')
      } else {
        router.push('/user')
      }
    },
    fetchProducts (context, payload) {
      axios({
        method: 'get',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('insertProducts', data.product)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProduct (context, payload) {
      console.log(payload)
      axios({
        method: 'get',
        url: `/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('insertProductDetail', data.product)
          router.push(`/detail/${data.product.id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      axios({
        method: 'post',
        url: `/carts/${payload.ProductId}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: payload.ProductId,
          UserId: payload.UserId,
          total: payload.total
        }
      })
        .then((cart) => {
          router.push(`/carts/${localStorage.id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCarts (context, payload) {
      axios({
        method: 'get',
        url: `/carts/${localStorage.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('insertCarts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goToCart () {
      router.push(`/carts/${localStorage.id}`)
    },
    deleteCart (context, payload) {
      axios({
        method: 'delete',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((data) => {
          this.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateTotal (context, payload) {
      console.log(payload.updatedTotal)
      axios({
        method: 'patch',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          total: payload.updatedTotal
        }
      })
        .then((data) => {
          this.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
