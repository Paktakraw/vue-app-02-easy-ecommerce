<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref, onMounted, reactive } from "vue";
import { useAdminProductStore } from "@/stores/admin/product";
import { useRouter, useRoute } from "vue-router";

const formData = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Image",
    field: "imageUrl",
  },
  {
    name: "Price",
    field: "price",
  },
  {
    name: "Quantity",
    field: "quantity",
  },
  {
    name: "About",
    field: "about",
  },
];

const productData = reactive({
  name: "",
  imageUrl: "",
  price: 0,
  quantity: 0,
  about: "",
  status: "",
});

const adminProductStore = useAdminProductStore();
const router = useRouter();
const route = useRoute();

const productIndex = ref(-1);
const mode = ref("Add");

const updateProduct = () => {
  if (mode.value === "Edit") {
    adminProductStore.updateProduct(productIndex.value, productData);
  } else {
    adminProductStore.addProduct(productData);
  }
  router.push({ name: "admin-products-list" });
};

onMounted(() => {
  if (route.params.id) {
    productIndex.value = parseInt(route.params.id);
    mode.value = "Edit";

    const selectProduct = adminProductStore.getProduct(productIndex.value);
    // ตรวจสอบค่าที่ได้ออกมา ก่อนทำการ edit
    // console.log('selectProduct',selectProduct);
    // ดึงข้อมูลเก่าออกมา ก่อนทำการ edit
    productData.name = selectProduct.name;
    productData.imageUrl = selectProduct.imageUrl;
    productData.price = selectProduct.price;
    productData.quantity = selectProduct.quantity;
    productData.about = selectProduct.about;
    productData.status = selectProduct.status;
  }
});
</script>

<template>
  <AdminLayout>
    <div class="p-8">
      <div class="text-2xl font-bold">{{ mode }} Product</div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="form in formData" class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ form.name }}</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="productData[form.field]"
          />
        </div>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2">
        <select
          v-model="productData.status"
          class="select select-bordered w-full"
        >
          <option disabled selected>Choose Status</option>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
      </div>
      <div class="flex gap-3 mt-4 justify-end">
        <button class="btn">Back</button>
        <button class="btn" @click="updateProduct()">{{ mode }}</button>
      </div>
    </div>
  </AdminLayout>
</template>
