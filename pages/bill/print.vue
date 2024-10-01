<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
      <div class="w-full bg-white h-full">
        <!-- content on body -->
        <div class="p-6">
          <div class="py-5 flex flex-col">
            <div class="text-xl font-sans font-semibold text-gray-500">TOTAL AMOUNT</div>
            <div class="text-3xl font-sans font-bold text-gray-700">Rp 208.000</div>
          </div>
          <!-- list picture rounded here -->
          <!-- Dynamic User Avatars -->
          <div class="grid grid-cols-4 my-4">
          <!-- <div class="flex overflow-x-auto space-x-4 my-4"> -->
            <div 
              class="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white"
              :style="{ backgroundColor: '#AA4421' }"
            >
              <span class="text-3xl">🦁</span>
            </div>
            <div class="flex flex-col col-span-3">
              <span class="font-sans font-bold text-gray-700">Ziancuk</span>
              <span class="font-sans font-bold text-gray-700 text-2xl">Rp 190.000</span>
            </div>
          </div>
          <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
          <div class="grid grid-cols-6 gap-4 py-2 pb-4">
            <div class="col-span-3 font-sans font-bold text-lg">Ayam Idup *</div>
            <div class="text-gray-300 font-semibold text-lg">x2</div>
            <div class="col-span-2 text-right font-sans font-bold text-lg">36,364</div>
            <!-- Accordion Header -->
          </div>
          <div class="grid grid-cols-2">
            <div class="text-gray-300">
              Bill Details
            </div>
            <div @click="toggleAccordion" class="cursor-pointer text-right font-sans font-bold text-lg">
              <!-- Icon for accordion state (open/close) -->
              <span :class="{ 'rotate-180': isOpen } " class="transition-transform duration-200 text-gray-300">
                ▼
              </span>
            </div>
          </div>
          <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">

          <!-- Accordion Content -->
          <div v-if="isOpen" class="mt-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="text-gray-500">+ Tax</div>
              <div class="text-right">13,067</div>
              <div class="text-gray-500">+ Service charge</div>
              <div class="text-right">0</div>
              <div class="text-gray-500">+ Discounts</div>
              <div class="text-right">0</div>
              <div class="text-gray-500">+ Others</div>
              <div class="text-right">0</div>
            </div>
          </div>
          <div class="py-4 grid grid-cols-2 gap-4">
            <button type="button" class="text-white bg-gray-300 hover:bg-gray-600 font-medium rounded-lg text-sm p-5 py-2.5 me-2 mb-2 focus:outline-none w-full">Share</button>
            <button type="button" class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">Copy Link</button>
        </div>
        </div>
        <div class="fixed bottom-0 left-0 right-0 py-4 text-center ">
          <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
          <div class="flex justify-center space-x-4 mt-2">
          </div>
        </div>
      </div>
    </div>

</template>
  
<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      isOpen: false, // State to track if accordion is open
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen; // Toggle the accordion state
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
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
