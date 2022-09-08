import Vue from 'vue';
import Vuex from 'vuex';
// import products from '@/data/products';
import axios from 'axios';

import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      /*
      {
        productId: 'DE205D37-8895-47C7-8BEF-B5D4E2179889',
        amount: 2, 
      },
      */
    ],

    userAccessKey: null,

    cartProductsData: [],

    cartLoading: false,

    orderInfo: null,

    orderLoading: false,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateOrderLoading(state, value) {
      state.orderLoading = value;
    },      
    resetCart(state) {
      state.cartProducts = []; 
      state.cartProductsData = [];
    },    
    /*
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
    */
    updateCartProduct(state, { productId, amount }) {
      const item = state.cartProducts.find((x) => x.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((x) => (x.productId !== productId));
    },
    updateuserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => (
        {
          productId: item.product.id,
          amount: item.quantity,
        }
      ));
    },
    updatecartLoading(state, value) {
      state.cartLoading = value;
    },    
  },
  getters: {
    orderInfoDetail(state) {
      return state.orderInfo 
        ? {
          id: state.orderInfo.id,
          name: state.orderInfo.name,
          address: state.orderInfo.address,
          phone: state.orderInfo.phone,
          email: state.orderInfo.email,
          paymentType: 'картой при получении',
          totalPrice: state.orderInfo.totalPrice,
        }
        : {};
    },    
    orderDetailProducts(state) {
      return (state.orderInfo)
        ? (state.orderInfo.basket.items).map((x) => ({ 
          productId: x.product.id,
          amount: x.quantity,
          product: {
            title: x.product.title,
            price: x.price,
            id: x.product.id,
          },
        }))
        : [];
    },
    orderTotalPositionsNumber(state, getters) {
      return (getters.orderDetailProducts).length || 0;
    },    
    cartDetailProducts(state) {
      // return (state.cartProducts).map((item) => ({ ...item, product: products.find((x) => x.id === item.productId) }));
      return (state.cartProducts).map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const product = state.cartProductsData.find((x) => (x.product.id === item.productId)).product;
        return { 
          ...item, 
          product: {
            ...product,
            image: product.image.file.url,
            colorAspects: product.colors.map((color) => (color.id)),  
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalPositionsNumber(state) {
      return state.cartProducts.length || 0;
    },
  },
  actions: {
    loadOrder(context, orderId) {
      context.commit('updateOrderLoading', true);
      
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => { 
          context.commit('updateOrderInfo', response.data); 
        })
        .then(() => { context.commit('updateOrderLoading', false); });
    },
    loadCart(context) {
      context.commit('updatecartLoading', true);
      
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => { 
          if (!context.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateuserAccessKey', response.data.user.accessKey); 
          }
          context.commit('updateCartProductsData', response.data.items); 
          context.commit('syncCartProducts'); 
        })
        .then(() => { context.commit('updatecartLoading', false); });
    },
    addProductToCart(context, { productId, amount }) {
      context.commit('updatecartLoading', true);

      return (new Promise((resolve) => { setTimeout(resolve, 1000); }))
        .then(() => {
          axios.post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: { userAccessKey: context.state.userAccessKey },
          })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items); 
              context.commit('syncCartProducts'); 
            })
            .then(() => { context.commit('updatecartLoading', false); });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProduct', { productId, amount });

      if (amount < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: { userAccessKey: context.state.userAccessKey },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items); 
        })
        .catch(() => {
          context.commit('syncCartProducts'); 
        });  
    },
    deleteCartProduct(context, productId) {
      context.commit('updatecartLoading', true);

      return (new Promise((resolve) => { setTimeout(resolve, 1000); }))
        .then(() => {
          axios.delete(`${API_BASE_URL}/api/baskets/products`, { 
            data: {
              productId,
            },
            params: { userAccessKey: context.state.userAccessKey },
          })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items); 
              context.commit('syncCartProducts'); 
            })
            .then(() => { context.commit('updatecartLoading', false); });
        });      
    },
  },
});
