<script setup>
import { ref, onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";

const profileImageUrl = ref(
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
);
const email = ref("");
const name = ref("");

const handleFileUpload = (e) => {
  // ถ้ามีการเปลี่ยนรูป เราจะดักจับไฟล์เเรกที่มีการอัพโหลด
  const file = e.target.files[0];
  // นำไฟล์นั้นมาใส่ reader
  if (file) {
    const reader = new FileReader();
    // เมื่อ reader อ่านเสร็จ จะกลับมาฟังก์ชั่นเดิม เเล้วเอารูปใหม่ มาใส่ใน profileImageUrl เเล้วเอามาเเสดงอีกครั้ง
    reader.onload = (event) => {
      profileImageUrl.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// เมื่อคลิกปุ่มอัพเดตโปรไฟล์ จะทำการเก็บข้อมูลใหม่ ไว้ใน local storage
const updateProfile = () => {
  const newProfileData = {
    imgUrl: profileImageUrl.value,
    name: name.value,
    email: email.value,
  };
  localStorage.setItem("profile-data", JSON.stringify(newProfileData));
  alert('อัพเดตข้อมูลสำเร็จ !!')
};

// เมื่อมีการ รีเฟซ เว็บ ข้อมูลที่ อัพเดตค้างไว้ จะยังคงอยู่เหมือนเดิม
onMounted(() => {
  let profileData = localStorage.getItem("profile-data");
  if (profileData) {
    profileData = JSON.parse(profileData);
    profileImageUrl.value = profileData.imgUrl;
    name.value = profileData.name;
    email.value = profileData.email;
  }
});
</script>

<template>
  <UserLayout>
    <div
      class="max-w-2xl mx-auto border border-base-300 shadow-xl rounded-lg p-6 my-8"
    >
      <div class="text-2xl"><b>โปรไฟล์ของคุณ</b></div>
      <div class="flex flex-col mt-6 items-center">
        <img
          :src="profileImageUrl"
          alt=""
          class="rounded-full h-[150px] w-[150px]"
        />
        <div class="mt-4"><input type="file" @change="handleFileUpload" /></div>
      </div>
      <div class="mt-6">
        <div>
          <div>อีเมล</div>
          <input
            v-model="email"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full rounded-2xl mt-4"
          />
        </div>
        <div class="mt-4">
          <div>ชื่อและนามสกุล</div>
          <input
            v-model="name"
            type="text"
            class="input input-bordered w-full rounded-2xl mt-4"
            placeholder="Type here"
          />
        </div>
      </div>
      <button @click="updateProfile" class="btn w-full mt-4">
        อัพเดต โปรไฟล์
      </button>
    </div>
  </UserLayout>
</template>
