<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>          
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{totalProductstext}}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <base-form-text v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>

            <base-form-text v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес"/>

            <base-form-text v-model="formData.phone" :error="formError.phone" title="Телефон" placeholder="Введите ваш телефон" type="phone"/>

            <base-form-text v-model="formData.email" :error="formError.email" title="Email" placeholder="Введи ваш Email" type="email"/>

            <base-form-textarea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказу" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        
        <order-cart-block :products = "products" :totalProducts="totalProducts" :totalSum="totalSum">
          <template v-slot:preloader>
            <base-preloader v-if="$store.state.cartLoading===true"/>
          </template>

           <button class="cart__button button button--primery" type="submit" :disabled="orderCreation">
            <base-small-preloader v-show="orderCreation"/>
            Оформить заказ
          </button>         
        </order-cart-block>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import decOfNum from '@/helpers/decOfNum';
import { mapGetters /* , mapActions */ } from 'vuex';
import BaseSmallPreloader from '@/components/BaseSmallPreloader.vue';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import BasePreloader from '@/components/BasePreloader.vue';
import OrderCartBlock from '@/components/OrderCartBlock.vue';
import axios from 'axios';

import { API_BASE_URL } from '../config';

export default {
  filters: { numberFormat },
  components: {
    BaseFormText, 
    BaseFormTextarea, 
    BasePreloader,
    BaseSmallPreloader,
    OrderCartBlock,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',

      orderCreation: false,
    };
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalSum: 'cartTotalPrice', totalProducts: 'cartTotalPositionsNumber' }),
    totalProductstext() {
      return `${numberFormat(this.totalProducts)} ${decOfNum(this.totalProducts, ['товар', 'товара', 'товаров'])}`;
    },
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderCreation = true;

      return axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: { userAccessKey: this.$store.state.userAccessKey },
      })
        .then((response) => {
          this.$store.commit('updateOrderInfo', response.data);
          this.$store.commit('resetCart');
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        }).catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message || '';
        }).then(() => { this.orderCreation = false; });
    },
  },
};
</script>
