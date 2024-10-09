<template>
    <div class="mobile-view flex h-screen bg-customGreen flex-col items-center">
      <div class="px-3 py-8 text-left w-full flex justify-content">
        <svg xmlns="http://www.w3.org/2000/svg" @click="goBack" width="2.2em" height="2.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" class="text-white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/></svg>
        <span class="text-2xl pl-2 font-sans tracking-tight font-semibold text-white">
            Select Type
        </span>
      </div>
      <div class="w-full bg-white" style="border-radius: 45px 45px 0px 0px ; height: 100%;">
        <!-- content on body -->
        <div class="flex flex-col justify-content items-center p-5">
            <!-- Take A Picture Card -->
            <!-- <div @click="openCameraModal" class="w-full m-4 bg-white rounded-lg border-[0.5px] flex hover:bg-gray-300 cursor-pointer">
                <div class="grid grid-cols-3 gap-4">
                    <div class="p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="170" height="120" viewBox="0 0 24 24">
                        <path fill="currentColor" class="fill-gray-400" d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m0 2l-.09.008a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.009a.5.5 0 0 0-.402.402l-.008.09l.008.09a.5.5 0 0 0 .402.402l.09.008H17v2.503l.008.09a.5.5 0 0 0 .402.402l.09.008l.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18h2.504l.09-.007a.5.5 0 0 0 .402-.402l.008-.09l-.008-.09a.5.5 0 0 0-.403-.402l-.09-.008H18v-2.5l-.008-.09a.5.5 0 0 0-.402-.403zM13.925 2.504a2.25 2.25 0 0 1 1.94 1.11l.814 1.387h2.071A3.25 3.25 0 0 1 22 8.25v4.56a6.5 6.5 0 0 0-1.499-1.077L20.5 8.25a1.75 1.75 0 0 0-1.75-1.75h-2.5a.75.75 0 0 1-.647-.37l-1.032-1.757a.75.75 0 0 0-.646-.37h-3.803a.75.75 0 0 0-.574.268l-.065.09L8.39 6.142a.75.75 0 0 1-.639.358h-2.5A1.75 1.75 0 0 0 3.5 8.25v9.5c0 .966.784 1.75 1.75 1.75h6.063c.173.533.412 1.037.709 1.5H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073zM12 8a4.5 4.5 0 0 1 4.283 3.114q-.752.144-1.433.449A2.999 2.999 0 0 0 9 12.5c0 1.43 1 2.625 2.338 2.927a6.5 6.5 0 0 0-.31 1.467A4.501 4.501 0 0 1 12 8.001"/>
                    </svg>
                    </div>
                    <div class="col-span-2 flex items-center">
                    <div class="flex-col">
                        <span class="px-2 text-gray-500 font-semibold">Take A Picture</span>
                        <p class="px-2 text-sm text-gray-500">You can take a picture for scan your image</p>
                    </div>
                    </div>
                </div>
            </div> -->

            <!-- Select Image Card -->
            <div @click="openFileModal" class="w-full m-4 bg-white rounded-lg border-[0.5px] flex hover:bg-gray-300 cursor-pointer">
                <div class="grid grid-cols-3 gap-4">
                    <div class="p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="170" height="120" viewBox="0 0 24 24">
                        <path fill="currentColor" class="fill-gray-400" d="M4 6v12h16V6zm0-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m3.5 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M7 14l2-2l2 2l4-4l3 3v3H7z"/>
                    </svg>
                    </div>
                    <div class="col-span-2 flex items-center">
                    <div class="flex-col">
                        <span class="px-2 text-gray-500 font-semibold">Select Image</span>
                        <p class="px-2 text-sm text-gray-500">You can select image on your gallery</p>
                    </div>
                    </div>
                </div>
            </div>
            <div class="w-full m-4 bg-white rounded-lg border-[0.5px] flex hover:bg-gray-300 cursor-pointer">
            <router-link to="/bill">

                <div class="grid grid-cols-3 gap-4">
                    <div class="p-2 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="170" height="120" viewBox="0 0 24 24">
                            <path fill="currentColor" class="fill-gray-400" fill-rule="evenodd" d="M7.099 1.25H16.9c1.017 0 1.717 0 2.306.204a3.8 3.8 0 0 1 2.348 2.412l-.713.234l.713-.234c.196.597.195 1.307.195 2.36v14.148c0 1.466-1.727 2.338-2.864 1.297a.196.196 0 0 0-.271 0l-.484.442c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0l-.483-.442a.196.196 0 0 0-.272 0c-1.137 1.04-2.864.169-2.864-1.297V6.227c0-1.054 0-1.764.195-2.361a3.8 3.8 0 0 1 2.348-2.412c.59-.205 1.289-.204 2.306-.204m.146 1.5c-1.221 0-1.642.01-1.96.121A2.3 2.3 0 0 0 3.87 4.334c-.111.338-.12.784-.12 2.036v14.004c0 .12.059.192.134.227a.2.2 0 0 0 .11.018a.2.2 0 0 0 .107-.055a1.695 1.695 0 0 1 2.296 0l.483.442a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0l.483-.442a1.695 1.695 0 0 1 2.296 0c.043.04.08.052.108.055a.2.2 0 0 0 .109-.018c.075-.035.135-.108.135-.227V6.37c0-1.252-.01-1.698-.12-2.037a2.3 2.3 0 0 0-1.416-1.462c-.317-.11-.738-.12-1.959-.12zM6.25 7.5A.75.75 0 0 1 7 6.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 11a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="col-span-2 flex items-center">
                        <div class="flex-col">
                            <span class="px-2 text-gray-500 font-semibold">Create Manual</span>
                            <p class="px-2 text-sm text-gray-500">You can create manual with blank form</p>
                        </div>
                    </div>
                </div>
              </router-link>
            </div>
            <!-- Camera Modal -->
            <!-- <div v-if="isCameraModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/2">
                    <h2 class="text-xl font-bold mb-4">Camera</h2>
                    <div v-if="isLoading" class="flex justify-center">
                      <div class="loader"></div>
                    </div>
                    <div v-if="errorMessage" class="error-message text-red-700">
                        {{ errorMessage }}
                    </div>
                    <div v-if="!errorMessage">
                      <video v-show="!isLoading" ref="video" class="w-full h-auto" autoplay></video>
                    </div>

                    <div v-if="errorMessage" class="mt-4 flex justify-end">
                      <button @click="takePicture" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Take Picture</button>
                    </div>
                    <div class="mt-4 flex justify-end">
                      <button @click="closeCameraModal" class="bg-customGreen text-white px-4 py-2 rounded hover:bg-gray-700">Close</button>
                    </div>
                </div>
            </div> -->

            <!-- File Selection Modal -->
            <div v-if="isFileModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div class="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/2">
                <h2 class="text-xl font-bold mb-4">Select Image</h2>

                <div class="flex items-center justify-center w-full" v-if="!selectedImage">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
                    </div>
                    <input id="dropzone-file" type="file" @change="onFileSelected" class="hidden" />
                  </label>
                </div>

                <!-- Show selected image and remove button -->
                <div v-if="selectedImage" class="relative">
                  <img :src="selectedImage" alt="Selected" class="w-full h-64 object-cover rounded-lg" />
                  <button @click="removeImage" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2">
                    ✕
                  </button>
                </div>

                <!-- Conditionally show the Upload button only if there is a selected image -->
                  <div class="mt-4 flex justify-end">
                    <div v-if="selectedImage">
                      <router-link to="/bill">
                        <button class="bg-customGreen text-white m-1 px-4 py-2 rounded hover:bg-gray-700">Upload</button>
                      </router-link>
                    </div>
                    <button @click="closeFileModal" class="bg-gray-400 text-white m-1 px-4 py-2 rounded hover:bg-gray-700">Close</button>
                  </div>
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
    isCameraModalOpen: false,
      isFileModalOpen: false,
      isLoading: false,  // Added isLoading variable
      selectedFile: null, // Stores the selected file
      selectedImage: null,  // New property to hold the image data URL
      errorMessage: '',
    };
  },
  methods: {
    // openCameraModal() {
    //   this.isLoading = true;  // Set loading to true when opening the camera
    //   this.isCameraModalOpen = true;

    //     this.startCamera();  // Start the camera after 2 seconds (simulate camera initialization)
    // },
    // closeCameraModal() {
    //   this.isCameraModalOpen = false;
    //   this.stopCamera();  // Stop the camera when closing the modal
    // },
    openFileModal() {
      this.isFileModalOpen = true;
     
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage() {
      this.selectedImage = null;
    },
    closeFileModal() {
      this.isFileModalOpen = false;
    },
    // async startCamera() {
    //   try {
    //     this.isLoading = true; // Show loading icon
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //     this.$refs.video.srcObject = stream;
    //     this.isLoading = false; // Hide loading icon once the stream is ready
    //   } catch (error) {
    //     this.errorMessage = 'Failed to access the camera. Please check your permissions or try a different browser.';
    //     this.isLoading = false;
    //   }
    // },
    // stopCamera() {
    //   if(this.$refs.video) {
    //     const stream = this.$refs.video.srcObject;
    //     if (stream) {
    //       const tracks = stream.getTracks();
    //       tracks.forEach(track => track.stop());
    //     }
    //   }
    // },
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
