import client from "./client.js";
import { Op } from "sequelize";
import {
    livros,
    generos,
    autores,
    usuarios,
    livros_generos,
    livros_autores,
    usuarios_livros,
} from "./structure.js";

async function getAllBooks() {
    return await livros.findAll();
};

async function getBookById(id) {
    return await livros.findOne({ where: { id: id } });
};

async function incrementView(id) {
    livros.update(
        { views: client.literal("views + 1") },
        { where: { id: id } }
    );
};

async function getBookByName(name, limit) {
    return await livros.findAll({
        where: {
            titulo: {
                [Op.iLike]: `%${name}%`,
            },
        },
        limit: limit,
    });
};

// relacionados a usuario
async function addBookToUser(bookId, userId) {
    return await usuarios
        .findOne({ where: { id: userId } })
        .then(async (createdUsuario) => {
            createdUsuario.addLivros(
                await livros.findOne({ where: { id: bookId } })
            );
        });
};

async function getAllBooksFromUser(userId) {
    return await usuarios
        .findOne({ where: { id: userId } })
        .then(async (createdUsuario) => {
            return await createdUsuario.getLivros();
        });
};

async function checkUserHasBook(userId, bookId) {

};

export {
    getAllBooks,
    getBookById,
    incrementView,
    getBookByName,
    addBookToUser,
    getAllBooksFromUser,
};
