<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
      <div class="w-full bg-white h-full">
        <!-- content on body -->
        <div class="p-6">
          <div class="py-5 flex flex-col">
            <div class="text-2xl font-sans font-bold text-gray-700">Choose Friends</div>
            <div class="text-sm font-sans font-semibold text-gray-500">Add your friends who will be included in the split bill</div>
          </div>
          <!-- list picture rounded here -->
          <div>
            <!-- Add Friend Button -->
            <button 
              @click="addUser" 
              class="flex items-center px-4 py-2 border rounded-full bg-gray-100 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                  <circle cx="10" cy="8" r="4" />
                  <path d="M15.796 20.447a6 6 0 0 0-11.592 0M19 10v6m3-3h-6" />
                </g>
              </svg>
              <span class="px-2">Add a friend </span>
            </button>

            <!-- Dynamic User Avatars -->
            <div class="grid grid-cols-4 my-4">
            <!-- <div class="flex overflow-x-auto space-x-4 my-4"> -->
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
                     placeholder="Enter name"
                   />
   
                   <!-- Remove Button (X) -->
                   <button 
                     @click="removeUser(index)" 
                     class="absolute top-0 right-0 bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center">
                     &times;
                   </button>
                 </div>
              </div>
            </div>
          </div>
          <div class="row">
            <button 
              @click="saveUsersAndRedirect"
              type="button" 
              class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">
              NEXT
            </button>
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
      users: [],  // Start with an empty user list
      emoticons: ["🐰", "😃", "🐸", "🐱", "🐶", "🦊", "🐼", "🐧", "🙉", "🦁", "😺", "🐷", "🐔", "🐮"], // Define your list of emoticons
      iconIndex: 0  // Keep track of which icon to use next
    };
  },
  methods: {
      addUser() {
      // Check if there is any user with an empty name
      const hasEmptyName = this.users.some(user => user.name.trim() === '');

      if (hasEmptyName) {
        // Show SweetAlert if the previous user's name is not filled in
        Swal.fire({
          icon: 'error',
          title: 'Name Required',
          text: 'Please enter a name before adding another friend.',
        });
        return;
      }

      if (this.users.length >= 14) {
        // Show SweetAlert if the limit is reached
        Swal.fire({
          icon: 'warning',
          title: 'Maximum Limit Reached',
          text: 'You can only add up to 14 friends!',
        });
        return;
      }

      // Assign a new icon from the emoticon list (cycling through it)
      const icon = this.emoticons[this.iconIndex];
      this.iconIndex = (this.iconIndex + 1) % this.emoticons.length; // Update index in a loop

      // Generate a random hex color for background
      const bgColor = this.getRandomHexColor();

      // Add the new user to the users array
      this.users.push({
        name: '',  // User can enter their name
        icon: icon,  // Assign an emoticon as the user's icon
        bgColor: bgColor  // Assign random background color
      });
    },
    removeUser(index) {
      // Remove the user from the list
      this.users.splice(index, 1);
    },
    getRandomHexColor() {
      // Generate a random hex color
      const hex = Math.floor(Math.random() * 0xffffff).toString(16);
      return `#${hex.padStart(6, '0')}`;  // Ensure 6-digit hex
    },
    saveUsersAndRedirect() {
      // Check if all users have names filled
      const hasEmptyName = this.users.some(user => user.name.trim() === '');
      if (hasEmptyName) {
        Swal.fire({
          icon: 'error',
          title: 'Name Required',
          text: 'Please fill in all names before proceeding.',
        });
        return;
      }

      // Save users to localStorage
      localStorage.setItem('users', JSON.stringify(this.users));

      // Redirect to bill/assign
      this.$router.push('/bill/assign');
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
