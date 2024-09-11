<script setup>
import { ref, onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";
import { useCartStore } from "@/stores/user/cart";

const cartStore = useCartStore();
const orderData = ref({});

// ถ้ามีการ เปิดหน้า success เราจะให้มีการ loadCheckout() ออกมา
onMounted(() => {
  cartStore.loadCheckout();
  // เอาข้อมูลที่ได้มาเเสดงผลที่หน้า success
  console.log(cartStore.checkout);

  // ถ้าใน order มี orderNumber เราจะดึงข้อมูล โดย เอา orderData มาใช้ เรียกข้อมูล
  if (cartStore.checkout.orderNumber) {
    orderData.value = cartStore.checkout;
  }
});
</script>

<template>
  <UserLayout>
    <div
      class="max-w-2xl mx-auto border border-base-300 shadow-xl rounded-lg p-6 my-8"
    >
      <div>
        <div class="text-2xl font-bold">คุณได้สั่งของ และชำระเงินสำเร็จ</div>
        <div>สวัสดี คุณ {{ orderData.กรอกชื่อและนามสกุล }}</div>
        <div>เตรียมรอรับสินค้าของคุณได้เลย !!</div>
      </div>
      <div class="divider px-2"></div>
      <div class="grid grid-cols-4 gap-8">
        <div>
          <div class="font-bold text-[14px]">วันที่สั่งซื้อ</div>
          <div>{{ orderData.createdDate }}</div>
        </div>
        <div>
          <div class="font-bold text-[14px]">หมายเลขสั่งซื้อ</div>
          <div>{{ orderData.orderNumber }}</div>
        </div>
        <div>
          <div class="font-bold text-[14px]">ประเภทการชำระเงิน</div>
          <div>{{ orderData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold text-[14px]">ที่อยู่</div>
          <div>{{ orderData.กรอกที่อยู่ }}</div>
        </div>
      </div>
      <div class="divider px-2"></div>
      <!-- วนลูป เอาข้อมูลออกมาใช้ -->
      <div class="text-center mb-4"><b>รายการสินค้า</b></div>
      <div
        v-for="(product, index) in orderData.products"
        class="grid grid-cols-4 gap-8"
        :key="index"
      >
        <div>ลำดับที่ {{ index + 1 }}</div>
        <div>{{ product.name }}</div>
        <div>จำนวน {{ product.quantity }}</div>
        <div>ราคา {{ product.price * product.quantity }} บาท</div>
      </div>
      <div class="divider px-2"></div>
      <div class="flex justify-between">
        <div>ราคาสินค้าทั้งหมด</div>
        <div>{{ orderData.totalPrice }} บาท</div>
      </div>
      <div class="flex justify-between">
        <div>ค่าจัดส่ง</div>
        <div>50 บาท</div>
      </div>
      <div class="divider px-2"></div>
      <div class="flex justify-between">
        <div><b>รวมราคาที่ต้องจ่ายทั้งสิ้น</b></div>
        <div>
          <b>{{ orderData.totalPrice + 50 }}</b> บาท
        </div>
      </div>
    </div>
  </UserLayout>
</template>
