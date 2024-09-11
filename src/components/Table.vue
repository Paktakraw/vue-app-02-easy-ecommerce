<script setup>
import { defineProps } from "vue";

defineProps({
  headers: Array,
});
</script>

<template>
  <div class="p-4">
    <table class="table text-center">
      <thead>
        <tr>
          <th v-for="header in headers">{{ header }}</th>
          <!-- <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Updated At</th> -->
          <th></th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
