import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    list: [
      // {
      //   name: "แตงกวา",
      //   imgUrl:
      //     "https://i0.wp.com/www.plookphak.com/wp-content/uploads/2015/01/cucumber.jpg?ssl=1",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 5,
      // },
      // {
      //   name: "กะหล่ำปลี",
      //   imgUrl:
      //     "https://obs-ect.line-scdn.net/r/ect/ect/image_164791365059904060019cf2639t0f7551a2",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 10,
      // },
      // {
      //   name: "ไม้เสียบลูกชิ้น",
      //   imgUrl:
      //     "https://www.teeramon-inter.com/wp-content/uploads/2020/03/Skewer07-1067x800.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 40,
      // },
      // {
      //   name: "ฮอทดอก",
      //   imgUrl:
      //     "https://www.mfoodservice.com/images/food/food_929_0.png?ver=66bce097de735",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 70,
      // },
      // {
      //   name: "ลูกชิ้น",
      //   imgUrl: "https://i.ytimg.com/vi/4PpTG-7T2dk/maxresdefault.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 70,
      // },
      // {
      //   name: "ไส้กรอก",
      //   imgUrl:
      //     "https://www.jandoprocessing.com/wp-content/uploads/2020/01/vienna-chicken-01.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 70,
      // },
      // {
      //   name: "น้ำจิ้มลูกชิ้น",
      //   imgUrl: "https://i.ytimg.com/vi/OZ1RU5dApVw/maxresdefault.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 50,
      // },
      // {
      //   name: "น้ำจิ้มซีฟู๊ด",
      //   imgUrl:
      //     "https://www.matichonacademy.com/wp-content/uploads/2020/05/capture-20200508-162911-1200x749.png?theia_smart_thumbnails_file_version=2",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 50,
      // },
      // {
      //   name: "น้ำดื่ม",
      //   imgUrl:
      //     "https://assets.brandinside.asia/uploads/2024/02/pack1_0.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 55,
      // },
      // {
      //   name: "น้ำโค้ก",
      //   imgUrl:
      //     "https://www.coca-cola.com/content/dam/onexp/th/th/home-images/coke-zero-sugar.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 25,
      // },
      // {
      //   name: "กาโตะ",
      //   imgUrl:
      //     "https://obs-ect.line-scdn.net/r/ect/ect/image_164448765717085577119c97167t0f410ad9",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 10,
      // },
      // {
      //   name: "มาม่า",
      //   imgUrl:
      //     "https://www.prachachat.net/wp-content/uploads/2022/01/%E0%B8%A1%E0%B8%B2%E0%B8%A1%E0%B9%88%E0%B8%B2-2.jpg",
      //   quantity: 10,
      //   about:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      //   status: "open",
      //   price: 6,
      // },
    ],
  }),
  // ขณะที่เราไล่ลูปแต่ละตัว เราจะเอาไอเทม ที่มี name ตรง กับ searchText ไปเเสดง ถ้าตรงกันหลายตัว ก็เเสดงหลายตัว
  actions: {
    loadProducts() {
      const products = localStorage.getItem("admin-products");
      if (products) {
        this.list = JSON.parse(products);
        // เราจะโหลด product ก็ต่อเมื่อ เรายังไม่เคยโหลด product มา
        this.loaded = true;
      }
    },
    filterProduct(searchText) {
      return this.list.filter((product) => product.name.includes(searchText));
    },
  },
});
