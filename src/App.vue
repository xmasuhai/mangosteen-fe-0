<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter.ts'

const { count } = storeToRefs(useCounterStore())
const { increment } = useCounterStore()
</script>

<template>
  <div>
    <h1>count {{ count }}</h1>
    <button @click="increment">+ 1</button>
  </div>
</template>

<style scoped lang="scss"></style>
