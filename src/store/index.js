import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 'DE205D37-8895-47C7-8BEF-B5D4E2179889',
        amount: 2, 
      },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      // console.log(amount);
      const item = state.cartProducts.find((x) => x.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push(
          {
            productId,
            amount, 
          },
        );  
      }
    },
    updateCartProduct(state, { productId, amount }) {
      const item = state.cartProducts.find((x) => x.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((x) => (x.productId !== productId));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return (state.cartProducts).map((item) => ({ ...item, product: products.find((x) => x.id === item.productId) }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalPositionsNumber(state) {
      return state.cartProducts.length || 0;
    },
  },
});
