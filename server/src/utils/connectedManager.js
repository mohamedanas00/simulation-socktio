const tenantsMap = new Map();

const SocketStore = {
  addDevice(tenantId, deviceId, socket) {
    if (!tenantsMap.has(tenantId)) {
      tenantsMap.set(tenantId, {
        name: tenantId.substring(1),
        devices: new Map(),
      });
    }
    tenantsMap.get(tenantId).devices.set(deviceId, socket);
  },
  removeDevice(tenantId, deviceId) {
    console.log("R.TenantId",tenantId);
    
    if (tenantsMap.has(tenantId)) {
      tenantsMap.get(tenantId).devices.delete(deviceId);
      console.log("Remove Device",tenantsMap.get(tenantId).devices.size);
      
    }
  },
  hasDevice(tenantId, deviceId) {
    if (tenantsMap.has(tenantId)) {
      return tenantsMap.get(tenantId).devices.has(deviceId);
    }
    return false;
  },
  getSocket(tenantId, deviceId) {
    if (tenantsMap.has(tenantId)) {
      return tenantsMap.get(tenantId).devices.get(deviceId);
    }
    return null;
  },
  getAllSockets(tenantId) {
    if (tenantsMap.has(tenantId)) {
      return tenantsMap.get(tenantId).devices;
    }
    return [];
  },
};

export default SocketStore;
