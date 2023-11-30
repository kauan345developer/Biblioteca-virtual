import client from "./client.js";
import { Op, where } from "sequelize";
import bcrypt from "bcrypt";

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
}

async function getBookById(id) {
    return await livros.findOne({ where: { id: id } });
}

async function incrementView(id) {
    livros.update(
        { views: client.literal("views + 1") },
        { where: { id: id } }
    );
}

async function getBookByName(name, limit) {
    return await livros.findAll({
        where: {
            titulo: {
                [Op.iLike]: `%${name}%`,
            },
        },
        limit: limit,
    });
}

async function getMostSoldBooks(limit) {
    return await livros.findAll({
        limit: limit,
        order: [["vendas", "DESC"]],
    });
}

async function activateBook(id) {
    livros.update({ disponivel: true }, { where: { id: id } });
}

async function deactivateBook(id) {
    livros.update({ disponivel: false }, { where: { id: id } });
}

async function deleteBook(id) {
    livros.destroy({ where: { id: id } });
    usuarios_livros.destroy({ where: { livroId: id } });
}

// relacionados a usuario
// Função para obter um usuário pelo e-mail
export const getUserByEmail = async (email) => {
    try {
        const user = usuarios.findOne({ where: { email: email } });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar usuário por e-mail:", error);
        // throw error;
    }
};

// Função para criar um novo usuário
export const createUser = async ({ nome, email, senha }) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new Error("Este e-mail já está cadastrado");
        }

        const novoUsuario = { nome, email, senha };
        usuarios.create(novoUsuario);

        return novoUsuario;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
};

async function addBookToUser(bookId, userId) {
    return await usuarios
        .findOne({ where: { id: userId } })
        .then(async (createdUsuario) => {
            createdUsuario.addLivros(
                await livros.findOne({ where: { id: bookId } })
            );
        });
}

async function getAllBooksFromUser(userId) {
    return await usuarios
        .findOne({ where: { id: userId } })
        .then(async (createdUsuario) => {
            return await createdUsuario.getLivros();
        });
}

async function checkIfUserHasBook(userId, bookId) {
    await usuarios.findOne({ where: { userId: userId } }).then((user) => {
        
    });
}

export {
    getAllBooks,
    getBookById,
    getMostSoldBooks,
    activateBook,
    deactivateBook,
    deleteBook,
    incrementView,
    getBookByName,
    addBookToUser,
    getAllBooksFromUser,
};
