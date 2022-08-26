<template>
    <div>
        <ul class="catalog__pagination pagination" v-show="count>0">
          <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': (page<=1)}" @click.prevent="paginateDecr()" aria-label="Предыдущая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
            <a href="#" class="pagination__link" :class="{'pagination__link--current': pageNumber===page}" @click.prevent="paginatethis(pageNumber)">
              {{pageNumber}}
            </a>
          </li>
          <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': (page >= pages)}" @click.prevent="paginateIncr()" aria-label="Следующая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
    </div>
</template>

<script>
export default ({
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginatethis(page) {
      if ((page > 0) && (page <= this.pages)) {
        this.$emit('paginate', page);
      }
    },
    paginateDecr() {
      this.paginatethis(this.page - 1);
    },    
    paginateIncr() {
      this.paginatethis(this.page + 1);
    },
  },
});
</script>
