const express = require("express");
const productRoutes = require("./routes/product")

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(productRoutes);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
})