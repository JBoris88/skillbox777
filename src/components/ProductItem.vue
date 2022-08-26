<template>
    <li class="catalog__item">
            <a class="catalog__pic" href="#">
              <img :src="productitem.image" :alt="productitem.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ productitem.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ productitem.price }} ₽
            </span>
            <ul class="colors colors--black">
              <li class="colors__item" v-for="productcolor in colorsOfProduct" :key="productcolor.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" :value="productcolor.id">
                  <span class="colors__value" v-bind:style="'background-color:' + productcolor.color">
                  </span>
                </label>
              </li>
            </ul>            
<!--
            <ul class="colors colors--black">
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" value="#73B6EA"  v-model="color">
                  <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                </label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" value="#8BE000" v-model="color">
                  <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                </label>
              </li>
              <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" value="#222"  v-model="color">
                  <span class="colors__value" style="background-color: #222;">
                  </span>
                </label>
              </li>
            </ul>
-->
    </li>
</template>

<script>
import coloraspects from '../data/colorAspects';

export default ({
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['productitem'],
  computed: {
    colorAspects() {
      return coloraspects;
    },
    colorsOfProduct() {
      let clrsOfProd = [];
      clrsOfProd = this.colorAspects.filter((x) => this.productitem.colorAspects.indexOf(x.id) > -1);
      return clrsOfProd;
    },
  },
});
</script>
