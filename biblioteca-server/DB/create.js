import { Sequelize, client } from "./client.js";
import {
    livros,
    generos,
    autores,
    livros_autores,
    livros_generos,
} from "./structure.js";

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
        {
            titulo: "A revolução dos bichos",
            sinopse:
                "Uma sátira política sobre a Revolução Russa e o regime stalinista.",
            editora: "Editora ABC",
            views: 30000,
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

try {
    await client.sync({ force: true }).then(async () => {
        biblioteca.livros.map(async (livro) => {
            let generosLivro = livro.generos;
            let autoresLivro = livro.autores;

            const tmpGeneros = generosLivro.map(async (genero) => {
                return await generos.findOrCreate({
                    where: { nome: genero.nome },
                });
            });

            const tmpAutores = autoresLivro.map(async (autor) => {
                return await autores.findOrCreate({
                    where: { nome: autor.nome, sobrenome: autor.sobrenome },
                });
            });

            await livros
                .create(livro, {})
                .then(async (livroCriado) => {
                    tmpGeneros.map(async (genero) => {
                        await genero.then(async (genero) => {
                            await livroCriado.addGenero(genero[0]);
                        });
                    });
                    tmpAutores.map(async (autor) => {
                        await autor.then(async (autor) => {
                            await livroCriado.addAutore(autor[0]);
                        });
                    });
                });
        });
    });
} catch (error) {
    console.log(`Erro: ${error}`);
}

export { livros, generos, autores, livros_autores, livros_generos };
