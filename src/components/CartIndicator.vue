<template>
    <base-small-preloader v-if="$store.state.cartLoading===true"/>
    <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}" v-else>
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{$store.state.cartProducts.length}}</span>        
    </router-link>    
</template>

<script>
import BaseSmallPreloader from './BaseSmallPreloader.vue';

export default {
  components: { BaseSmallPreloader },
    
};
</script>
