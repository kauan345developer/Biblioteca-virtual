import { Sequelize, client } from "./client.js";
import {
    livros,
    generos,
    autores,
    livros_autores,
    livros_generos,
} from "./structure.js";

function randomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

try {
    await client.sync({ force: true });
    console.log(`Tables criadas`);
} catch (error) {
    console.log(`Erro: ${error}`);
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
                    nome: "Miguel",
                    sobrenome: "de Cervantes",
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
                    nome: "George",
                    sobrenome: "Orwell",
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
};

let promiseAutores;
let promiseGeneros;
let promiseLivros;

try {
    await client
        .sync({ force: true })
        .then(async () => {
            promiseLivros = biblioteca.livros.map(async (livro) => {
                await livros.create(livro, {
                    include: [generos, autores],
                });
            });
        })
        .then(async () => {
            await Promise.all(promiseLivros);

            // teste
            await console.log(
                (await livros.findAll({ include: [generos, autores] }))
            );

            await client.close();
        })
        .then(async () => {
            console.log(`Tables criadas`);
        });
} catch (error) {
    console.log(`Erro: ${error}`);
}

export { livros, generos, autores, livros_autores, livros_generos };
