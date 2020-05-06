const express = require("express");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(productRoutes);
app.use(userRoutes);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
})