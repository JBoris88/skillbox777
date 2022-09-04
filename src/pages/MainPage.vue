<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">      
      <ProductFilter :priceFrom.sync="filterPriceFrom" :priceTo.sync="filterPriceTo" :categoryId.sync="filterCategoryId" :colorAspect.sync="filterColorAspect"/>
      <div>
          <section class="catalog">
            <base-preloader v-if="productsLoading"/>
            <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров...<button @click.prevent="loadProducts">Повторить</button> </div>
            <ProductList :products="products"/>
            <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
          </section>
      </div>
    </div>
  </main>      
</template>

<script>
// import products from '@/data/products';
import ProductFilter from '@/components/ProductFilter.vue';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import BasePreloader from '@/components/BasePreloader.vue';
import axios from 'axios';

import { API_BASE_URL } from '../config';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, BasePreloader,
  },
  data() {
    return {
      filterColorAspect: 0,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,

      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    /*
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((p) => p.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((p) => p.price <= +this.filterPriceTo);
      }
      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter((p) => p.categoryId === this.filterCategoryId);
      }
      if (this.filterColorAspect > 0) {
        filteredProducts = filteredProducts.filter((p) => (p.colorAspects.indexOf(this.filterColorAspect) > -1));
      }
      return filteredProducts;
    },
    */
    products() {
      return this.productsData 
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
          colorAspects: product.colors.map((color) => (color.id)),
        })) 
        : [];
      /*
      const offset = (this.page >= 1) ? ((this.page - 1) * this.productsPerPage) : 0;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      */
    },
    countProducts() {
      return this.productsData 
        ? this.productsData.pagination.total
        : 0;
      // return this.filteredProducts.length;
    },
  },  
  watch: {
    countProducts(value) {
      if (Math.ceil(value / this.productsPerPage) < this.page) {
        this.page = 1;
      }
    },
    page() {
      this.loadProducts();
    },
    filterColorAspect() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },            
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductTimeout);
      this.loadProductTimeout = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorAspect,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 1000);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
