import logsModel from "../../db/model/logs.js";
import SocketStore from "./ConnectedManager.js";
import {
  addTOLogs,
  getAllDevicesByTenant,
  getBranchDevices,
  handleLogs,
} from "./dataHandler.js";

export default (io) => {
  /// -> /^\/\w+$/
  io.of(/^\/[a-f0-9-]+$/).on("connection", (socket) => {
    const deviceId = socket.handshake.query.deviceId;
    let tenantId = socket.nsp.name;
    console.log("connected");
    console.log("tenant id", tenantId);
    tenantId = tenantId.replace("/", "");
    if (deviceId) {
      console.log(`DeviceID: ${deviceId} Connected`);
      SocketStore.addDevice(tenantId, deviceId, socket);
      lossMessage(tenantId, deviceId);
    } else {
      console.log(`Socket ID: ${socket.id}`);
    }

    socket.on("messages", (msg) => {
      console.log(msg);
      io.emit("reply", `${msg} from server`);
    });

    socket.on("disconnect", () => {
      console.log(`Device: ${deviceId} Disconnected`);
      SocketStore.removeDevice(tenantId, deviceId);      
    });
  });
};

export async function onMessage(
  collection_name,
  data,
  httpRequest,
  tenantId,
  branchId
) {
  let devicesSockets = SocketStore.getAllSockets(tenantId);
  const notFoundDevicesIds = [];
  const foundDevicesIds = [];

  // console.log("devicesSockets", devicesSockets);

  if (branchId) {
    console.log("----- Branch Devices -----");
    let branchDevices = await getBranchDevices(branchId);
    branchDevices = branchDevices.map((d) => {
      return d._id.toString();
    });
    for (const device of branchDevices) {  
      if (devicesSockets.size > 0 && devicesSockets.has(device)) {  
        foundDevicesIds.push(device);  
      } else {  
        notFoundDevicesIds.push(device);  
      }  
    } 
  } else {
    console.log("----- All Devices -----");
    let allDevices = await getAllDevicesByTenant(tenantId);
    console.log("allDevices", allDevices);
    
    allDevices = allDevices.map((d) => {
      return d._id.toString();
    });        
    // console.log("Device sockets",devicesSockets);
    // console.log("device",SocketStore.getSocket(tenantId,"670f87cf14f103d94ec779fb"));
    console.log("deviceSocket",devicesSockets.size);
    
    for (const deviceID of allDevices) {  
      if (devicesSockets.size > 0 && devicesSockets.has(deviceID)) {
        foundDevicesIds.push(deviceID);  
      } else {  
        notFoundDevicesIds.push(deviceID);  
      }  
    } 
  }
  
  console.log("notFoundDevicesIds", notFoundDevicesIds);
  console.log("foundDevicesIds", foundDevicesIds);
  //*save log for disconnected devices
  if(notFoundDevicesIds.length > 0){
    addTOLogs(notFoundDevicesIds, collection_name, data, httpRequest, tenantId);
  }
  
  //*send change to connected devices
  for (let i = 0; i < foundDevicesIds.length; i++) {
    const socket = SocketStore.getSocket(tenantId, foundDevicesIds[i]);
    socket.emit("reply", { collection_name, httpRequest, data });
  }
}

export async function lossMessage(tenantId, deviceId) {
  console.log('tenantIda',tenantId);
  console.log('deviceIda',deviceId);
  
  const socket = SocketStore.getSocket(tenantId, deviceId);
  const data = await handleLogs(tenantId, deviceId);
  // console.log('data',data);
  
  if (data.length > 0) {
    // console.log(data);
    // Assuming socket is already defined and connected 
    data.forEach((item) => {
      const { collection_name, httpMethod, data } = item;
      socket.emit("reply", { collection_name, httpMethod, data });
    });

    await logsModel.updateMany(
      { devices: { $in: [deviceId] } }, // Find all logs that contain the specific deviceId
      { $pull: { devices: deviceId } } // Pull (remove) the specific deviceId from the devices array
    );

    await logsModel.deleteMany({ devices: { $size: 0 } }); // Match documents where devices array has size 0
  }
  return 0;
}
