export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },
  mutations: {
    addProductToCart(state, payload) {
      const productData = payload;
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === productData.id
      );
      console.log(productData.id)
      const index = state.items[productInCartIndex];
      console.log(index)
      if (productInCartIndex >= 0) {
        index.qty++;
        index.stock--;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.name,
          image: productData.image,
          price: productData.prices.rawPrice,
          qty: 1,
          stock: productData.stock - 1,
          inCart: (productData.inCart = 1),
          maxQty: productData.maxQty,
        };
        state.items.push(newItem);
        console.log(state.items)
      }
      productData.stock--;
      state.qty++;
      state.total += parseInt(productData.prices.rawPrice);
      // console.log(parseInt(productData.prices.rawPrice))
    },
    quantity(state, payload) {
      const products = this.getters["prods/products"];
      const index = products.findIndex((prod) => prod.id === payload.id);
      products[index].stock += payload.process;
    },
    removeProductFromCart(state, payload) {
      const prodId = payload.productId;
      const productInCartIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.items[productInCartIndex];
      if (prodData) {
        state.items.splice(productInCartIndex, 1);
        state.qty -= prodData.qty;
        state.total -= parseInt(prodData.price * prodData.qty);
        const products = this.getters["prods/products"];
        const prodIndex = products.findIndex((prod) => prod.id === prodId);
        products[prodIndex].stock += prodData.qty;
        products[prodIndex].inCart = null;
      }
    },
    incrementProductInventory(state, payload) {
      const productData = payload;
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === productData.id
      );
      const prodIndex = state.items[productInCartIndex];

      const products = this.getters["prods/products"];
      const index = products.findIndex((prod) => prod.id === productData.id);

      if (
        productInCartIndex >= 0 &&
        prodIndex.qty < prodIndex.maxQty 
        &&
        products[index].stock > 0
      ) {
        prodIndex.qty++;
        prodIndex.stock--;
        state.qty++;
        state.total += parseInt(prodIndex.price) ;
        products[index].stock--;
      }
    },
    decrementProductInventory(state, payload) {
      const productData = payload;
      const productInCartIndex = state.items.findIndex(
        (prod) => prod.productId === productData.id
      );
      const indexOfItem = state.items[productInCartIndex];
      if (productInCartIndex >= 0 && indexOfItem.qty > 1) {
        indexOfItem.qty--;
        indexOfItem.stock++;
        state.qty--;
        state.total -=parseInt(indexOfItem.price);
        const products = this.getters["prods/products"];
        const index = products.findIndex((prod) => prod.id === productData.id);
        products[index].stock++;
      }
    },
  },
  actions: {
    addToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootGetters["prods/products"];
      const product = products.find((prod) => prod.id === prodId);
      context.commit("addProductToCart", product);
    },
    removeFromCart(context, payload) {
      context.commit("removeProductFromCart", payload);
    },
    quantityIncrement(context, payload) {
      context.commit("incrementProductInventory", payload);
    },
    quantityDecrement(context, payload) {
      context.commit("decrementProductInventory", payload);
    },
  },
  getters: {
    products(state) {
      return state.items;
    },
    totalSum(state) {
      return state.total;
    },
    quantity(state) {
      return state.qty;
    },
    itemQty:(state )=> (id) =>{
      const index = state.items.findIndex((prod) => prod.productId === id);
      return state.items[index];
    },
  },
};
