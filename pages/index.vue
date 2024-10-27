<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
        <div class="w-full h-full bg-white" style="border-radius: 0px 0px 55px 55px; height: 80%;">
          <div style="display: flex; justify-content: center; align-items: center;">
              <img src="/public/images/split-bill.png" alt="Top Image" class="h-auto" style="width: 60%;">
          </div>

            <!-- <img src="/public/images/split-bill.png" alt="Top Image" class="h-auto text-center" style="width:70%"> -->
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
         <div class="w-full text-center">
           <router-link to="/home">
               <button
               type="button"
               class="mt-8 rounded-md bg-gray-600 px-3 py-2 text-sm w-11/12 font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
               Let's Go
               </button>
           </router-link>
         </div>
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
        { title: 'Membuat Pembagian Biaya  <span style="color: #75A488;">Adil</span> dan Makmur', text: 'Split bill memungkinkan setiap orang membayar sesuai dengan pesanannya, sehingga tidak ada yang membayar lebih dari yang seharusnya.s' },
        { title: 'Tanggung Jawab dan <span style="color: #75A488;">Mengingatkan</span> yang mudah lupa', text: 'Split bill tidak hanya membagi biaya secara merata, tetapi juga memungkinkan setiap orang untuk membayar hanya untuk apa yang mereka konsumsi atau gunakan.' },
        { title: 'Dapat Mengurangi <span style="color: #75A488;">Putus Silaturahmi</span> Antar Teman', text: "Cocok untuk teman yang biasa 'Pake uang lu dulu ya, nanti gue bayar. Nah dengan mengirimkan split bill, maka teman akan ingat.'" },
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
  width: 375px;
  margin: 0 auto; /* centers the mobile view horizontally */
  padding: 0;
}
.carousel-item {
  transition: transform 0.5s ease;
}
</style>
