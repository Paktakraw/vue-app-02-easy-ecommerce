<script setup>
import { RouterLink } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAdminProductStore } from "@/stores/admin/product";
import { onMounted } from "vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import Table from "@/components/Table.vue";

const adminProduct = useAdminProductStore();

onMounted(() => {
  adminProduct.loadProducts();
});

const removeProduct = (index) => {
  adminProduct.removeProduct(index);
};
</script>

<template>
  <AdminLayout>
    <div class="overflow-x-auto p-4">
      <div class="flex justify-between">
        <div class="pl-4 text-3xl font-bold">Products</div>
        <RouterLink
          :to="{ name: 'admin-products-create' }"
          class="btn btn-neutral"
          >Add Products</RouterLink
        >
      </div>
      <Table
        :headers="[
          'Name',
          'Image',
          'Price',
          'Quantity',
          'Status',
          'UpdatedAt',
          'Action',
        ]"
      >
        <tr
          v-for="(product, index) in adminProduct.list"
          class="hover text-center"
        >
          <td class="font-bold">{{ product.name }}</td>
          <td class="flex justify-center items-center">
            <img
              :src="product.imageUrl"
              alt=""
              class="w-[80px] h-[80px] rounded-lg"
            />
          </td>
          <td>{{ product.price }}</td>
          <!-- <td>{{ product.remainQuantity }} / {{ product.quantity }}</td> -->
          <td>{{ product.quantity }}</td>

          <td>
            <div
              class="badge"
              :class="
                product.status === 'open'
                  ? 'badge-primary text-center p-3'
                  : 'badge-error text-center p-3'
              "
            >
              {{ product.status }}
            </div>
          </td>
          <td>{{ product.updatedAt }}</td>
          <td>
            <div class="flex justify-center">
              <!-- คลิกเเล้ว ไปหน้า admin-products-update โดยการเรียกไปยัง id ผ่าน params โดยใช้ index -->
              <RouterLink
                :to="{ name: 'admin-products-update', params: { id: index } }"
                class="btn btn-ghost"
              >
                <IconEdit class="w-5 h-5" />
              </RouterLink>
              <button @click="removeProduct(index)" class="btn btn-ghost">
                <IconTrash class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>
