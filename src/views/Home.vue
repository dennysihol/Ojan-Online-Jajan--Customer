<template>
  <div class="home">
    <Navbar></Navbar>
    <br><br>
    <b-container class="bv-example-row mb-3">
      <b-row cols="3">
        <b-col v-for="product in products" :key="product.id">
          <b-card
            :title="product.name"
            :img-src="product.image"
            img-height="200px"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              Stock : {{ product.stock }}
            </b-card-text>
            <b-card-text>
              Price : {{ formatRupiah(product.price) }}
            </b-card-text>

            <b-button href="#" variant="primary" @click.prevent="pleaseLogin">See Detail</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    pleaseLogin () {
      Swal.fire({
        icon: 'error',
        title: 'Please Login to See Detail'
      })
    },
    formatRupiah (money) {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(money)
    }
  },
  computed: {
    ...mapState(['products'])
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>

body {
  background-image: url('https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_2046737.jpg');
}

</style>
