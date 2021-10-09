import http from "./http";
import { apiURL } from "./urlEndPoint.json";

export async function addUser(user) {
  return await http.post(`${apiURL}users?req=addUser`, user);
}

export async function updateUser(user) {
  return await http.put(`${apiURL}users?req=updatingUser`, user);
}

export async function deleteUser(userID) {
  return await http.delete(`${apiURL}users?req=removeUser&userID=${userID}`);
}
