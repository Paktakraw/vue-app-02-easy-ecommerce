<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { useCartStore } from "@/stores/user/cart";
import { RouterLink } from "vue-router";

const cartStore = useCartStore();

// เนื่องจากตัวเลขบนไอคอน cart ที่ navbar เป็น string จึงทำให้มี 0 ข้างหน้า ใช้ changeQuantity เพื่อเปลี่ยนเป็นตัวเลข
const changeQuantity = (event, index) => {
  const newQuantity = parseInt(event.target.value);
  cartStore.updateQuantity(index, newQuantity);
};
</script>

<template>
  <UserLayout>
    <h1 class="text-2xl font-bold">สินค้าในรถเข็น</h1>
    <div class="flex mt-5 mb-10">
      <!-- ฝั่ง ซ้าย shopping cart -->
      <div class="flex-auto w-64 bg-green-200 p-4">
        <div v-if="cartStore.items.length === 0">Cart is empty.</div>
        <div v-else v-for="(item, index) in cartStore.items" class="flex">
          <div class="flex-1">
            <img class="w-full p-5" :src="item.imgUrl" alt="" />
          </div>
          <div class="flex-1">
            <div class="relative flex flex-col justify-between h-full">
              <div class="grid grid-cols-2">
                <div>
                  <div>
                    <b>{{ item.name }}</b>
                  </div>
                  <div>{{ item.price }} บาท</div>
                </div>
                <select
                  v-model="item.quantity"
                  @change="changeQuantity($event, index)"
                  class="select select-bordered w-[100px]"
                >
                  <option v-for="quantity in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
                    {{ quantity }}
                  </option>
                </select>
              </div>
              <div
                @click="cartStore.removeItemInCart(index)"
                class="absolute top-0 right-0"
              >
                <IconClose></IconClose>
              </div>
              <div>มีสินค้าในสต๊อก</div>
            </div>
          </div>
        </div>
      </div>
      <!-- ฝั่งขวา summary -->
      <div class="flex-auto w-64 bg-green-300 p-4">
        <div class="text-xl font-bold">Order Summary</div>
        <div class="my-4">
          <div class="flex justify-between">
            <div>ราคาสินค้าทั้งหมด</div>
            <div>{{ cartStore.summaryPrice }} บาท</div>
          </div>
        </div>
        <div class="my-4">
          <div class="flex justify-between">
            <div>ค่าส่ง</div>
            <div>50 บาท</div>
          </div>
        </div>
        <div class="my-4">
          <div class="flex justify-between">
            <div>ราคารวมทั้งหมด</div>
            <div>{{ cartStore.summaryPrice + 50 }} บาท</div>
          </div>
          <RouterLink :to="{ name: 'checkout' }" class="btn mt-10 w-full"
            >ชำระเงิน</RouterLink
          >
        </div>
      </div>
    </div>
  </UserLayout>
</template>
