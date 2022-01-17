<template>
  <section>
     <vue-paginate-scroll v-if="products.length" :src="products" :per-scroll="12">
          <template slot-scope="{ data }">
            <ul class="  grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10 lg:mx-40 mx-20 mt-10">
              <product-item
                v-for="prod in data"
                :key="prod.id"
                :id="prod.id"
                :title="prod.name"
                :image="prod.image"
                :description="prod.categories"
                :price="prod.prices.rawPrice"
                :stock="prod.stock"
                :inCart="prod.inCart"
                :maxQty="prod.maxQty"
                :item="Qty(prod.id)"
              ></product-item>
            </ul>
          </template>

        </vue-paginate-scroll>
    
  </section>
</template>

<script>
import ProductItem from '../components/products/ProductItem.vue';

export default {
  components: {
    ProductItem,
  },
  computed: {
    Qty() {
      return this.$store.getters["cart/itemQty"];
    },
    products() {
      return this.$store.getters['prods/products'];
    },
  },
  mounted() {
		// window.addEventListener("scroll", this.handleScroll);
	},
  methods:{
  //  handleScroll() {
	// 		if (
	// 			window.scrollY + window.innerHeight >=
	// 			document.body.scrollHeight - 50
	// 		) {
	// 			this.size += 10
	// 		}
	// 	},
  }
  
};
</script>

