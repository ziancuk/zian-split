<template>
  <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
    <div class="w-full bg-white h-full">
      <div class="flex flex-col pt-3 px-3">
        <svg xmlns="http://www.w3.org/2000/svg" @click="goBack" width="2.2em" height="2.2em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h14M5 12l6 6m-6-6l6-6" />
        </svg>
      </div>

      <!-- content on body -->
      <div class="flex flex-col p-6">
        <div class="pb-5">
          <div class="text-xl font-sans font-semibold text-gray-700">Detail yang terbaca</div>
          <div class="text-sm font-sans font-semibold text-gray-500">Pastikan semua detail sudah terbaca dengan benar</div>
        </div>

        <!-- Editable Rows -->
        <div class="p-4 outline outline-offset-2 outline-1 outline-gray-200">
          <span class="text-lg font-sans font-bold text-gray-700">{{ formattedDateTime }}</span>
          <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300">

          <!-- Dynamic Rows -->
          <div v-for="(row, index) in rows" :key="index" class="py-1">
            <div class="flex justify-between items-center">
              <span class="font-sans font-bold text-gray-700"></span>
              <button @click="deleteRow(index)" class="text-red-500 text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg></button>
            </div>
            <div class="grid grid-cols-6 gap-4 py-2 pb-4">
              <div class="col-span-3">
                <input v-model="row.item" type="text" class="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <input v-model="row.quantity" type="number" min="1" class="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div class="col-span-2 text-right">
                <input v-model="row.price" type="number" min="0" class="w-full border border-gray-300 p-2 rounded text-right" />
              </div>
            </div>
            <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-300">
          </div>

          <!-- Add Row Button -->
           <div class="flex justify-content text-blue-700 cursor-pointer font-semibold" @click="addRow">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="1.3em" height="1.3em" viewBox="0 0 50 50"><path fill="currentColor" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="currentColor" d="M16 24h18v2H16z"/><path fill="currentColor" d="M24 16h2v18h-2z"/></svg>
            <span class="text-sm  rounded">Add Row</span>
           </div>

          <!-- Subtotal, Tax, and Total -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="text-gray-400 font-sans font-semibold">Subtotal</div>
            <div class="text-right font-sans font-bold">
              <input type="number" min="0" v-model="subtotal" class="w-full text-right bg-transparent focus:outline-none border-b-2 border-gray-200" disabled/>
            </div>

            <div class="text-gray-400 font-sans font-semibold">Pajak</div>
            <div class="text-right font-sans font-bold">
              <input type="number" min="0" v-model="tax" class="w-full text-right bg-transparent focus:outline-none border-b-2 border-gray-200" />
            </div>

            <div class="text-gray-400 font-sans font-semibold">Biaya Layanan</div>
            <div class="text-right font-sans font-bold">
              <input type="number" min="0" v-model="additionalFee" class="w-full text-right bg-transparent focus:outline-none border-b-2 border-gray-200" />
            </div>

            <div class="text-gray-400 font-sans font-semibold">Diskon</div>
            <div class="text-right font-sans font-bold">
              <input type="number" min="0" v-model="diskon" class="w-full text-right bg-transparent focus:outline-none border-b-2 border-gray-200" />
            </div>

            <div class="text-gray-400 font-sans font-semibold">Lainnya</div>
            <div class="text-right font-sans font-bold">
              <input type="number" min="0" v-model="other" class="w-full text-right bg-transparent focus:outline-none border-b-2 border-gray-200" />
            </div>

            <div class="text-gray-400 font-sans font-semibold">Jumlah Total</div>
            <div class="text-right font-sans font-bold">
              <input type="number" min="0" v-model="total" class="w-full text-right bg-transparent focus:outline-none border-b-2 border-gray-200" disabled/>

            </div>
          </div>

        </div>

        <!-- Action Buttons -->
        <div class="row">
          <div class="py-4">
            <!-- <router-link to="/bill/people">
              <button type="button" class="text-white bg-gray-500 hover:bg-gray-900 font-medium rounded-lg text-sm p-5 py-2.5 me-2 mb-2 focus:outline-none w-full">Ubah Bill</button>
            </router-link> -->
            <button @click="saveToLocalStorage" type="button" class="text-white bg-customGreen font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full hover:bg-green-800">Konfirmasi</button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bottom-0 left-0 right-0 py-4 text-center">
        <p class="text-gray-600">© 2024 Ziancuks. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      rows: [

      ],
      // tax: 0,
      additionalFee: 0,
      diskon: 0,
      other: 0,
      currentDateTime: new Date(),
    };
  },
  computed: {
    subtotal() {
      return this.rows.reduce((total, row) => total + row.quantity * row.price, 0);
    },
    tax() {
      return this.subtotal * 0.1; // 10% tax
    },
    total() {
      console.log(this.tax)
      return this.subtotal + this.tax + this.additionalFee - this.diskon + this.other;
    },
    formattedDateTime() {
      // Formatting the date to DD/MM/YYYY HH:mm
      const date = this.currentDateTime;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
  },
  mounted() {
    localStorage.clear();

    const savedData = localStorage.getItem('billData');
    if (savedData && savedData != 'undefined') {
      console.log(savedData)
      const parsedData = JSON.parse(savedData);
      this.rows = parsedData.rows;
      this.tax = parsedData.tax;
      this.additionalFee = parsedData.additionalFee;
      this.diskon = parsedData.diskon;
      this.other = parsedData.other;
      this.total = parsedData.total;
    }
    
    // Update current date and time every minute
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 60000);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    addRow() {
      this.rows.push({ item: '', quantity: 1, price: 0 });
    },
    deleteRow(index) {
      this.rows.splice(index, 1);
    },
    saveToLocalStorage() {
      const data = {
        rows: this.rows,
        tax: this.tax,
        additionalFee: this.additionalFee,
        diskon: this.diskon,
        other: this.other,
        total: this.total,
        dateTime: this.formattedDateTime,
      };

      // Save data to localStorage as a JSON string
      localStorage.setItem('billData', JSON.stringify(data));
      this.$router.push('/bill/people');
    }
  }
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
