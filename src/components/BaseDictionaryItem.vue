<template>
    <li class="dictionary__item">
        <span class="dictionary__key">
        {{keyf}}
        </span>
        <span class="dictionary__value">
        {{value}}
        </span>
    </li>  
</template>

<script>
export default {
  props: ['keyf', 'value'],
};
</script>
