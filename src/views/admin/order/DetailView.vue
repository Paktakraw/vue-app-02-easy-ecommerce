<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useAdminOrderStore } from "@/stores/admin/order";

const orderIndex = ref(-1);
const orderData = ref({
  product: [],
});
const route = useRoute();
const adminOrderStore = useAdminOrderStore();

onMounted(() => {
  if (route.params.id) {
    orderIndex.value = parseInt(route.params.id);
    const selectOrder = adminOrderStore.getOrder(orderIndex.value);
    orderData.value = selectOrder;
  }
});
</script>

<template>
  <AdminLayout>
    <div class="p-4">
      <div class="flex justify-between p-4">
        <div class="pl-4 text-3xl font-bold">
          Orders detail id: {{ orderIndex }}
        </div>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <div class="font-bold">Order Date</div>
          <div>{{ orderData.customerName }}</div>
        </div>
        <div>
          <div class="font-bold">Order Number</div>
          <div>{{ orderData.no }}</div>
        </div>
        <div>
          <div class="font-bold">Payment method</div>
          <div>{{ orderData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold">Address</div>
          <div>{{ orderData.address }}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div
        v-for="product in orderData.products"
        class="grid grid-cols-4 p-4 text-center items-center"
      >
        <div class="w-[100px] mx-auto">
          <img :src="product.imageUrl" alt="" />
        </div>
        <div>
          <div class="font-bold">{{ product.name }}</div>
          <div>{{ product.description }}</div>
        </div>
        <div>{{ `จำนวน ${product.quantity} ชิ้น` }}</div>
        <div>{{ product.price }} บาท</div>
      </div>
      <div class="divider"></div>
      <div class="flex justify-between">
        <div>ราคาสินค้าทั้งหมด</div>
        <div>{{ orderData.totalPrice }} บาท</div>
      </div>
      <div class="flex justify-end mt-10">
        <RouterLink :to="{ name: 'admin-orders-list' }" class="btn"
          >Back</RouterLink
        >
      </div>
    </div>
  </AdminLayout>
</template>
