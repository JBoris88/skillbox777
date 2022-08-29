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
            <ProductList :products="products"/>
            <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
          </section>
      </div>

    </div>
  </main>      
</template>

<script>
import ProductFilter from '@/components/ProductFilter.vue';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import products from '@/data/products';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterColorAspect: 0,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
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
    products() {
      const offset = (this.page >= 1) ? ((this.page - 1) * this.productsPerPage) : 0;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },  
  watch: {
    countProducts(value) {
      if (Math.ceil(value / this.productsPerPage) < this.page) {
        this.page = 1;
      }
    },
  },  
};
</script>
