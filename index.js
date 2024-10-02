const { initializeDatabase } = require("./db/db");
const express = require("express");

const Product = require("./models/products.models");

const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
initializeDatabase();

async function createProducts(newProduct) {
  try {
    const products = new Product(newProduct);
    const saveProducts = await products.save();
    return saveProducts;
  } catch (error) {
    throw error;
  }
}

app.post("/products", async (req, res) => {
  try {
    const savedProducts = await createProducts(req.body);
    res.status(201).json({
      message: "Products added successfully",
      products: savedProducts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Products", error });
  }
});

async function productsToUpdate(productId, productToUpdate) {
  try {
    const products = await Product.findByIdAndUpdate(
      { _id: productId },
      productToUpdate,
      { new: true },
    );
    return products;
  } catch (error) {
    throw error;
  }
}

async function getCategory(category) {
  try {
    const products = await Product.find({ category: category });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/category/:categoryType", async (req, res) => {
  try {
    const products = await getCategory(req.params.categoryType);
    if (products.length === 0) {
      res.status(404).json({ message: "Product Not found." });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the Product." });
  }
});

app.post("/products/productCategory/:productId", async (req, res) => {
  try {
    const updateProducts = await productsToUpdate(
      req.params.productId,
      req.body,
    );

    if (!updateProducts) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      products: updateProducts,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to updated the product." });
  }
});

async function readAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products", async (req, res) => {
  try {
    const allProducts = await readAllProducts();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Falied to fetch the products" });
  }
});

async function productsById(productId) {
  try {
    const products = await Product.find({ _id: productId });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/:productId", async (req, res) => {
  try {
    const products = await productsById(req.params.productId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

async function getProductsByCategory(categoryName) {
  try {
    const products = await Product.find({
      category: RegExp(categoryName, "i"),
    });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/category/:categoryName", async (req, res) => {
  try {
    const products = await getProductsByCategory(req.params.categoryName);
    res.json(products);
  } catch (error) {
    res.status(401).json({ error: "No such category found" });
  }
});

async function getProductByCategoryId(categoryId) {
  try {
    const products = await Product.find({ categoryId: categoryId });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/category/:categoryId", async (req, res) => {
  try {
    const products = await getProductByCategoryId(req.params.categoryId);
    if (!products) {
      res.status(404).json({ error: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

async function getProductByBrandName(brandName) {
  try {
    const products = await Product.find({ brand: RegExp(brandName, "i") });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/brand/:brandName", async (req, res) => {
  try {
    const products = await getProductByBrandName(req.params.brandName);
    if (products.length === 0) {
      res.status(404).json({ error: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

async function getProductByProductName(productName) {
  try {
    const products = await Product.find({ name: RegExp(productName, "i") });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/name/:productName", async (req, res) => {
  try {
    const products = await getProductByProductName(req.params.productName);
    if (products.length === 0) {
      res.status(404).json({ error: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
