import { request } from "./networks";

const BASE_PATH = "/v1/entries";

export function createSubmission(
  formCode: string,
  data: {
    submission: string;
  }
) {
  return request({
    url: `${BASE_PATH}/submit/${formCode}`,
    method: "POST",
    data: data,
  });
}

export function getAllSubmissions(formCode: string) {
  return request({
    url: `${BASE_PATH}/submissions/${formCode}`,
    method: "GET",
  });
}
