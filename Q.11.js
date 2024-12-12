 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

 
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "https://your-database-url.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

 
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

 
 
const searchUsers = async (searchTerm) => {
  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      console.log("No user data found.");
      return;
    }

    const users = snapshot.val();
    const searchResults = Object.values(users).filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("Search Results:", searchResults);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const searchTerm = "john"; 
searchUsers(searchTerm);
