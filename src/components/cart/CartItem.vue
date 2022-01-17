<template>
  <li>
    <div>
      <img :src="image" :alt="title" />
    </div>
    <div>
      <h3>{{ title }}</h3>
      <div class="item__data">
        <div>
          Price per Item:
          <strong>EGP {{ price  }}</strong>
        </div>
        <div>
          <button @click="remove" class="trash-qty" v-if="qty <=1"><i class="fa fa-trash " ></i></button>
          <button v-else class="btn-qty" @click="minusQuantity"> - </button>
          <strong class="Quantity">{{ qty }}</strong>
          <button class="btn-qty" :disabled="qty >= maxQty" @click="plusQuantity"> + </button>
        </div>
      </div>
      <div class="item__total">stock:{{ stock }} </div>
      <div class="item__total">Total: EGP {{ itemTotal }} </div>
      <button @click="remove">Remove</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['prodId', 'title', 'image', 'price', 'qty','stock','maxQty'],
  computed: {
    itemTotal() {
      return (this.price * this.qty).toFixed(2);
    },
    
  },
  methods: {
    remove() {
      this.$store.dispatch('cart/removeFromCart',{productId:this.prodId })
    },
    plusQuantity() {
      this.$store.dispatch('cart/quantityIncrement',{
        id: this.prodId,
        })
    },
    minusQuantity() {
      this.$store.dispatch('cart/quantityDecrement',{
        id: this.prodId,
        title: this.title,
        price: this.price,
        qty: this.qty,
        })
    },
    
  },

};
</script>

<style scoped>
li {
  margin: 2rem auto ;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  max-width: 25rem;
}

img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.item__data {
  display: flex;
  justify-content: space-between;
}

.item__total {
  font-weight: bold;
  margin: 1rem 0;
  border-top: 1px solid #474747;
  border-bottom: 2px solid #474747;
  padding: 0.25rem 0;
  width: auto;
}

button,
.btn-qty {
  font: inherit;
  font-size: 1.2rem;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}
.btn-qty {
  border-radius: 3px;
  padding: 0.2rem .5rem;
}
.trash-qty {
  border-radius: 3px;
  padding: 0.2rem .3rem;
}
.Quantity {
  margin: 0 .5rem;
}
button:hover,
button:active,
.btn-qty:hover,
.btn-qty:active {
  background-color: #53001c;
  border-color: #53001c;
}
</style>