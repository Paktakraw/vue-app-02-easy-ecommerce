<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import { useProductStore } from "@/stores/user/product";
import Product from "@/components/Product.vue";
import { useCartStore } from "@/stores/user/cart";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const addToCart = (product) => {
  // console.log(product);
  cartStore.addToCart(product);
  // เมื่อกดปุ่ม buy now เเล้วทำการ re-direct ไปหน้า cart view
  // router.push({ name: "cart" });
};
</script>

<template>
  <UserLayout>
    <!-- hero section -->
    <div
      class="hero h-[500px]"
      style="
        background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);
      "
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
          <p class="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <!-- product -->
    <Product :products="productStore.list" :addToCart="addToCart"></Product>
    <!-- <section
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-[50px]"
    >
      <div
        v-for="product in productStore.list"
        class="card bg-base-100 w-full shadow-xl"
      >
        <figure>
          <img :src="product.imgUrl" class="h-[170px] w-full" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.name }}</h2>
          <p>{{ product.about }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </section> -->
  </UserLayout>
</template>
