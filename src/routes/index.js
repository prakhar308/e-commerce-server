const indexRouter = require("express").Router();

indexRouter.use("/products", require("./product"));
indexRouter.use("/users", require("./user"));
indexRouter.use("/cart", require("./cart"));
indexRouter.use("/orders", require("./order"));
indexRouter.use("/auth", require("./auth"));

module.exports = indexRouter;