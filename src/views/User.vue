<template>
  <div class="user">
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

            <b-button href="#" variant="info" @click.prevent="seeDetail(product.id)">See Detail</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
// import Swal from 'sweetalert2'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    Navbar
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    seeDetail (id) {
      this.$store.dispatch('getProduct', id)
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

</style>
