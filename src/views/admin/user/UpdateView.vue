<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref, reactive, onMounted } from "vue";
import { useAdminUserStore } from "@/stores/admin/user";
import { useRoute, useRouter } from "vue-router";

const formData = [
  {
    name: "Name",
    field: "fullname",
    type: "text",
  },
  {
    name: "Role",
    field: "role",
    type: "select",
    drowdownList: ["admin", "moderator", "user"],
  },
  {
    name: "Status",
    field: "status",
    type: "select",
    drowdownList: ["active", "inactive"],
  },
];

const userIndex = ref(-1);
const adminUserStore = useAdminUserStore();
const route = useRoute();
const router = useRouter();

const userData = reactive({
  fullname: "",
  role: "",
  status: "",
});

onMounted(() => {
  if (route.params.id) {
    userIndex.value = parseInt(route.params.id);
    const selectedUser = adminUserStore.getUser(userIndex.value);

    userData.fullname = selectedUser.fullname;
    userData.role = selectedUser.role;
    userData.status = selectedUser.status;
  }
});

const updateUser = () => {
  adminUserStore.updateUser(userIndex.value, userData);
  router.push({ name: "admin-users-list" });
};
</script>

<template>
  <AdminLayout>
    <div class="p-8">
      <div class="text-2xl font-bold">Edit Users</div>
      <div class="divider"></div>
      <!-- from -->
      <div class="grid grid-cols-1 gap-3">
        <div v-for="form in formData" class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ form.name }}</span>
          </div>
          <input
            v-if="form.type === 'text'"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="userData[form.field]"
          />
          <select
            v-if="form.type === 'select'"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="userData[form.field]"
          >
            <option v-for="item in form.drowdownList">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <!-- button -->
      <div class="flex gap-3 mt-4 justify-end">
        <button class="btn">Back</button>
        <button class="btn" @click="updateUser()">Edit</button>
      </div>
    </div>
  </AdminLayout>
</template>
