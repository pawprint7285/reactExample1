import { handleResponse, handleError } from "../utilities/api/apiUtils";
const baseUrl = "/taxonomy/attributes/";
const baseCategoriesUrl = "/taxonomy/categories/";
const baseSearchCategory = "/taxonomy/categories/search";

export function getAssociate(attrId = "850999") {
  return fetch(baseUrl + (attrId || "") + "/associations/", {
    method: "GET", // POST for create, PUT to update when id already exists.
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "content-type": "application/json",
      "x-api-version": "v1",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getCategories(startId = "100000003001", limit = "188") {
  return fetch(baseCategoriesUrl + (startId || "") + "/" + (limit || ""), {
    method: "GET", // POST for create, PUT to update when id already exists.
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "content-type": "application/json",
      "x-api-version": "v1",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function searchCategory(name) {
  let withLastChar = "%25" + name + "%25";
  return fetch(baseSearchCategory + "/" + (withLastChar || ""), {
    method: "GET", // POST for create, PUT to update when id already exists.
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "content-type": "application/json",
      "x-api-version": "v1",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getCourses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  // pay attention to the course id, it is smart to set it here to be together with PUT method
  return fetch(baseUrl + (course.id || ""), {
    // the POST backend process creates a new one course obj and assigns it with a new id
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
