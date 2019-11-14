import { handleResponse, handleError } from "../utilities/api/apiUtils";
const baseCategoriesUrl = "/taxonomy/categories/";
const baseSearchCategory = "/taxonomy/categories/search";

export function getCategory(
    catId = "105397",
    page = "1",
    limit = "1000000000"
) {
    // pay attention to the course id, it is smart to set it here to be together with PUT method
    return fetch(
        baseCategoriesUrl + (catId || "") + "/" + (page || "") + "/" + (limit || ""),
        {
            // the POST backend process creates a new one course obj and assigns it with a new id
            method: "GET", // POST for create, PUT to update when id already exists.
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "content-type": "application/json",
                "x-api-version": "v1",
                "Access-Control-Allow-Headers":
                    "X-Requested-With, content-type, Authorization"
            }
        }
    )  .then(handleResponse)
    .catch(handleError);
   
      
}


// export function getCategories(startId = "100000003001", limit = "188") {
//     return fetch(baseCategoriesUrl + (startId || "") + "/" + (limit || ""), {
//       method: "GET", // POST for create, PUT to update when id already exists.
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//         "content-type": "application/json",
//         "x-api-version": "v1",
//         "Access-Control-Allow-Headers":
//           "X-Requested-With, content-type, Authorization"
//       }
//     })
//       .then(handleResponse)
//       .catch(handleError);
//   }
  
//   export function searchCategory(name) {
//     let withLastChar = "%25" + name + "%25";
//     return fetch(baseSearchCategory + "/" + (withLastChar || ""), {
//       method: "GET", // POST for create, PUT to update when id already exists.
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//         "content-type": "application/json",
//         "x-api-version": "v1",
//         "Access-Control-Allow-Headers":
//           "X-Requested-With, content-type, Authorization"
//       }
//     })
//       .then(handleResponse)
//       .catch(handleError);
//   }