<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const pageData = [
  {
    name: "Dashboard",
    routeName: "admin-dashboard",
  },
  {
    name: "Product",
    routeName: "admin-products-list",
  },
  {
    name: "Order",
    routeName: "admin-orders-list",
  },
  {
    name: "User",
    routeName: "admin-users-list",
  },
  {
    name: "Logout",
    routeName: "admin-login",
  },
];

const route = useRoute();
const activeMenu = ref("");

onMounted(() => {
  activeMenu.value = route.name;
});
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li class="text-2xl font-bold px-[16px]">Admin</li>
        <!-- Sidebar content here -->
        <li v-for="page in pageData">
          <RouterLink
            :to="{ name: page.routeName }"
            :class="{ active: page.routeName === activeMenu }"
            >{{ page.name }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
