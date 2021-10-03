import http from "./http";
import { apiURL } from "./urlEndPoint.json";

export async function addProduct(product) {
  return await http.post(`${apiURL}products?req=addProduct`, product);
}

export async function updateProduct(product) {
  return await http.put(`${apiURL}products?req=updatingProduct`, product);
}

export async function deleteItem(itemID) {
  return await http.delete(
    `${apiURL}products?req=removeItem&productID=${itemID}`
  );
}
