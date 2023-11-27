import { Sequelize, client } from "./client.js";
import {
    livros,
    generos,
    autores,
    usuarios,
    livros_autores,
    livros_generos,
    usuarios_livros,
} from "./structure.js";

function randomNumber(x, y) {
    return Math.floor(Math.random() * y) + x;
}

const biblioteca = {
    livros: [
        {
            titulo: "Dom Quixote",
            sinopse:
                "Um cavaleiro idealista e seu fiel escudeiro embarcam em aventuras absurdas.",
            editora: "Editora ABC",
            views: 15000,
            autores: [
                {
                    nome: "Miguel de Cervantes",
                },
            ],
            generos: [
                {
                    nome: "Ficção Científica",
                    descricao:
                        "Exploração de conceitos científicos e tecnológicos em tramas imaginativas.",
                },
                {
                    nome: "Fantasia",
                    descricao:
                        "Envolvimento de elementos mágicos, seres sobrenaturais ou mundos imaginários.",
                },
            ],
        },
        {
            titulo: "1984",
            sinopse:
                "Um mundo distópico onde a vigilância governamental é onipresente.",
            editora: "Editora XYZ",
            views: 22000,
            autores: [
                {
                    nome: "George Orwell",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                    descricao:
                        "Narrativas centradas em relacionamentos interpessoais e emoções.",
                },
                {
                    nome: "Mistério",
                    descricao:
                        "Enredos com elementos de suspense e resolução de enigmas.",
                },
            ],
        },
        {
            titulo: "A revolução dos bichos",
            sinopse:
                "Uma sátira política sobre a Revolução Russa e o regime stalinista.",
            editora: "Editora ABC",
            views: 30000,
            autores: [
                {
                    nome: "George Orwell",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                    descricao:
                        "Narrativas centradas em relacionamentos interpessoais e emoções.",
                },
                {
                    nome: "Mistério",
                    descricao:
                        "Enredos com elementos de suspense e resolução de enigmas.",
                },
            ],
        },
    ],
    usuarios: [
        {
            nome: "João",
            email: "joao@gmail.com",
            senha: "joao123",
        },
        {
            nome: "Maria",
            email: "maria@gmail.com",
            senha: "maria123",
        },
        {
            nome: "José",
            email: "jose@gmail.com",
            senha: "jose123",
        },
    ],
};

try {
    await client.sync({ force: true });
    for (const livro of biblioteca.livros) {
        const createdLivro = await livros.create(livro);

        for (const autor of livro.autores) {
            const [createdAutor, boolean] = await autores.findOrCreate({
                where: { nome: autor.nome },
            });
            await createdLivro.addAutores(createdAutor);
        }

        for (const genero of livro.generos) {
            const [createdGenero, boolean] = await generos.findOrCreate({
                where: { nome: genero.nome, descricao: genero.descricao },
            });
            await createdLivro.addGeneros(createdGenero);
        }
    }
    await client.close();
} catch (error) {
    console.log(error);
}
