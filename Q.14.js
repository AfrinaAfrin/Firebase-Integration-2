
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

 
const paginateUsers = async (page, itemsPerPage = 5) => {
  if (page < 1 || itemsPerPage < 1) {
    console.error("Invalid page number or items per page.");
    return;
  }

  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      console.log("No user data found.");
      return;
    }

    const users = Object.values(snapshot.val());
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    if (page > totalPages) {
      console.error(`Invalid page number. There are only ${totalPages} pages.`);
      return;
    }

     
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    
    const usersOnPage = users.slice(startIndex, endIndex);

    console.log(`Page ${page} of ${totalPages}:`, usersOnPage);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

 
paginateUsers(1);  
paginateUsers(2);  
paginateUsers(0);  
