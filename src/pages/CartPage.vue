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
          <a class="breadcrumbs__link">
            Корзина
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

    <base-preloader v-if="$store.state.cartLoading===true"/>
    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalSum | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import decOfNum from '@/helpers/decOfNum';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import BasePreloader from '@/components/BasePreloader.vue';

export default {
  components: { CartItem, BasePreloader },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalSum: 'cartTotalPrice', totalProducts: 'cartTotalPositionsNumber' }),
    totalProductstext() {
      return `${numberFormat(this.totalProducts)} ${decOfNum(this.totalProducts, ['товар', 'товара', 'товаров'])}`;
    },
    /*
    products() {
      return this.$store.getters.cartDetailProducts;
    },
    */
  },
};
</script>
