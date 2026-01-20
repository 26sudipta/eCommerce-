import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  brand: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  // Track if product came from DummyJSON or added by admin
  source: {
    type: String,
    enum: ['dummyjson', 'admin'],
    default: 'admin'
  },
  dummyJsonId: {
    type: Number,
    sparse: true
  }
}, {
  timestamps: true
});

// Index for searching
productSchema.index({ title: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
