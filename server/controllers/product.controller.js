import axios from 'axios';
import Product from '../models/Product.js';

// @desc    Seed products from DummyJSON API
// @route   POST /api/products/seed
// @access  Public (can be made admin-only later)
export const seedProducts = async (req, res) => {
  try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      return res.status(400).json({
        success: false,
        message: `Database already has ${existingProducts} products. Clear them first if you want to re-seed.`
      });
    }

    // Fetch products from DummyJSON
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    const dummyProducts = response.data.products;

    // Transform DummyJSON format to our schema
    const products = dummyProducts.map(product => ({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating || 0,
      stock: product.stock,
      brand: product.brand || '',
      category: product.category,
      thumbnail: product.thumbnail,
      images: product.images || [product.thumbnail],
      featured: product.rating >= 4.5, // Mark high-rated as featured
      source: 'dummyjson',
      dummyJsonId: product.id
    }));

    // Insert all products
    const insertedProducts = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${insertedProducts.length} products from DummyJSON`,
      count: insertedProducts.length
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed products',
      error: error.message
    });
  }
};

// @desc    Get all products with pagination and filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search, featured, minPrice, maxPrice } = req.query;

    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories/all
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const products = await Product.find({ category })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments({ category });

    res.json({
      success: true,
      category,
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products by category',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      source: 'admin'
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// @desc    Clear all products (for testing)
// @route   DELETE /api/products/clear/all
// @access  Private/Admin
export const clearAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    
    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} products from database`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear products',
      error: error.message
    });
  }
};
