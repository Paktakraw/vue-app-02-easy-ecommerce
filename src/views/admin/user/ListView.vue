<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import Table from "@/components/Table.vue";
import { useAdminUserStore } from "@/stores/admin/user";
import { RouterLink } from "vue-router";

const adminUserStore = useAdminUserStore();

const handleChangeStatus = (index) => {
  // จิ้ม ไปที่ index นั้นๆ เพื่อดึงข้อมูลเก่าออกมาก่อน
  let selectedUser = adminUserStore.list[index];
  selectedUser.status =
    selectedUser.status === "active" ? "inactive" : "active";
  adminUserStore.updateUser(selectedUser);
};
</script>

<template>
  <AdminLayout>
    <div class="flex justify-between p-4">
      <div class="pl-4 text-3xl font-bold">Users</div>
    </div>
    <Table :headers="['Name', 'Role', 'Status', 'Update At', 'Action']">
      <tr v-for="(user, index) in adminUserStore.list">
        <td>{{ user.fullname }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
        <td>{{ user.updatedAt }}</td>
        <td class="flex gap-3 items-center justify-center">
          <RouterLink
            :to="{ name: 'admin-users-update', params: { id: index } }"
            class="btn"
            >Edit</RouterLink
          >
          <button class="btn" @click="handleChangeStatus(index)">
            {{ user.status === "active" ? "Disable" : "Enable" }}
          </button>
        </td>
      </tr>
    </Table>
  </AdminLayout>
</template>
