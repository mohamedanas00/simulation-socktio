import deviceModel from "../../db/model/device.js";
import logsModel from "../../db/model/logs.js";

export const getBranchDevices = async (branchId) => {
  const devices = await deviceModel.find({ branchId: branchId }, { _id: 1 });
  return devices;
};

export const addTOLogs = async (
  devices,
  collection_name,
  data,
  httpMethod,
  tenant_id
) => {
  await logsModel.create({
    collection_name,
    data,
    httpMethod,
    devices,
    tenant_id,
  });
};

export const handleLogs = async (tenantId, deviceId) => {
  const result = await logsModel.find({tenant_id: tenantId, devices: {$in: [deviceId]}});
  // console.log("ss:", result);
  return result;
};

export const getAllDevicesByTenant = async (tenantId) => {
  const devices = await deviceModel.find({ tenant_id: tenantId }, { _id: 1 });
  return devices;
};
