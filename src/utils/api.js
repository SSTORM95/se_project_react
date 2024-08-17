const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function addNewItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { getItems, addNewItem, deleteItem };
