<template>
      <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.title }}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">

              <li class="colors__item" v-for="clr in colorAspects" :key="clr.id">
                
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" :value="clr.id" v-model="currentColorAspect">
                  <span class="colors__value" v-bind:style="'background-color:' + clr.color">
                  </span>                  
                </label>
                
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16 
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click="reset()">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
// import categories from '@/data/categories';
// import coloraspects from '@/data/colorAspects';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import { API_BASE_URL } from '@/config.js';

export default {
  data() {
    return {      
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorAspect: 0,

      categoriesData: null, 
      colorAspectsData: null, 
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorAspect'],
  computed: {   
    categories() {
      return this.categoriesData 
        ? this.categoriesData.items 
        : [];      
    },
    colorAspects() {
      return this.colorAspectsData 
        ? this.colorAspectsData.items.map((color) => ({ ...color, color: color.code, backcolor: color.code })) 
        : [];  
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorAspect(value) {
      this.currentColorAspect = value;
    },
  },
  methods: {
    submit() {      
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorAspect', this.currentColorAspect);
    },
    reset() {      
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorAspect', 0);
    },    
    loadCategories() {
      return axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => { this.categoriesData = response.data; });
    },
    loadColorAspects() {
      return axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => { this.colorAspectsData = response.data; });
    },    
  },
  created() {
    this.loadCategories();
    this.loadColorAspects();
  },  
};
</script>
