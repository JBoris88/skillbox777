<template>
    <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrCnt()">
        <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
        </svg>
    </button>

    <input type="text" :value="amount" @change ="changeAmount($event)" name="count">

    <button type="button" aria-label="Добавить один товар" @click="incrCnt()">
        <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
        </svg>
    </button>
    </div>
</template>

<script lang="ts">
export default ({
  model: {
    prop: 'amount',
    event: 'amount-change',
  },    
  props: ['amount'],
  methods: {
    changeAmount(event) {
      const newValue = event.target.value;
      if (+newValue > 0) {
        this.$emit('amount-change', event.target.value);
      }      
    },
    incrCnt() {
      this.$emit('amount-change', this.amount + 1);
    },
    decrCnt() {
      if (this.amount > 0) {
        this.$emit('amount-change', this.amount - 1);
      }
    },     
  },
});
</script>
