import client from "./client.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
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

// Função para obter um usuário pelo e-mail
export const getUserByEmail = async (email, senha) => {
    try {
      const user = usuarios.find((usuario) => usuario.email === email);
  
      if (user && await bcrypt.compare(senha, user.senha)) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário por e-mail:", error);
      throw error;
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
      usuarios.push(novoUsuario);
  
      return novoUsuario;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  };

export { getAllBooks, getBookById, incrementView, getBookByName };
