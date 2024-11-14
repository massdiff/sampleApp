
# React Native Setup with Firebase and Axios

This README provides instructions for setting up a React Native app using Expo, Axios, and Firebase to interact with the REST API.

## Prerequisites

Ensure you have the following installed:
- **Node.js and npm**: [Install Node.js](https://nodejs.org/)
- **Expo CLI**: [Install Expo CLI](https://docs.expo.dev/get-started/installation/)
  ```bash
  npm install -g expo-cli
  ```

## Steps

### 1. Initialize React Native App with Expo

1. **Create a New Expo Project**:
   ```bash
   expo init MyApp
   cd MyApp
   ```

2. **Start the Expo Development Server**:
   ```bash
   npx expo start
   ```

### 2. Install Dependencies

1. **Install Axios**:
   ```bash
   npm install axios
   ```

2. **Install Firebase SDK** (for Firebase Authentication, Firestore, etc.):
   ```bash
   npm install firebase
   ```

### 3. Set Up Firebase in React Native

1. **Initialize Firebase**:
   - Create a new file `firebaseConfig.js` in your project and add your Firebase configuration from the Firebase Console.

   ```javascript
   import firebase from 'firebase/app';
   import 'firebase/firestore';
   import 'firebase/auth';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   }

   export const db = firebase.firestore();
   export default firebase;
   ```

2. **Verify Firebase Setup**:
   - Add `console.log(db)` in `firebaseConfig.js` and run the app to ensure Firebase initializes correctly.

### 4. Implement Axios API Calls in React Native

1. **Create a Screen to Fetch Data**:
   - In your `screens` folder (create one if it doesn't exist), add `HomeScreen.js`:

   ```javascript
   import React, { useEffect, useState } from 'react';
   import { View, Text, FlatList } from 'react-native';
   import axios from 'axios';

   const HomeScreen = () => {
     const [users, setUsers] = useState([]);

     useEffect(() => {
       axios.get('http://localhost:3000/getUsers')
         .then(response => setUsers(response.data))
         .catch(error => console.log(error));
     }, []);

     return (
       <View>
         <Text>Users:</Text>
         <FlatList
           data={users}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => <Text>{item.name}</Text>}
         />
       </View>
     );
   };

   export default HomeScreen;
   ```

2. **Add Navigation** (optional but recommended):
   - Install React Navigation:
     ```bash
     npm install @react-navigation/native
     npm install @react-navigation/stack
     ```
   - Wrap your app in a navigation container and set up navigation for `HomeScreen`.

### 5. Run and Test

1. **Start the Expo Project**:
   ```bash
   npx expo start
   ```

2. **Test on a Physical Device or Simulator**:
   - Open the Expo Go app on your mobile device or run the simulator to test the API call.

3. **Verify Firebase and API Calls**:
   - Ensure data from your Firebase-enabled backend appears on the `HomeScreen`.

### Notes

- **CORS Issues**: You may need to configure your backend to allow CORS requests from mobile.
- **Localhost Testing**: Use your machine's IP instead of `localhost` for mobile testing.

