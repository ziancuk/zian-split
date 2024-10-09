<template>
  <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
    <div class="w-full bg-white h-full">
      <div class="p-6">
        <div class="py-5 flex flex-col">
          <div class="text-xl font-sans font-semibold text-gray-500">TOTAL AMOUNT</div>
          <div class="text-3xl font-sans font-bold text-gray-700">Rp {{ total.toLocaleString() }}</div>
        </div>
        
        <div v-for="(user, userIndex) in users" :key="userIndex" class="my-4">
          <div class="grid grid-cols-4">
            <div class="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white"
                 :style="{ backgroundColor: user.bgColor }">
              <span class="text-3xl">{{ user.icon }}</span>
            </div>
            <div class="flex flex-col col-span-3">
              <span class="font-sans font-bold text-gray-700">{{ user.name }}</span>
              <span class="font-sans font-bold text-gray-700 text-2xl">Rp {{ getUserTotal(userIndex).toLocaleString() }}</span>
            </div>
          </div>

          <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">

          <!-- Loop through items for each user -->
          <div v-for="(item, itemIndex) in getUserItems(userIndex)" :key="itemIndex">
            <div class="grid grid-cols-6 gap-4 py-2 pb-4">
              <div class="col-span-3 font-sans font-bold text-lg">{{ item.item }} *</div>
              <div class="text-gray-300 font-semibold text-lg">x{{ item.quantity }}</div>
              <div class="col-span-2 text-right font-sans font-bold text-lg">{{ (item.price * item.quantity).toLocaleString() }}</div>
            </div>

            <div class="grid grid-cols-2">
              <div class="text-gray-300">Bill Details</div>
              <div @click="toggleAccordion(userIndex + '-' + itemIndex)" class="cursor-pointer text-right font-sans font-bold text-lg">
                <span :class="{ 'rotate-180': isOpen(userIndex + '-' + itemIndex) }" class="transition-transform duration-200 text-gray-300">▼</span>
              </div>
            </div>

            <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">

            <!-- Accordion Content for Bill Details -->
            <div v-if="isOpen(userIndex + '-' + itemIndex)" class="mt-2">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-gray-500">+ Tax</div>
                <div class="text-right">Rp {{ getUserTax(userIndex, item).toLocaleString() }}</div>
                <div class="text-gray-500">+ Service charge</div>
                <div class="text-right">Rp {{ additionalFee.toLocaleString() }}</div>
                <div class="text-gray-500">+ Discounts</div>
                <div class="text-right">Rp {{ discount.toLocaleString() }}</div>
                <div class="text-gray-500">+ Others</div>
                <div class="text-right">Rp {{ otherFees.toLocaleString() }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4 grid grid-cols-2 gap-4">
          <button type="button" class="text-white bg-gray-300 hover:bg-gray-600 font-medium rounded-lg text-sm p-5 py-2.5 me-2 mb-2 focus:outline-none w-full">Share</button>
          <button type="button" class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">Copy Link</button>
        </div>
        <div class="fixed bottom-0 left-0 right-0 py-4 text-center">
          <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
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
      users: [],  // Will be populated from local storage
      tax: 0, // Dynamic tax value from local storage
      additionalFee: 0, // Service charge
      discount: 0, // Discount
      otherFees: 0, // Other charges
      accordionOpen: {},  // Accordion state for each item
    };
  },
  mounted() {
    this.loadDataFromLocalStorage();
  },
  methods: {
    loadDataFromLocalStorage() {
      const storedBillData = JSON.parse(localStorage.getItem('billData')) || {};
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Assigning values from billData
      this.tax = Number(storedBillData.tax) || 0;
      this.additionalFee = Number(storedBillData.additionalFee) || 0;
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
    getUserTax(userIndex, item) {
      const subtotal = this.getUserTotal(userIndex);
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
    toggleAccordion(itemIdentifier) {
      this.$set(this.accordionOpen, itemIdentifier, !this.accordionOpen[itemIdentifier]);
    },
    isOpen(itemIdentifier) {
      return !!this.accordionOpen[itemIdentifier];
    },
  },
  computed: {
    total() {
      return this.getTotalWithoutTax() + this.tax + this.additionalFee - this.discount + this.otherFees;
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
