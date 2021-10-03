import http from "./http";
import { apiURL } from "./urlEndPoint.json";

export async function addProduct(product) {
  return await http.post(`${apiURL}products?req=addProduct`, product);
}

export function updateProduct(product) {
  return await http.put(`${apiUrl}products?req=updatingProduct`, product);
}

export function deleteItem(itemID) {
  return await http.delete(
    `${apiUrl}products?req=removeItem&productID=${itemID}`
  );
}
