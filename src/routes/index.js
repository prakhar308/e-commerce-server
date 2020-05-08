const indexRouter = require("express").Router();

indexRouter.use("/products", require("./product"));
indexRouter.use("/users", require("./user"));

module.exports = indexRouter;