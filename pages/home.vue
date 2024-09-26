<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
      <div class="px-6 py-10 text-left w-full">
        <span class="text-3xl mb-1 font-sans tracking-tight font-semibold text-white">
            Good Morning
        </span>
        <p class="text-md font-sans text-white">How are you today?</p>
      </div>
      <div class="w-full bg-white" style="border-radius: 55px 55px 0px 0px ; height: 100%;">
        <!-- content on body -->
        <div class="flex justify-center items-center p-4">
          <!-- <div class="p-2 bg-gradient-to-b from-[#FEAA42] to-[#F08672]"> -->
            <img src="/public/images/icon_home.png" alt="Top Image" class="w-[117px] h-[76px] mt-[-50px] mx-auto">
          <!-- </div> -->
        </div>
        <div class="p-4 text-center">
          <span class="text-3xl mb-1 font-sans tracking-tight font-semibold text-gray-700">
            Your fresh and green comfortable <span style="color: #75A488;">place</span>
          </span>
        </div>
        <div class="flex justify-content items-center p-3">
          <router-link to="/price">
            <div class="w-40 h-40 m-4 lex flex-col bg-white rounded-3xl shadow-lg flex items-center justify-center hover:bg-gray-200">
              <img src="/public/images/icon_price.png" alt="Top Image" class="mx-auto">
              <span class="p-3">Price</span>
            </div>
          </router-link>
          <router-link to="/item">
            <div class="w-40 h-40 m- lex flex-col 4 bg-white rounded-3xl shadow-lg flex items-center justify-center hover:bg-gray-200">
              <img src="/public/images/icon_item.png" alt="Top Image" class="mx-auto">
              <span class="p-3">Item</span>
            </div>
          </router-link>
        </div>
        <!-- Footer -->
        <div class="fixed bottom-0 left-0 right-0 py-4 text-center ">
          <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
          <div class="flex justify-center space-x-4 mt-2">
          </div>
        </div>
      </div>
    </div>

</template>
  
<script>
export default {
  data() {
    return {
      activeIndex: 0,
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide();
  },
  methods: {
    startAutoSlide() {
      this.slideInterval = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.slides.length;
      }, 3000); // Change slide every 3 seconds
    },
    stopAutoSlide() {
      clearInterval(this.slideInterval);
    },
    setActiveSlide(index) {
      this.activeIndex = index;
      this.stopAutoSlide(); // Optional: Stop auto slide when manually selecting a slide
      this.startAutoSlide(); // Restart auto slide after manual selection
    },
  },
};
</script>

<style scoped>
.mobile-view {
  width: 400px;
  margin: 0 auto; /* centers the mobile view horizontally */
}
.carousel-item {
  transition: transform 0.5s ease;
}
</style>
