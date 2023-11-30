// frontend/src/utils/api.js
const API_BASE_URL = 'http://localhost:3000';

async function getAllBooks() {
  const response = await fetch(`${API_BASE_URL}/api/books/searchById/a`);
  return await response.json();
}

async function getBookById(id) {
  const response = await fetch(`${API_BASE_URL}/api/books/searchById/${id}`);
  return await response.json();
}

// Adicione outras funções para as chamadas à API

async function getMostSold(){
  const response = await fetch(`${API_BASE_URL}/api/books/mostSold?limit=12`);
  return await response.json();
}


async function searchByName(name){
  const response = await fetch(`${API_BASE_URL}/api/books/searchByName/${name}?limit=4`);
  return await response.json();
}

export { getAllBooks, getBookById,getMostSold,searchByName };
