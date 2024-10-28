//*Linked frontSocket with backend
import io from "socket.io-client";
import readline from "readline";  
// input.js

// Create an interface for input and output

// Create a readline interface  
const rl = readline.createInterface({  
  input: process.stdin,  
  output: process.stdout,  
});  

// Function to get user input  
function getUserInput() {  
  return new Promise((resolve) => {  
    rl.question("Enter tenant: ", (tenantId) => {  
      rl.question("Enter device: ", (deviceId) => {  
        resolve({ tenantId, deviceId });  
        rl.close();  
      });  
    });  
  });  
}  

// Call the function to get user input  
getUserInput().then(({ tenantId, deviceId }) => {  
  const socket = io(`http://localhost:5000/${tenantId}`, {  
    query: {  
      deviceId: deviceId,  
    },  
  });

  socket.on("reply", (msg) => {
    console.log(msg);
  });
});  