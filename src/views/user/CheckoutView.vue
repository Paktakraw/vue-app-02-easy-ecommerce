<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import { reactive } from "vue";
import { useCartStore } from "@/stores/user/cart";
import { RouterLink, useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

const formData = [
  {
    name: "อีเมล",
    field: "กรอกอีเมล",
  },
  {
    name: "ชื่อ - สกุล",
    field: "กรอกชื่อและนามสกุล",
  },
  {
    name: "ที่อยู่",
    field: "กรอกที่อยู่",
  },
  {
    name: "หมายเหตุ",
    field: "กรอกหมายเหตุ",
  },
];

const userFormData = reactive({
  กรอกอีเมล: "",
  กรอกชื่อและนามสกุล: "",
  กรอกที่อยู่: "",
  กรอกหมายเหตุ: "",
});

const handlePayment = () => {
  // เก็บข้อมูล userData
  cartStore.placeOrder(userFormData);
  router.push({ name: "success" });
};
</script>

<template>
  <UserLayout>
    <h1 class="text-2xl font-bold">กรุณากรอกข้อมูล และทำการชำระเงิน</h1>
    <div class="flex mt-5 mb-10">
      <section class="flex-auto w-64 bg-green-200 p-6">
        <div v-for="form in formData" class="p-2">
          <div class="text-[14px] font-bold mb-2">{{ form.name }}</div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full rounded-full"
            v-model="userFormData[form.field]"
          />
        </div>
        <button @click="handlePayment()" class="btn w-full mt-2">
          ชำระเงิน
        </button>
      </section>
      <section class="flex-auto w-32 bg-green-300 p-6">
        <div v-for="item in cartStore.items" class="flex bg-white p-2 mb-2">
          <div class="flex justify-between w-full">
            <div>
              <b>{{ item.name }}</b>
            </div>
            <div>จำนวน{{ item.quantity }}</div>
            <RouterLink :to="{ name: 'cart' }">แก้ไข</RouterLink>
          </div>
        </div>
        <div class="divider px-2"></div>
        <div>
          <div><b>Order summary</b></div>
          <div class="flex justify-between">
            <div>ราคาสินค้าทั้งหมด</div>
            <div>{{ cartStore.summaryPrice }} บาท</div>
          </div>
          <div class="flex justify-between">
            <div>ค่าจัดส่ง</div>
            <div>50 บาท</div>
          </div>
        </div>
        <div class="divider px-2"></div>
        <div class="flex justify-between">
          <div>รวมราคาที่ต้องจ่ายทั้งสิ้น</div>
          <div class="text-[18px]">
            <b>{{ cartStore.summaryPrice + 50 }}</b> บาท
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>
