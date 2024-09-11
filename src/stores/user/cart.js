import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    checkout: {},
  }),
  getters: {
    // logic รวมจำนวนสินค้า
    summaryQuantity(state) {
      return state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
    },
    // logic รวมราคาสินค้าทั้งหมด
    summaryPrice(state) {
      return state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },
  },
  actions: {
    // ถ้าใน local storage cart-data มีค่า เราจะทำการ คืนค่านั้นออกมา
    loadCart() {
      const previousCart = localStorage.getItem("cart-data");
      if (previousCart) {
        this.items = JSON.parse(previousCart);
      }
    },
    addToCart(productData) {
      // ใช้ findIndex สำหรับ ค้นหาชื่อ ว่า เมื่อเรากด buy now เเล้วมีสินค้าชื่อนี้อยู่เเล้วในตะกร้าหรือไม่ เพื่อทำการอับเดตจำนวน ไม่ใช่ขึ้นเป็น ไอเทม list อันใหม่
      const findProductIndex = this.items.findIndex((item) => {
        return item.name === productData.name;
      });
      // ถ้าไม่เจอชื่อที่ซ้ำกับ index แต่ละตำแหน่ง จะคืนค่าเป็น -1 เลยดักไว้ว่า <0 จะเพิ่มรายการสินค้าเป็น 1
      if (findProductIndex < 0) {
        productData.quantity = 1;
        this.items.push(productData);
        // แต่ถ้าเจอชื่อซ้ำกับตำแหน่ง index ให้เอา quantity +1 เเล้วไปอับเดตตะกร้าสินค้า
      } else {
        const currentItem = this.items[findProductIndex];
        this.updateQuantity(findProductIndex, currentItem.quantity + 1);
      }
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity;
      // จำลองการเก็บข้อมูล data ไว้ใน local storage ชื่อว่า cart-data
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    removeItemInCart(index) {
      this.items.splice(index, 1);
      localStorage.setItem("cart-data", JSON.stringify(this.items));
    },
    // เพิ่มฟังก์ชั่น checkout สำหรับทำการเก็บข้อมูลลูกค้าที่กรอกเข้ามาในหน้าชำระเงินไว้ใน local storage เนื่องจากเรายังไม่มีระบบ หลังบ้าน
    placeOrder(userData) {
      const orderData = {
        ...userData,
        totalPrice: this.summaryPrice,
        paymentMethod: "Credit Card",
        createdDate: new Date(),
        products:this.items,
        // ทำการเเรนด้อมเลข5ตัวสำหรับจำลองเป็น เลขคำสั่งซื้อ
        orderNumber: `AA${Math.floor(Math.random() * 90000 + 10000)}`,
      };
      // ทำการ เซฟ orderData ลง local storage
      localStorage.setItem("order-data", JSON.stringify(orderData));
    },
    loadCheckout() {
      const orderData = localStorage.getItem("order-data");
      // ถ้ามีข้อมูล order data จะทำการเรียกข้อมูลนั้นออกมา ถ้าไม่มีข้อมูล เราจะ re-direct ไปหน้าอื่น(หน้า success)
      if (orderData) {
        this.checkout = JSON.parse(orderData);
      }
    },
  },
});
