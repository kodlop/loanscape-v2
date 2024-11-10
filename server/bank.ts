import { Bank } from "@/types/bank";
import { request } from "./networks";

const BASE_PATH = "/v1/bank";

export function addBank(data: Bank) {
  return request({
    url: `${BASE_PATH}/create`,
    method: "POST",
    data: data,
  });
}

export function getBankById(id: string) {
  return request({
    url: `${BASE_PATH}/details/${id}`,
    method: "GET",
  });
}

export function updateBank(id: string, data: Bank) {
  return request({
    url: `${BASE_PATH}/update/${id}`,
    method: "PATCH",
    data: data,
  });
}

export function deleteBank(id: string) {
  return request({
    url: `${BASE_PATH}/delete/${id}`,
    method: "DELETE",
  });
}

export function getAllBanks() {
  return request({
    url: `${BASE_PATH}/all`,
    method: "GET",
  });
}
