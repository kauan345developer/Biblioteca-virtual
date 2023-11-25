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
    await client
        .sync({ force: true })
        .then(async () => {
            biblioteca.livros.map(async (livro) => {
                let generosLivro = livro.generos;
                let autoresLivro = livro.autores;

                generosLivro.map(async (genero) => {
                    return await generos.findOrCreate({
                        where: {
                            nome: genero.nome,
                            descricao: genero.descricao,
                        },
                    });
                });

                autoresLivro.map(async (autor) => {
                    return await autores.findOrCreate({
                        where: { nome: autor.nome, sobrenome: autor.sobrenome },
                    });
                });

                await livros.create(livro, {}).then(async (livroCriado) => {
                    generosLivro.map(async (genero) => {
                        await livroCriado.addGenero(genero[0]);
                    });
                    autoresLivro.map(async (autor) => {
                        await livroCriado.addAutore(autor[0]);
                    });
                });
            });
        })
        .then(async () => {
            biblioteca.usuarios.map(async (usuario) => {
                await usuarios
                    .create(usuario, {})
                    .then(async (usuarioCriado) => {
                        await usuarioCriado.addLivro(
                            await livros.findOne({
                                where: { id: randomNumber(1, 3) },
                            })
                        );
                    });
            });
        })
} catch (error) {
    console.log(`Erro: ${error}`);
}
