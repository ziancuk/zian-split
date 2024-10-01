<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
      <div class="w-full bg-white h-full">
        <div class="flex flex-col pt-3 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" @click="goBack" width="2.2em" height="2.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/></svg>
        </div>
        <!-- content on body -->
        <div class="flex flex-col p-6">
            <div class="pb-5">
                <div class="text-xl font-sans font-semibold text-gray-700">Detail yang terbaca</div>
                <div class="text-sm font-sans font-semibold text-gray-500">Pastikan semua detail sudah terbaca dengan benar</div>
            </div>
            <div class="p-4 outline outline-offset-2 outline-1 outline-gray-200">
                <!-- header -->
                <span class="text-lg font-sans font-bold text-gray-700">27/09/2024 08:53 Richeese</span>
                <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
                <div class="py-1">
                  <span class="font-sans font-bold text-gray-700">Ayam idup *</span>
                  <div class="grid grid-cols-6 gap-4 py-2 pb-4">
                    <div class="col-span-3">-</div>
                    <div class="text-gray-400 font-semibold">2x</div>
                    <div class="col-span-2 text-right font-sans font-bold">36,364</div>
                  </div>
                </div>
                <hr class="text-"style="border: 0.3px dashed grey">
                <div class="py-1">
                  <span class="font-sans font-bold text-gray-700">Ayam idup *</span>
                  <div class="grid grid-cols-6 gap-4 py-2 pb-4">
                    <div class="col-span-3">-</div>
                    <div class="text-gray-400 font-semibold">2x</div>
                    <div class="col-span-2 text-right font-sans font-bold">36,364</div>
                  </div>
                </div>
                <hr class="text-"style="border: 0.3px dashed grey">
                <div class="py-1">
                  <span class="font-sans font-bold text-gray-700">Ayam idup *</span>
                  <div class="grid grid-cols-6 gap-4 py-2 pb-4">
                    <div class="col-span-3">-</div>
                    <div class="text-gray-400 font-semibold">2x</div>
                    <div class="col-span-2 text-right font-sans font-bold">36,364</div>
                  </div>
                </div>
                <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-gray-400 font-sans font-semibold">Subtotal</div>
                  <div class="text-right font-sans font-bold">69,090</div>
                  <div class="text-gray-400 font-sans font-semibold">Pajak</div>
                  <div class="text-right font-sans font-bold">6,909</div>
                  <div class="text-gray-400 font-sans font-semibold">Biaya Layanan</div>
                  <div class="text-right font-sans font-bold">0</div>
                  <div class="text-gray-400 font-sans font-semibold">Diskon</div>
                  <div class="text-right font-sans font-bold">0</div>
                  <div class="text-gray-400 font-sans font-semibold">Lainnya</div>
                  <div class="text-right font-sans font-bold">0</div>
                  <div class="text-gray-400 font-sans font-semibold">Jumlah Total</div>
                  <div class="text-right font-sans font-bold">76,000</div>
                </div>
            </div>
            <div class="row">
              <div class="py-4 grid grid-cols-2 gap-4">
                  <router-link to="/bill/people">
                    <button type="button" class="text-white bg-gray-500 hover:bg-gray-900 font-medium rounded-lg text-sm p-5 py-2.5 me-2 mb-2 focus:outline-none w-full">Ubah Bill</button>
                  </router-link>
                  <router-link to="/bill/people">
                  <button type="button" class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">Konfirmasi</button>
                  </router-link>
              </div>
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
export default {
  data() {
    return {
    
    };
  },
  methods: {
    goBack() {
      this.$router.back(); // This navigates to the previous page
    }
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
