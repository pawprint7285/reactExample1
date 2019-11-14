import { handleResponse, handleError } from "../utilities/api/apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

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
