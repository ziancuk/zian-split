<template>
  <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
    <div class="w-full bg-white h-full">
      <div class="p-6" :style="{ backgroundColor: 'rgb(243 244 246/var(--tw-bg-opacity))!important' }">
        <div class="py-5 flex flex-col">
          <div class="text-xl font-sans font-semibold text-gray-500">TOTAL AMOUNT</div>
          <div class="text-3xl font-sans font-bold text-gray-700">Rp {{ total.toLocaleString() }}</div>
        </div>
        
        <div v-for="(user, userIndex) in users" :key="userIndex" class="my-4">
          <!-- <div v-for="(item, itemIndex) in getUserItems(userIndex)" :key="item.item"> -->
            <div class="grid grid-cols-4">
              <div class="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white"
                  :style="{ backgroundColor: user.bgColor }">
                <span class="text-3xl">{{ user.icon }}</span>
              </div>
              <div class="flex flex-col col-span-3">
                <span class="font-sans font-bold text-gray-700">{{ user.name }}</span>
                <!-- <span class="font-sans font-bold text-gray-700 text-2xl">Rp {{ getUserTotal(userIndex).toLocaleString() }}</span> -->
                <span class="font-sans font-bold text-gray-700 text-2xl">
                  Rp {{ userTotals[userIndex].toLocaleString() }}
                </span>
              </div>
            </div>
          <!-- </div> -->

          <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">

          <!-- Loop through items for each user -->
          <div v-for="(item, itemIndex) in getUserItems(userIndex)" :key="itemIndex">
            <div class="grid grid-cols-6 gap-4 py-2 pb-4">
              <div class="col-span-3 font-sans font-bold text-lg">{{ item.item }} *</div>
              <div class="text-gray-300 font-semibold text-lg">x{{ item.quantity >= item.selectedUsers.length ? Math.floor(item.quantity / item.selectedUsers.length) : item.quantity }}</div>
              <div class="col-span-2 text-right font-sans font-bold text-lg">Rp {{ Math.floor(item.price * (item.quantity / item.selectedUsers.length)).toLocaleString() }}</div>
            </div>

            <div v-if="itemIndex === getUserItems(userIndex).length - 1">
              <div class="grid grid-cols-2">
                <div class="text-gray-600">Bill Details</div>
                <div @click="toggleAccordion(userIndex + '-' + itemIndex)" class="cursor-pointer text-right font-sans font-bold text-lg">
                  <span :class="{ 'rotate-180': isOpen(userIndex + '-' + itemIndex) }" class="transition-transform duration-200 text-gray-300">▼</span>
                </div>
              </div>

              <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">

              <!-- Accordion Content for Bill Details -->
              <div v-if="isOpen(userIndex + '-' + itemIndex)" class="mt-2">
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-gray-500">+ Tax</div>
                  <div class="text-right">Rp {{ Math.floor(getUserTax(userIndex, item)).toLocaleString() }}</div>
                  <div class="text-gray-500">+ Service charge</div>
                  <div class="text-right">Rp {{ Math.floor(additionalFeeUser).toLocaleString() }}</div>
                  <div class="text-gray-500">+ Discounts</div>
                  <div class="text-right">Rp {{ Math.floor(discount).toLocaleString() }}</div>
                  <div class="text-gray-500">+ Others</div>
                  <div class="text-right">Rp {{ Math.floor(otherFees).toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4 text-center">
          <!-- <button type="button" class="text-white bg-gray-300 hover:bg-gray-600 font-medium rounded-lg text-sm p-5 py-2.5 me-2 mb-2 focus:outline-none w-full">Share</button> -->
          <button
            type="button"
            class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800"
            @click="copyLink"
          >
            Copy Link
          </button>
        </div>
        <div class="bottom-0 left-0 right-0 py-4 text-center">
          <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocs, collection, query, where } from 'firebase/firestore'; // Import necessary functions
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      users: [],  // Will be populated from local storage
      tax: 0, // Dynamic tax value from local storage
      additionalFee: 0, // Service charge
      discount: 0, // Discount
      otherFees: 0, // Other charges
      accordionOpen: {},  // Accordion state for each item
    };
  },
  async mounted() {
    this.loadDataFromFirestore();
  },
  methods: {
    copyLink() {
      const url = window.location.href; // Get the current URL
      navigator.clipboard.writeText(url) // Copy the URL to the clipboard
        .then(() => {
          Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Link copied to clipboard!',
        });
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    },

    async loadDataFromFirestore() {
      // Get the ID from the URL query parameters
      const id = this.$route.query.id;

      if (!id) {
        console.error("No ID found in the URL");
        return;
      }

      try {
        // Create a query to filter by the specific ID
        const q = query(collection(this.$db, 'billData'), where('id', '==', id));
        const querySnapshot = await getDocs(q);
        const printData = [];

        querySnapshot.forEach((doc) => {
          printData.push({ id: doc.id, ...doc.data() });
        });

        if (printData.length === 0) {
          console.warn("No documents found with the provided ID.");
          return
        }
        const storedBillData = printData[0].billData || {};
        const storedUsers = printData[0].users || [];

        // Assigning values from billData
        this.tax = Number(storedBillData.tax) || 0;
        this.additionalFee = Number(storedBillData.additionalFee) || 0;
        this.additionalFeeUser = storedBillData.additionalFee 
        ? Number(storedBillData.additionalFee) / (storedUsers.length || 1) 
        : 0;
        this.discount = Number(storedBillData.diskon) || 0;
        this.otherFees = Number(storedBillData.other) || 0;

        // Set users
        this.users = storedUsers.map(user => ({
          ...user,
          items: [] // Initialize items for each user
        })); 

      // Populate items for each user based on selectedUsers in rows
      storedBillData.rows.forEach(item => {
        item.selectedUsers.forEach(userIndex => {
          this.users[userIndex].items.push(item);
        });
      });

      } catch (error) {
        console.error("Error fetching document: ", error);
      }

    },
    getUserTotal(userIndex) {
      let userTotal = 0;
      const items = this.getUserItems(userIndex);
      items.forEach(item => {
        userTotal += item.quantity * item.price;
      });
      return userTotal + this.getUserTax(userIndex);
    },
    getUserItems(userIndex) {
      return this.users[userIndex].items || [];
    },
    getUserTax(userIndex) {
      
      const subtotal = this.getUserItems(userIndex).reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      // Calculate tax based on subtotal
      return (this.tax * subtotal) / (this.getTotalWithoutTax() || 1);
    },
    getTotalWithoutTax() {
      let total = 0;
      this.users.forEach(user => {
        total += user.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      });
      return total;
    },
    getTotalAmount() {
      let total = 0;
      this.users.forEach((user, index) => {
        total += this.userTotals[index]// Example action; replace with actual logic
      });
      // this.users.forEach(user => {
      //   total += user.items.reduce((sum, item) => item.quantity >= sum + (item.price), 0);
      // });
      return total;
    },
    toggleAccordion(itemIdentifier) {
      // Toggle the state by directly updating the object
      this.accordionOpen[itemIdentifier] = !this.accordionOpen[itemIdentifier];
    },
    isOpen(itemIdentifier) {
      return !!this.accordionOpen[itemIdentifier];
    },
  },
  computed: {
    total() {
      return this.getTotalAmount();
    },
    userTotals() {
      return this.users.map((user, userIndex) => {
        let userTotal = 0;
        const items = this.getUserItems(userIndex);
        items.forEach(item => {
          userTotal += (item.quantity  / item.selectedUsers.length) * item.price;
        });
        return userTotal + this.getUserTax(userIndex) + this.additionalFeeUser - this.discount + this.otherFees;
      });
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
