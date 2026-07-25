const express = require("express");
const taskRoutes = require("./src/routes/task.routes");
const metaRoutes = require("./src/routes/meta.routes");
const { errorHandler } = require("./src/middleware/error-handler");

const swaggerUi = require("swagger-ui-express");
const openApiSpec = require("./openapi.json");

const app = express();

const port = 3000;

app.use(express.json());
app.use("/", taskRoutes);
app.use("/", metaRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})