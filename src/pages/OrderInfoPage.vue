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
        Заказ оформлен <span>№ {{orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <base-dictionary-item keyf="Получатель" :value="orderInfo.name"/>
            <base-dictionary-item keyf="Адрес доставки" :value="orderInfo.address"/>
            <base-dictionary-item keyf="Телефон" :value="orderInfo.phone"/>
            <base-dictionary-item keyf="Email" :value="orderInfo.email"/>
            <base-dictionary-item keyf="Способ оплаты" :value="orderInfo.paymentType"/>
          </ul>
        </div>
        <order-cart-block :products = "products" :totalProducts="totalProducts" :totalSum="orderInfo.totalPrice"/>
      </form>
    </section>
  </main>  
</template>

<script>
import BaseDictionaryItem from '@/components/BaseDictionaryItem.vue';
import OrderCartBlock from '@/components/OrderCartBlock.vue';
import { mapGetters /* , mapActions */ } from 'vuex';

export default {
  components: { BaseDictionaryItem, OrderCartBlock },
  computed: {
    ...mapGetters({ 
      orderInfo: 'orderInfoDetail',
      products: 'orderDetailProducts', 
      totalProducts: 'orderTotalPositionsNumber',
    }),
  },
  created() {
    // eslint-disable-next-line dot-notation
    const currOrderId = (this.$route.params['id']);
    if ((this.$store.state.orderInfo) && (this.$store.state.orderInfo.id === currOrderId)) {
      return;
    }
    this.$store.dispatch('loadOrder', currOrderId);
  },
  
};
</script>
