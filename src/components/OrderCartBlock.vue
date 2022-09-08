<template>
    <div class="cart__block">
    <slot name="preloader"></slot>
    <ul class="cart__orders">
    <order-item v-for="item in products" :key="item.productId" :item="item"/>
    </ul>
    
    <div class="cart__total">
    <p>Доставка: <b>500 ₽</b></p>
    <p>Итого: <b>{{totalProducts}}</b> <span>{{productNumerator}}</span> на сумму <b><span>{{totalSum | numberFormat}} ₽</span></b></p>
    </div>

    <slot/>
</div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import decOfNum from '@/helpers/decOfNum';
import OrderItem from '@/components/OrderItem.vue';

export default {
  filters: { numberFormat },
  components: { OrderItem },
  props: ['products', 'totalProducts', 'totalSum'],
  computed: {
    productNumerator() {
      return `${decOfNum(this.totalProducts, ['товар', 'товара', 'товаров'])}`;
    },
  },
};
</script>
