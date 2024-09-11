<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useCartStore } from "./stores/user/cart";
import { useProductStore } from "./stores/user/product";
import { useEventStore } from "./stores/event";

const cartStore = useCartStore();
const productStore = useProductStore();
const eventStore = useEventStore();

// ในจังหวะที่เราเปิดหน้าเว็บเข้ามาหน้าไหนก็ได้ครั้งเเรก เราจะให้ loadCart ทำงาน
onMounted(() => {
  cartStore.loadCart();
  productStore.loadProducts();
  eventStore.popupMessage("success", "test message");
});
</script>

<template>
  <!-- <div class="toast">
    <div class="alert" :class="`alert-${eventStore.data.status}`">
      <span>{{ eventStore.data.message }}</span>
    </div>
  </div> -->
  <RouterView />
</template>
