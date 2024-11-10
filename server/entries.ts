import { Bank } from "@/types/bank";
import { request } from "./networks";

const BASE_PATH = "/v1/entries";

export function updateEntry(id: string, data: Bank) {
  return request({
    url: `${BASE_PATH}/update/${id}`,
    method: "PATCH",
    data: data,
  });
}
