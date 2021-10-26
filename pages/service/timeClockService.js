import http from "./http";
import { apiURL } from "./urlEndPoint.json";

export async function startShift(userPin) {
  return await http.post(
    `${apiURL}timeClock?req=startShift&userPin=${userPin}`
  );
}

export async function endShift(userPin) {
  return await http.post(`${apiURL}timeClock?req=endShift&userPin=${userPin}`);
}

export async function updateShift(shiftID) {
  return await http.put(`${apiURL}timeClock?req=updateShift`, shiftID);
}

export async function deleteShift(shiftID) {
  return await http.delete(
    `${apiURL}timeClock?req=deleteShift&shiftID=${shiftID}`
  );
}

export async function addShift(userPinNumber, startTime, endTime) {
  return await http.post(`${apiURL}timeClock?req=addShift`, {
    userPinNumber,
    startTime,
    endTime,
  });
}
