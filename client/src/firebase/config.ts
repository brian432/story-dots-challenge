// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
const firebaseConfig = {
  apiKey: 'AIzaSyCsGi30Z0Wqvf3fnsHBQ50qQoOGAsF6hZg',
  authDomain: 'storydots-images.firebaseapp.com',
  projectId: 'storydots-images',
  storageBucket: 'storydots-images.appspot.com',
  messagingSenderId: '937151273077',
  appId: '1:937151273077:web:8fbc47c94bb86aeefec03c'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export const uploadFiles = async (file: any): Promise<string> => {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef, file)
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}
