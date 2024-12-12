 
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
 
const ITEMS_PER_PAGE = 5;  

let currentPage = 1;  
let allUsers = [];  
 
const fetchUsers = async () => {
  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      console.log("No user data found.");
      return [];
    }

    return Object.values(snapshot.val());
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

 
const displayPage = (page) => {
  const totalUsers = allUsers.length;
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  if (page < 1 || page > totalPages) {
    console.error("Invalid page number.");
    return;
  }

   
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

   
  const usersToDisplay = allUsers.slice(startIndex, endIndex);

  
  console.log(`Page ${page} Users:`, usersToDisplay);

   
  currentPage = page;
};

 
const nextPage = () => {
  displayPage(currentPage + 1);
};

 
const prevPage = () => {
  displayPage(currentPage - 1);
};

 
const initializePagination = async () => {
  allUsers = await fetchUsers();  
  if (allUsers.length === 0) {
    console.log("No users to display.");
    return;
  }

  displayPage(currentPage); 
};

initializePagination();

 