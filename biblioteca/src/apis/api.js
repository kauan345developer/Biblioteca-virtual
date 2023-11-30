// frontend/src/utils/api.js
const API_BASE_URL = "http://localhost:3000";

async function getAllBooks() {
  const response = await fetch(`${API_BASE_URL}/api/books/searchById/a`);
  return await response.json();
}

async function getBookById(id) {
  const response = await fetch(`${API_BASE_URL}/api/books/searchById/${id}`);
  return await response.json();
}

// Adicione outras funções para as chamadas à API

async function getMostSold() {
  const response = await fetch(`${API_BASE_URL}/api/books/mostSold?limit=12`);
  return await response.json();
}

async function searchByName(name) {
  const response = await fetch(
    `${API_BASE_URL}/api/books/searchByName/${name}?limit=4`
  );
  return await response.json();
}

async function userHasBook(userID, bookID) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/checkIfUserHasBook/${userID}/${bookID}`
  );
  return await response.json();
}

async function userBookShelf(userID) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/getAllBooksFromUser/${userID}`
  );
  return await response.json();
}

async function userToken(token) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/checkIfUserIsLoggedIn/${token}`
  );
  return await response.json();
}

async function addBookToUser(bookID, userID) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/addBookToUser/${bookID}/${userID}`,
    { method: "POST" } // Adicionado este objeto de opções
  );
  return await response;
}

async function isLogged(token) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/checkIfUserIsLoggedIn/${token}`
  );
  return await response.json();
}

export {
  getAllBooks,
  getBookById,
  getMostSold,
  searchByName,
  userHasBook,
  userBookShelf,
  userToken,
  addBookToUser,
  isLogged
};
