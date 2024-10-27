<template>
  <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
    <div class="w-full bg-white h-full">
      <!-- Content on body -->
      <div class="p-6">
        <div class="py-1 flex flex-col">
          <div class="text-2xl font-sans font-bold text-gray-700">Add item</div>
          <div class="text-sm font-sans font-semibold text-gray-500">Items after tapping a friend</div>
        </div>

        <!-- Dynamic User Avatars -->
        <div class="flex overflow-x-auto space-x-4 my-4">
          <div v-for="(user, index) in users" :key="index" class="relative">
            <div>
              <!-- Avatar with green border when active -->
              <div
                :class="['w-16 h-16 flex items-center justify-center rounded-full border-2', activeUserIndex === index ? 'border-green-500' : 'border-white']"
                :style="{ backgroundColor: user.bgColor }"
                @click="selectUser(index)"
              >
                <span class="text-3xl">{{ user.icon }}</span>
              </div>

              <!-- User Name -->
              <input
                v-model="user.name"
                class="mt-2 text-left text-sm focus:outline-none w-full"
                placeholder="Enter name"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- Bill Items Section -->
        <div v-for="(row, index) in rows" :key="index" class="pb-2">
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300">
          <div class="py-1">
            <div class="grid grid-cols-2 gap-4 py-2 pb-4">
              <span class="font-sans font-bold text-gray-700">{{ row.item }} *</span>
              <div class="text-right">
                <input
                  type="checkbox"
                  class="w-4 h-4 bg-customGreen border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600"
                  :checked="row.selectedUsers.includes(activeUserIndex)"
                  @change="toggleCheckbox(index)"
                />
              </div>
            </div>
            <div class="grid grid-cols-6 gap-4 py-1">
              <div class="col-span-3"></div>
              <div class="text-gray-400 font-semibold">{{ row.quantity }}x</div>
              <div class="col-span-2 text-right font-sans font-bold">{{ row.price.toLocaleString() }}</div>
            </div>

            <!-- Display selected avatars for each checked item -->
            <div v-if="row.selectedUsers.length > 0" class="flex space-x-2">
              <div v-for="userIndex in row.selectedUsers" :key="userIndex" 
                   class="w-11 h-11 flex items-center justify-center rounded-full border-2 border-white"
                   :style="{ backgroundColor: users[userIndex].bgColor }">
                <span class="text-xl">{{ users[userIndex].icon }}</span>
              </div>
            </div>
          </div>
        </div>
            
        <!-- Summary Section -->
        <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-gray-800 font-sans font-semibold">Subtotal</div>
          <div class="text-right font-sans font-bold">{{ subtotal.toLocaleString() }}</div>

          <div class="text-gray-800 font-sans font-semibold">Pajak</div>
          <div class="text-right font-sans font-bold">{{ tax.toLocaleString() }}</div>

          <div class="text-gray-800 font-sans font-semibold">Biaya Layanan</div>
          <div class="text-right font-sans font-bold">{{ additionalFee.toLocaleString() }}</div>

          <div class="text-gray-800 font-sans font-semibold">Diskon</div>
          <div class="text-right font-sans font-bold">{{ diskon.toLocaleString() }}</div>

          <div class="text-gray-800 font-sans font-semibold">Lainnya</div>
          <div class="text-right font-sans font-bold">{{ other.toLocaleString() }}</div>

          <div class="text-gray-800 font-sans font-semibold">Jumlah Total</div>
          <div class="text-right font-sans font-bold">{{ total.toLocaleString() }}</div>
        </div>

        <div class="row py-4">
          <!-- <router-link to="/bill/print">
            <button type="button" class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">NEXT</button>
          </router-link> -->
          <button 
              @click="savePrintData"
              type="button" 
              class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">
              NEXT
            </button>
        </div>
      </div>

      <div class="bottom-0 left-0 right-0 py-4 text-center ">
        <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
        <div class="flex justify-center space-x-4 mt-2"></div>
      </div>
    </div>
  </div>
</template>
  
<script>
// import { db } from '~/plugins/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      users: [], // Start with an empty user list
      billData: {}, // Initialize billData as an object or as needed
      rows: [], // Bill items
      tax: 0,
      additionalFee: 0,
      diskon: 0,
      other: 0,
      activeUserIndex: null, // To track the currently active user
    };
  },
  mounted() {
    // Retrieve the users data from localStorage when the component is mounted
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers); // Parse and set the users data
    } else {
      // Initialize with some default users if localStorage is empty
      this.users = [
        { name: "User 1", icon: "🐶", bgColor: "#AA4421" },
        { name: "User 2", icon: "🦁", bgColor: "#FFD700" },
      ];
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Retrieve the bill data (rows, tax, etc.) from localStorage
    const savedData = localStorage.getItem('billData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.rows = parsedData.rows || [];
      this.tax = parsedData.tax || 0;
      this.additionalFee = parsedData.additionalFee || 0;
      this.diskon = parsedData.diskon || 0;
      this.other = parsedData.other || 0;
    } else {
      // Default bill items
      this.rows = [
        { item: "Ayam Idup", price: 45000, quantity: 2, selectedUsers: [] },
        { item: "Nasi Goreng", price: 80000, quantity: 1, selectedUsers: [] },
      ];
      localStorage.setItem('billData', JSON.stringify(this.billData));
    }

    // Initialize each row's selectedUsers if not already set
    this.rows.forEach(row => {
      if (!row.selectedUsers) row.selectedUsers = [];
    });
  },
  methods: {
    selectUser(index) {
      // Set the active user without removing existing avatar assignments
      this.activeUserIndex = index;
    },
    toggleCheckbox(index) {
      // Toggle the checkbox state and add/remove the active user from the selectedUsers array
      const row = this.rows[index];
      const userIndex = this.activeUserIndex;

      if (userIndex !== null) {
        const userExists = row.selectedUsers.includes(userIndex);

        if (userExists) {
          // If the user is already assigned, remove them
          row.selectedUsers = row.selectedUsers.filter(id => id !== userIndex);
        } else {
          // Otherwise, add the user to the row
          row.selectedUsers.push(userIndex);
        }

        // Save the updated rows to localStorage
        this.saveBillData();
      }
    },
    saveBillData() {
      this.billData = {
        rows: this.rows,
        tax: this.tax,
        additionalFee: this.additionalFee,
        diskon: this.diskon,
        other: this.other,
      };
      // try {
      //   const docRef = await addDoc(collection(db, 'your_collection'), {
      //     billData: billData,
      //   });
      //   this.message = `Document written with ID: ${docRef.id}`;
      // } catch (e) {
      //   this.message = "Error adding document";
      // }
      // localStorage.setItem('billData', JSON.stringify(billData));
    },
    async savePrintData() {
      const id = uuidv4(); // Generate a unique ID
      try {
        await addDoc(collection(this.$db, 'billData'), { // Use this.$db
          id, // Store the UUID as an ID field
          name:'BillData',
          billData: this.billData,
          users: this.users
        });
        this.$router.push(`/bill/print?id=${id}`);
        // this.$router.push('/bill/print /iwant add id to this url');

      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Server error',
          text: 'Please try again later',
        });
        return;
      }
    }

  },
  computed: {
    activeUser() {
      return this.activeUserIndex !== null ? this.users[this.activeUserIndex] : null;
    },
    subtotal() {
      return this.rows.reduce((total, row) => total + row.quantity * row.price, 0);
    },
    total() {
      return this.subtotal + this.tax + this.additionalFee - this.diskon + this.other;
    },
  },
  watch: {
    // Whenever the tax, additionalFee, discount, or other charges change, save the data
    tax: 'saveBillData',
    additionalFee: 'saveBillData',
    diskon: 'saveBillData',
    other: 'saveBillData',
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
