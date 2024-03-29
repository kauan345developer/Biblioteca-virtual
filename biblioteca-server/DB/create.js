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
import { activateBook } from "./functions.js";
import * as fs from "fs";

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
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Miguel",
                    sobrenome: "de Cervantes",
                },
            ],
            generos: [
                {
                    nome: "Ficção Científica",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
        {
            titulo: "1984",
            sinopse:
                "Um mundo distópico onde a vigilância governamental é onipresente.",
            editora: "Editora XYZ",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "George",
                    sobrenome: "Orwell",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Mistério",
                },
            ],
        },
        {
            titulo: "A revolução dos bichos",
            sinopse:
                "Uma sátira política sobre a Revolução Russa e o regime stalinista.",
            editora: "Editora ABC",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "George",
                    sobrenome: "Orwell",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Mistério",
                },
            ],
        },
        {
            titulo: "Crepúsculo",
            sinopse:
                "Uma história de amor entre uma humana e um vampiro, cheia de desafios e dilemas.",
            editora: "Editora QWE",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Stephenie",
                    sobrenome: "Meyer",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
        {
            titulo: "Lua Nova",
            sinopse:
                "A história continua com novos desafios quando a protagonista se vê diante de eventos sobrenaturais após a partida do vampiro.",
            editora: "Editora RST",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Stephenie",
                    sobrenome: "Meyer",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
        {
            titulo: "Eclipse",
            sinopse:
                "A tensão aumenta quando a protagonista se vê no meio de um conflito entre vampiros e lobisomens, enquanto sua jornada de amor proibido continua.",
            editora: "Editora UVW",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Stephenie",
                    sobrenome: "Meyer",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
        {
            titulo: "Amanhecer",
            sinopse:
                "O desfecho da saga traz revelações surpreendentes e desafios finais para a protagonista, explorando a complexidade do amor e da vida sobrenatural.",
            editora: "Editora XYZ",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Stephenie",
                    sobrenome: "Meyer",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
        {
            titulo: "A Menina que Roubava Livros",
            sinopse:
                "A história comovente de Liesel, uma jovem alemã durante a Segunda Guerra Mundial, que encontra consolo nos livros que ela rouba, e a Morte que observa sua jornada.",
            editora: "Editora ABC",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Markus",
                    sobrenome: "Zusak",
                },
            ],
            generos: [
                {
                    nome: "Drama",
                },
                {
                    nome: "Histórico",
                },
            ],
        },
        {
            titulo: "Mentes Brilhantes",
            sinopse:
                "Uma exploração fascinante das mentes de indivíduos excepcionalmente talentosos e criativos, revelando os segredos por trás de suas realizações extraordinárias.",
            editora: "Editora Brilliance",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Carolina",
                    sobrenome: "Gênio",
                },
            ],
            generos: [
                {
                    nome: "Psicologia",
                },
                {
                    nome: "Não Ficção",
                },
            ],
        },
        {
            titulo: "Viagem ao Centro da Terra",
            sinopse:
                "Uma emocionante aventura que segue o professor Otto Lidenbrock, seu sobrinho Axel e o guia Hans Belker em uma jornada extraordinária até as profundezas da Terra.",
            editora: "Editora Exploração",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Júlio",
                    sobrenome: "Verne",
                },
            ],
            generos: [
                {
                    nome: "Aventura",
                },
                {
                    nome: "Ficção Científica",
                },
            ],
        },
        {
            titulo: "A Ilha Misteriosa",
            sinopse:
                "Após um naufrágio, um grupo de sobreviventes encontra-se em uma ilha aparentemente deserta, mas cheia de mistérios e desafios para a sobrevivência.",
            editora: "Editora Enigma",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Júlio",
                    sobrenome: "Verne",
                },
            ],
            generos: [
                {
                    nome: "Aventura",
                },
                {
                    nome: "Mistério",
                },
            ],
        },
        {
            titulo: "Pinóquio",
            sinopse:
                "A história clássica de um boneco de madeira que sonha em se tornar um menino de verdade e as aventuras e desafios que enfrenta ao longo do caminho.",
            editora: "Editora Conto de Fadas",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Carlo",
                    sobrenome: "Collodi",
                },
            ],
            generos: [
                {
                    nome: "Fantasia",
                },
                {
                    nome: "Infantil",
                },
            ],
        },
        {
            titulo: "Cinderela",
            sinopse:
                "A clássica história de uma jovem que supera adversidades, com a ajuda de uma fada madrinha, para participar do baile real e conquistar o coração do príncipe encantado.",
            editora: "Editora Encanto",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Charles",
                    sobrenome: "Perrault",
                },
            ],
            generos: [
                {
                    nome: "Conto de Fadas",
                },
                {
                    nome: "Infantil",
                },
            ],
        },
        {
            titulo: "A Bela Adormecida",
            sinopse:
                "Um conto clássico sobre uma princesa amaldiçoada a dormir por cem anos até ser despertada pelo beijo do verdadeiro amor.",
            editora: "Editora Encantamento",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Irmãos",
                    sobrenome: "Grimm",
                },
            ],
            generos: [
                {
                    nome: "Conto de Fadas",
                },
                {
                    nome: "Infantil",
                },
            ],
        },
        {
            titulo: "Harry Potter e a Pedra Filosofal",
            sinopse:
                "A primeira emocionante aventura de Harry Potter, um jovem bruxo que descobre seu destino na Escola de Magia e Bruxaria de Hogwarts, enquanto enfrenta desafios e descobre a verdade sobre a Pedra Filosofal.",
            editora: "Editora Mágica",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "J.K.",
                    sobrenome: "Rowling",
                },
            ],
            generos: [
                {
                    nome: "Fantasia",
                },
                {
                    nome: "Aventura",
                },
            ],
        },
        {
            titulo: "Harry Potter e a Câmara Secreta",
            sinopse:
                "Harry Potter retorna para seu segundo ano em Hogwarts e descobre que algo misterioso está petrificando os alunos. Com a ajuda de seus amigos, ele investiga a Câmara Secreta para desvendar o mistério.",
            editora: "Editora Mágica",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "J.K.",
                    sobrenome: "Rowling",
                },
            ],
            generos: [
                {
                    nome: "Fantasia",
                },
                {
                    nome: "Aventura",
                },
            ],
        },
        {
            titulo: "Cinquenta Tons de Cinza",
            sinopse:
                "Um romance erótico que narra a relação entre a estudante universitária Anastasia Steele e o empresário Christian Grey, explorando temas de romance, erotismo e submissão.",
            editora: "Editora Sensualidade",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "E.L.",
                    sobrenome: "James",
                },
            ],
            generos: [
                {
                    nome: "Romance Erótico",
                },
                {
                    nome: "Drama",
                },
            ],
        },
        {
            titulo: "Perto do Coração Selvagem",
            sinopse:
                "Um romance introspectivo que explora a vida e as reflexões da protagonista, Joanna, enquanto ela navega pelos desafios da existência e busca compreender o sentido de sua própria natureza.",
            editora: "Editora Brasileira",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Clarice",
                    sobrenome: "Lispector",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Ficção",
                },
            ],
        },
        {
            titulo: "Laços de Família",
            sinopse:
                "Uma coletânea de contos que explora as complexidades e nuances das relações familiares, revelando as interações e emoções que conectam e, por vezes, afastam os membros de uma família.",
            editora: "Editora Brasileira",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Clarice",
                    sobrenome: "Lispector",
                },
            ],
            generos: [
                {
                    nome: "Contos",
                },
                {
                    nome: "Ficção",
                },
            ],
        },
        {
            titulo: "A Maçã no Escuro",
            sinopse:
                "A história de Martim, um homem que foge de casa após cometer um assassinato e passa a viver uma jornada existencial e introspectiva, explorando temas como identidade, culpa e solidão.",
            editora: "Editora Brasileira",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Clarice",
                    sobrenome: "Lispector",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Ficção",
                },
            ],
        },
        {
            titulo: "Grande Sertão: Veredas",
            sinopse:
                "Uma obra literária que explora as vastas paisagens do sertão brasileiro e narra as aventuras e conflitos de Riobaldo, um jagunço, em uma linguagem única e inovadora.",
            editora: "Editora Nacional",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Guimarães",
                    sobrenome: "Rosa",
                },
            ],
            generos: [
                {
                    nome: "Ficção",
                },
                {
                    nome: "Romance",
                },
            ],
        },
        {
            titulo: "Sagarana",
            sinopse:
                "Uma coletânea de contos que exploram a cultura e as tradições do sertão brasileiro, apresentando personagens marcantes e histórias que capturam a essência do interior do país.",
            editora: "Editora Brasileira",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "João",
                    sobrenome: "Guimarães Rosa",
                },
            ],
            generos: [
                {
                    nome: "Contos",
                },
                {
                    nome: "Ficção",
                },
            ],
        },
        {
            titulo: "Ou Isto ou Aquilo",
            sinopse:
                "Uma coletânea de poesias infantis que explora a imaginação, os sentimentos e as escolhas da infância, apresentando uma linguagem poética única e encantadora.",
            editora: "Editora Infantil",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Cecília",
                    sobrenome: "Meireles",
                },
            ],
            generos: [
                {
                    nome: "Poesia",
                },
                {
                    nome: "Infantil",
                },
            ],
        },
        {
            titulo: "Senhora",
            sinopse:
                "Um romance que aborda temas como o casamento por conveniência, o papel da mulher na sociedade e as complexidades das relações amorosas, ambientado no século XIX no Brasil.",
            editora: "Editora Romântica",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "José",
                    sobrenome: "de Alencar",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Regionalismo",
                },
            ],
        },
        {
            titulo: "Moby Dick",
            sinopse:
                "Um épico sobre a obsessão do capitão Ahab em caçar a lendária baleia branca Moby Dick, uma história que explora temas de vingança, loucura e a relação do homem com a natureza.",
            editora: "Editora Marítima",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Herman",
                    sobrenome: "Melville",
                },
            ],
            generos: [
                {
                    nome: "Romance",
                },
                {
                    nome: "Aventura",
                },
            ],
        },
        {
            titulo: "Billy Budd, Marinheiro",
            sinopse:
                "A história de Billy Budd, um jovem e ingênuo marinheiro que, devido a uma série de eventos infelizes, acaba se envolvendo em uma situação de conflito moral a bordo de um navio militar.",
            editora: "Editora Naval",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "Herman",
                    sobrenome: "Melville",
                },
            ],
            generos: [
                {
                    nome: "Novela",
                },
                {
                    nome: "Ficção Moral",
                },
            ],
        },
        {
            titulo: "Cinquenta Tons de Liberdade",
            sinopse:
                "O terceiro e último livro da trilogia 'Cinquenta Tons de Cinza', que continua a história de Christian Grey e Anastasia Steele enquanto enfrentam desafios, segredos e buscam a liberdade em seu relacionamento.",
            editora: "Editora Sensualidade",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "E.L.",
                    sobrenome: "James",
                },
            ],
            generos: [
                {
                    nome: "Romance Erótico",
                },
                {
                    nome: "Drama",
                },
            ],
        },
        {
            titulo: "Cinquenta Tons Mais Escuros",
            sinopse:
                "No segundo livro da trilogia 'Cinquenta Tons de Cinza', a relação entre Christian Grey e Anastasia Steele se aprofunda, enquanto enfrentam desafios do passado e novas ameaças que colocam seu amor à prova.",
            editora: "Editora Sensualidade",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            autores: [
                {
                    nome: "E.L.",
                    sobrenome: "James",
                },
            ],
            generos: [
                {
                    nome: "Romance Erótico",
                },
                {
                    nome: "Drama",
                },
            ],
        },
        {
            titulo: "De Onde Vem o Frio (Estações Vol. 1)",
            sinopse:
                "De Onde Vem o Frio não é uma história sobre hockey. É sobre descobertas, amor, sobre preconceito, sobre se sentir em casa mesmo quando se está a quilômetros de distância.",
            editora: "Editora ABC",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            disponivel: true,
            autores: [
                {
                    nome: "Beatriz",
                    sobrenome: "Garcia",
                },
            ],
            generos: [
                {
                    nome: "Ficção Científica",
                },
                {
                    nome: "Romance",
                },
            ],
        },
        {
            titulo: "O enigma dos dados",
            sinopse:
                "Prepare-se para conhecer um mundo de enigmas e encantamentos... Isaac Samus tem uma louvável habilidade com números. Aos treze anos, ele foi capaz de desvendar a enigmática mensagem do grande matemático Euclides e isso lhe permitiu possuir a moeda de ouro de Enigma e os Dados de Euclides, um dos sete lendários Objetos de Poder. Com a moeda e os dados, Isaac é capaz de prever o futuro, mas isso não é o bastante para prepará-lo para a jornada em busca do segundo Objeto de Poder: o Cubo de Random.",
            editora: "Principis",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            disponivel: false,
            autores: [
                {
                    nome: "Marcos",
                    sobrenome: "Mota",
                },
            ],
            generos: [
                {
                    nome: "Ficção Científica",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
        {
            titulo: "Coroa de sombras",
            sinopse:
                "Se prepare para mergulhar nas intrigas da corte (e do coração) neste enemies to lovers que conquistou o TikTok. Alessandra Stathos está cansada de ser subestimada, mas ela tem o plano perfeito para conquistar mais poder:",
            editora: "Planeta Minotauro",
            views: randomNumber(1, 1000),
            vendas: randomNumber(1, 100),
            disponivel: true,
            autores: [
                {
                    nome: "Tricia",
                    sobrenome: "Levenseller",
                },
            ],
            generos: [
                {
                    nome: "Ficção Científica",
                },
                {
                    nome: "Fantasia",
                },
            ],
        },
    ],
    usuarios: [
        {
            nome: "João",
            email: "joao@gmail.com",
            senha: "joao123",
            admin: true,
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
                where: { nome: autor.nome, sobrenome: autor.sobrenome },
            });
            await createdLivro.addAutores(createdAutor);
        }

        for (const genero of livro.generos) {
            const [createdGenero, boolean] = await generos.findOrCreate({
                where: { nome: genero.nome },
            });
            await createdLivro.addGeneros(createdGenero);
        }
    }

      for (const usuario of biblioteca.usuarios) {
        const createdUsuario = await usuarios.create(usuario);

        // await createdUsuario.addLivros(
        //   await livros.findOne({ where: { id: randomNumber(1, 31) } })
        // );
      }
    await client.close();
} catch (error) {
    console.log(error);
}
