<template>
    <div class="mobile-view flex h-screen bg-customGreen justify-center items-center">
      <div class="px-6 text-center">
        <h1 class="text-4xl font-bold text-white mb-4">Coming Soon!</h1>
        <p class="text-lg text-white mb-6">We’re working hard to bring you this feature. Stay tuned!</p>
        <div class="flex justify-center mb-8">
          <router-link to="/home">

          <a  
            class="bg-white text-customGreen hover:bg-green-600 hover:text-white transition duration-300 px-4 py-2 rounded-lg shadow-lg"
          >
            Go Back Home
          </a>
          </router-link>
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
    methods: {
      // Add any methods if needed
    },
  };
  </script>
  
  <style scoped>
  .mobile-view {
    width: 400px; /* Adjust width as necessary */
    margin: 0 auto; /* Centers the mobile view horizontally */
  }
  .carousel-item {
    transition: transform 0.5s ease;
  }
  </style>
  