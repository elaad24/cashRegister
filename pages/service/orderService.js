import http from "./http";
import { apiURL } from "./urlEndPoint.json";

export async function placeOrder(orderList) {
  return await http.post(`${apiURL}orders?req=newOrder`, orderList);
}

export default {
  placeOrder,
};
