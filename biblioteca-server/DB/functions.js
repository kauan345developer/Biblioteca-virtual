import client from "./client.js";
import { Op } from "sequelize";
import {
    livros,
    generos,
    autores,
    livros_generos,
    livros_autores,
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

export { getAllBooks, getBookById, incrementView, getBookByName };
