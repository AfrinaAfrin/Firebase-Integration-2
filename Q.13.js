 
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

 
const filterUsersByEmailDomain = async (domain) => {
  if (!domain) {
    console.error("Please provide a valid email domain.");
    return;
  }

  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      console.log("No user data found.");
      return;
    }

    const users = snapshot.val();
    const filteredUsers = Object.values(users).filter(user =>
      user.email.endsWith(domain)
    );

    if (filteredUsers.length === 0) {
      console.log(`No users found with email domain: ${domain}`);
    } else {
      console.log("Filtered Users:", filteredUsers);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

 
const emailDomain = "@example.com";  
filterUsersByEmailDomain(emailDomain);
