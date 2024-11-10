import { Form } from "@/types/form";
import { request } from "./networks";

const BASE_PATH = "/v1/form";

export function createForm(data: Form) {
  return request({
    url: `${BASE_PATH}/create`,
    method: "POST",
    data: data,
  });
}

export function getAllForms() {
  return request({
    url: `${BASE_PATH}/all`,
    method: "GET",
  });
}

export function getFormByFormCode(code: string) {
  return request({
    url: `${BASE_PATH}/code/${code}`,
    method: "GET",
  });
}

export function updateFormById(id: string, data: Form) {
  return request({
    url: `${BASE_PATH}/update/${id}`,
    method: "PATCH",
    data: data,
  });
}
