<template >
  <li class="relative ">
      <div class=" h-44">
        <img :src="image" :alt="title" class="w-full h-40 "/>
      </div>
    <div class="">
      <div class="product__text">
        <p class="text-sm py-1">{{ title.substr(0,60)}}<span class="text-lg font-bold" v-if="title.length >60">...</span></p>
          <span class="text-base bg-amber-500 rounded p-1 font-bold">EGP {{ parseInt(price ) }}</span>
        <p class="text-sm py-1">{{ description.substr(0,60) }}...</p>
        <p class="mb-5" v-show="stock >= 1">stock: {{ stock }}</p>
      </div>
    </div>
    <div  class="absolute w-full   bottom-0 left-0 p-1">
      <button class="w-full m-auto rounded-md  bg-purple-900 flex justify-center text-white p-1 hover:bg-purple-600" v-if="!inCart && stock" @click="addToCart">Add to Cart </button>
      <p class="w-full m-auto rounded-md  text-red-700 flex justify-center items-center bg-red-200  text-lg p-1 " v-show="stock < 1 && !inCart">out of stock</p>
    </div>
    
    <div class="product__actions">
      <div v-if="inCart" class="div-qty">
        <div>
          <h4 v-if="stock < 1" class="validate">On Hand {{ Qty(id).qty }}</h4>
          <div v-else-if="maxQty <= Qty(id).qty" class="validate">Max limit reached</div>
        </div>
        <div>
          <base-badge mode="highlight" :no-margin-left="true" v-show="Qty(id).qty>1">
          <div >Total: EGP {{ itemTotal }}</div>
        </base-badge>
        </div>
        <div>
          <button
            v-if="Qty(id).qty > 1"
            class="btn-qty minus"
            @click="minusQuantity"
          >
            -
          </button>
          <button @click="remove" v-else class="btn-qty remove">
            <i class="fa fa-trash"></i>
          </button>
          <strong class="Quantity"> {{ Qty(id).qty }} </strong>
          <button
            class="btn-qty"
            :class="{ disabled: maxQty <= Qty(id).qty || stock < 1 }"
            @click="plusQuantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "id",
    "image",
    "title",
    "price",
    "description",
    "stock",
    "inCart",
    "maxQty",
    
  ],
  computed: {
    itemTotal() {
      return (parseInt(this.price * this.Qty(this.id).qty).toFixed(2));
    },
    Qty() {
      return this.$store.getters["cart/itemQty"];
    },
  },
  methods: {
    addToCart() {
      this.$store.dispatch("cart/addToCart", {
        id: this.id,
      });
    },
    remove() {
      this.$store.dispatch("cart/removeFromCart", { productId: this.id });
    },

    plusQuantity() {
      this.$store.dispatch("cart/quantityIncrement", {
        id: this.id,
      });
    },
    minusQuantity() {
      this.$store.dispatch("cart/quantityDecrement", {
        id: this.id,
      });
    },
  },
};
</script>

<style scoped>
.Quantity {
  margin: 0 0.5rem;
}
li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
.div-qty {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-qty {
  font: inherit;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  padding: 0.2rem 0.5rem;
}
.validate {
  font: inherit;
  background-color: #eb29398c;
  color: red;
  width: 100%;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
}
.remove {
  padding: 0.2rem 0.4rem;
  margin: 0;
}
.minus {
  padding: 0.22rem 0.6rem;
}
.btn-qty:hover,
.btn-qty:active {
  background-color: #53001c;
  border-color: #53001c;
}
.disabled {
  background-color: rgb(225 223 223);
  border: 1px solid rgb(225 223 223);
  cursor: not-allowed;
}
.disabled:hover {
  background-color: rgb(225 223 223);
  border: 1px solid rgb(225 223 223);
}
</style>
