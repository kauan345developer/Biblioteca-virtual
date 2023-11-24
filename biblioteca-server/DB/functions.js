import client from "./client.js";
import { Op } from "sequelize";
import { livros, generos, autores, livros_generos, livros_autores } from "./structure.js";

async function getProductById(id) {
    return await produtos.findOne({ where: { id: id } });
}

async function getAllProducts() {
    return await produtos.findAll();
}

async function incrementView(id) {
    produtos.update(
        { views: client.literal("views + 1") },
        { where: { id: id } }
    );
}

async function incrementSell(id, quantity) {
    produtos.update(
        { vendas: client.literal(`vendas + ${quantity}`) },
        { where: { id: id } }
    );
}

export {
    getAllProducts,
    getProductById,
    incrementView,
    incrementSell
};
