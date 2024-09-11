<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center">
    <div class="w-[700px] shadow-2xl mx-auto py-5 px-8">
      <div class="text-center text-[20px] font-bold">Login</div>
      <div class="mt-4">
        <div>Email</div>
        <input
          placeholder="Your Email"
          type="text"
          class="border border-slate-300 w-full p-2 mt-2"
        />
      </div>
      <div class="mt-4">
        <div>Password</div>
        <input
          placeholder="Your Password"
          type="password"
          class="border border-slate-300 w-full p-2 mt-2"
        />
      </div>
      <div class="mt-6">
        <RouterLink :to="{ name: 'admin-dashboard' }">
          <button
            class="border border-slate-300 w-full p-2 bg-black text-white"
          >
            Submit
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
