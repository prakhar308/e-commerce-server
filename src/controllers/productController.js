const db = require("../models");

exports.createProduct = async (req, res) => {
	try {
		const product = new db.Product(req.body);
		await product.save();
		res.status(201).send(product);
	} catch(e) {
		res.status(500).send({message : e.message})
	}
}

exports.getProducts = async (req, res) => {
	let pageNumber = 1;
	const nPerPage = 5;
	const notFilters = ['page', 'sort']
	const sort = {}
	const match = {} // this object will store the filters: category, etc.

	let filters = Object.keys(req.query);
	if(filters.length){
		for(let filter of filters){
		   if(!notFilters.includes(filter))
		      match[filter] = req.query[filter];
		}
	}

	if(req.query.page)
      pageNumber = parseInt(req.query.page);

	if(req.query.sort){
	  	const parts = req.query.sort.split(":");
	  	sort[parts[0]] = parts[1] === "desc" ? -1 : 1 
	}

	try {
		const products = await db.Product.find(match)
													.skip(pageNumber > 1 ? ((pageNumber - 1) * nPerPage) : 0)
													.limit(nPerPage)
													.sort(sort)
		res.status(200).send(products);
	} catch(e) {
		res.status(500).send({message: "Cannot find products"})
	}
}