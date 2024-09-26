<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
        <div class="w-full bg-white" style="border-radius: 0px 0px 55px 55px; height: 90%;">
            <img src="/public/images/1.png" alt="Top Image" class="w-full h-auto">
            <!-- Carousel Wrapper -->
            <div class="p-4 relative">
                    <!-- Carousel Items -->
                <div class="carousel relative overflow-hidden w-full">
                    <div
                        class="carousel-inner flex transition-transform duration-500 ease-in-out"
                        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
                    >
                        <div
                        v-for="(slide, index) in slides"
                        :key="index"
                        class="carousel-item min-w-full"
                        >
                        <p class="text-3xl mb-4 font-sans tracking-tight font-semibold" v-html="slide.title">
                        </p>

                        <p>{{ slide.text }}</p>
                        </div>
                    </div>
                </div>

                <!-- Slider Indicators -->
                <div class="flex justify-start mt-4 space-x-2">
                    <span
                        v-for="(slide, index) in slides"
                        :key="index"
                        @click="setActiveSlide(index)"
                        :class="{
                        'bg-gray-800': activeIndex === index,
                        'bg-gray-400': activeIndex !== index
                        }"
                        class="w-3 h-3 rounded-full cursor-pointer transition-colors duration-300"
                    ></span>
                </div>
            </div>
        </div>

        <!-- Button to navigate to home -->
        <router-link to="/home">
            <button
            type="button"
            class="mt-4 rounded-md bg-gray-600 px-3 py-2 text-sm w-full font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Let's Go
            </button>
        </router-link>
    </div>

</template>
<!-- <button type="button" class="m-1 rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Split Item</button>
<br>
<button type="button" class="m-1 rounded-md bg-green-500 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Split Price</button> -->

<!-- <footer class="pt-8">
    <small>
        Copyright 2024 by ZianCuk 
    </small>
</footer> -->
  
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      slides: [
        { title: 'Book a Green Room & <span style="color: #75A488;">Workspace</span> On-Demand', text: 'A Space that unites the conscious individuals who collaborate to reduce their carbon footprint.' },
        { title: 'Book a Green Room & <span style="color: #75A488;">Workspace</span> On-Demand', text: 'A Space that unites the conscious individuals who collaborate to reduce their carbon footprint.' },
        { title: 'Book a Green Room & <span style="color: #75A488;">Workspace</span> On-Demand', text: 'This is the text for the third slide.' },
      ],
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
