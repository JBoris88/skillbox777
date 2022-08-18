<template>
            <ul class="catalog__list">
          <li class="catalog__item" v-for="(prod, index) in products" :key="index">
            <ProductItem :productitem="prod"></ProductItem>
          </li>
        </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
