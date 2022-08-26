<template>
  <ul class="catalog__list">
    <ProductItem v-for="prod in products" :key="prod.id" :productitem="prod"></ProductItem>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
