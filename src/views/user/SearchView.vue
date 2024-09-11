<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import Product from "@/components/Product.vue";
import { useProductStore } from "@/stores/user/product";
import { useCartStore } from "@/stores/user/cart";

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const searchText = ref("");

const addToCart = (product) => {
  // console.log(product);
  cartStore.addToCart(product);
};

// onMounted(() => {
// จะได้ค่าที่พิมพ์เข้ามา
// console.log(route.query.q);
//   if (route.query.q) {
//     searchText.value = route.query.q;
//   }
// });

// สำหรับเช็คว่า ถ้า searchText มีการเปลี่ยน เราจะให้ โชว์ list รายการ ตาม Array ที่เรา filter ไว้
const filterProducts = computed(() => {
  return productStore.filterProduct(searchText.value);
});

// ใช้ watch ดักจับ state เมื่อมีการเปลี่ยนแปลง เเละทำการลบ onMounted ออกไป เนื่องจากตอนเเรกเรา ผูก state ไว้กับ onMounted ทำให้ query params เปลี่ยน แต่ข้อความไม่เปลี่ยน จึงต้องมาใช้ watch
watch(
  () => route.query.q,
  (newSearchText) => {
    searchText.value = newSearchText;
  }
);
</script>

<template>
  <UserLayout>
    <div class="ml-6">
      Search: <b>{{ searchText }}</b>
    </div>
    <Product :products="filterProducts" :addToCart="addToCart"></Product>
  </UserLayout>
</template>
