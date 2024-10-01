<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
      <div class="w-full bg-white h-full">
        <!-- content on body -->
        <div class="p-6">
          <div class="py-5 flex flex-col">
            <div class="text-2xl font-sans font-bold text-gray-700">Add item</div>
            <div class="text-sm font-sans font-semibold text-gray-500">items after tapping a friend</div>
          </div>
          <!-- Dynamic User Avatars -->
          <div class="flex overflow-x-auto space-x-4 my-4">
            <div v-for="(user, index) in users" :key="index" class="relative">
              <!-- Dynamic Icon with Random Background Color -->
                <div class="py-4">
                  <div 
                    class="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white"
                    :style="{ backgroundColor: user.bgColor }"
                  >
                    <span class="text-3xl">{{ user.icon }}</span>
                  </div>
  
                  <!-- User Name -->
                  <input 
                    v-model="user.name" 
                    class="mt-2 text-center text-sm focus:outline-none w-full"
                    placeholder="Enter name" disabled
                  />
              </div>
            </div>
          </div>
          <div class="py-4">
            <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
            <div class="py-1">
              <div class="grid grid-cols-2 gap-4 py-2 pb-4">
                <span class="font-sans font-bold text-gray-700">Ayam idup *</span>
                <div class="text-right">
                    <input checked id="green-checkbox" type="checkbox" value="" class="w-4 h-4 bg-customGreen border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 ">
                    <label for="green-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                </div>
                <div class="grid grid-cols-6 gap-4 py-2 pb-4">
                  <div class="col-span-3">-</div>
                  <div class="text-gray-400 font-semibold">2x</div>
                  <div class="col-span-2 text-right font-sans font-bold">36,364</div>
                </div>
              </div>
              <div 
                  class="w-11 h-11 flex items-center justify-center rounded-full border-2 border-white"
                  :style="{ backgroundColor: '#AA22E5' }"
                >
                  <span class="text-xl">🐸</span>
              </div>
            </div>
            <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
            <div class="py-1">
              <div class="grid grid-cols-2 gap-4 py-2 pb-4">
                <span class="font-sans font-bold text-gray-700">Ayam idup *</span>
                <div class="text-right">
                    <input checked id="green-checkbox" type="checkbox" value="" class="w-4 h-4 bg-customGreen border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 ">
                    <label for="green-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                </div>
              </div>
              <div class="grid grid-cols-6 gap-4 py-2 pb-4">
                <div class="col-span-3">-</div>
                <div class="text-gray-400 font-semibold">2x</div>
                <div class="col-span-2 text-right font-sans font-bold">36,364</div>
              </div>
            </div>
            <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
            <div class="py-1">
              <div class="grid grid-cols-2 gap-4 py-2 pb-4">
                <span class="font-sans font-bold text-gray-700">Ayam idup *</span>
                <div class="text-right">
                    <input checked id="green-checkbox" type="checkbox" value="" class="w-4 h-4 bg-customGreen border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 ">
                    <label for="green-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                </div>
              </div>
              <div class="grid grid-cols-6 gap-4 py-2 pb-4">
                <div class="col-span-3">-</div>
                <div class="text-gray-400 font-semibold">2x</div>
                <div class="col-span-2 text-right font-sans font-bold">36,364</div>
              </div>
            </div>
            <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-gray-800 font-sans font-semibold">Subtotal</div>
                  <div class="text-right font-sans font-bold">69,090</div>
                  <div class="text-gray-800 font-sans font-semibold">Pajak</div>
                  <div class="text-right font-sans font-bold">6,909</div>
                  <div class="text-gray-800 font-sans font-semibold">Biaya Layanan</div>
                  <div class="text-right font-sans font-bold">0</div>
                  <div class="text-gray-800 font-sans font-semibold">Diskon</div>
                  <div class="text-right font-sans font-bold">0</div>
                  <div class="text-gray-800 font-sans font-semibold">Lainnya</div>
                  <div class="text-right font-sans font-bold">0</div>
                  <div class="text-gray-800 font-sans font-semibold">Jumlah Total</div>
                  <div class="text-right font-sans font-bold">76,000</div>
                </div>
          </div>
          <div class="row">
            <router-link to="/bill/print">
              <button type="button" class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">NEXT</button>
            </router-link>
          </div>
        </div>
        <div class="bottom-0 left-0 right-0 py-4 text-center ">
          <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
          <div class="flex justify-center space-x-4 mt-2">
          </div>
        </div>
      </div>
    </div>

</template>
  
<script>
export default {
  mounted() {
    for(let i = 0; i < 5; i++) {
      this.addUser();
    }
  },
  data() {
    return {
      users: [],  // Start with an empty user list
      emoticons: ["🐰", "😃", "🐸", "🐱", "🐶", "🦊", "🐼", "🐧", "🙉", "🦁", "😺", "🐷", "🐔", "🐮"], // Define your list of emoticons
      iconIndex: 0  // Keep track of which icon to use next
    };
  },
  methods: {
    addUser() {
      // Assign a new icon from the emoticon list (cycling through it)
      const icon = this.emoticons[this.iconIndex];
      this.iconIndex = (this.iconIndex + 1) % this.emoticons.length; // Update index in a loop

      // Generate a random hex color for background
      const bgColor = this.getRandomHexColor();

      // Add the new user to the users array
      this.users.push({
        name: bgColor,  // User can enter their name
        icon: icon,  // Assign an emoticon as the user's icon
        bgColor: bgColor  // Assign random background color
      });
    },
    getRandomHexColor() {
      // Generate a random hex color
      const hex = Math.floor(Math.random() * 0xffffff).toString(16);
      return `#${hex.padStart(6, '0')}`;  // Ensure 6-digit hex
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
