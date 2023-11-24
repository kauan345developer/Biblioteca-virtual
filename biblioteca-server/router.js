import express, { json } from "express";
import cors from "cors";
import {

} from "./DB/functions.js";
import { error } from "console";
import { livros } from "./DB/structure.js";
import { Sequelize } from "sequelize";

const app = express();

app.use(cors());
app.use(json());

app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            await getAllProducts()
                .then((query) => {
                    return query.map((product) => {
                        return product.dataValues;
                    });
                })
                .then((query) => {
                    res.status(200).send(query);
                });
        } else {
            await getProductById(id).then((query) => {
                res.status(200).send(query);
            });
        }
    } catch {
        console.log(error);
    }
});

app.get("/api/products/incrementView/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await incrementView(id);
        res.status(200).send("ok");
    } catch {
        console.log(error);
    }
});

app.get("/api/productsSearch", async (req, res) => {
    const { name } = req.query;
    let { limit } = req.query;
    if (isNaN(limit)) limit = 1;

    await getProductsByName(name, limit).then(async (query) => {
        res.status(200).send(query);
    });
});

// filtros

app.get("/api/productsFilters/mostViewed", async (req, res) => {
    // produtos mais vistos
    const { limit } = req.query;
    try {
        const query = await getProductsMostViewed(limit);
        const query2 = [];
        query.forEach((product) => query2.push(product.dataValues));
        res.status(200).send(query);
    } catch {
        console.log(error);
    }
});

app.get("/api/productsFilters/mostSold", async (req, res) => {
    // produtos mais vendidos
    const { limit } = req.query;
    try {
        const query = await getProductsMostSold(limit);
        const query2 = [];
        query.forEach((product) => query2.push(product.dataValues));
        res.status(200).send(query);
    } catch {
        console.log(error);
    }
});

app.get("/api/productsFilters/leastStock", async (req, res) => {
    // produtos com menos estoque disponível
    const { limit } = req.query;
    try {
        const query = await getProductsLeastStock(limit);
        const query2 = [];
        query.forEach((product) => query2.push(product.dataValues));
        res.status(200).send(query);
    } catch {
        console.log(error);
    }
});

app.get("/api/products/universe/:universe", async (req, res) => {
    const universe = req.params.universe;

    try {
        const query = await GetProductByUniverse(universe);
        const formattedQuery = query.map((product) => product.dataValues);
        res.status(200).send(formattedQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.get("/api/products/price/:order", async (req, res) => {
    const order = req.params.order; // 'ASC' ou 'DESC'

    try {
        const query = await GetProductByPrice(order);
        const formattedQuery = query.map((product) => product.dataValues);
        res.status(200).send(formattedQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

try {
    app.listen(3000);
    console.log("Server running on port 3000");
} catch {
    console.log("Error on server");
}

export default app;
