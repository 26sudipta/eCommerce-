#!/bin/bash

echo "🔍 Testing E-Commerce Backend Server..."
echo ""

# Check if server is running
echo "1. Checking if server is running on port 5000..."
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "   ✅ Server is running!"
    echo ""
    
    # Test health endpoint
    echo "2. Testing /api/health endpoint:"
    curl -s http://localhost:5000/api/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:5000/api/health
    echo ""
    echo ""
    
    # Check if products exist
    echo "3. Checking products in database:"
    PRODUCT_COUNT=$(curl -s http://localhost:5000/api/products | grep -o '"total":[0-9]*' | cut -d':' -f2)
    if [ "$PRODUCT_COUNT" = "0" ] || [ -z "$PRODUCT_COUNT" ]; then
        echo "   ⚠️  No products found. Run seed command."
        echo ""
        echo "4. Seeding products from DummyJSON..."
        curl -s -X POST http://localhost:5000/api/products/seed | python3 -m json.tool 2>/dev/null
        echo ""
    else
        echo "   ✅ Found $PRODUCT_COUNT products in database"
        echo ""
    fi
    
    # Test categories
    echo "5. Testing /api/products/categories/all:"
    curl -s http://localhost:5000/api/products/categories/all | python3 -m json.tool 2>/dev/null | head -20
    echo ""
    
else
    echo "   ❌ Server is NOT running on port 5000"
    echo ""
    echo "📝 To start the server:"
    echo "   cd /home/sudipta/WEV_APP/tools_final/ecommerce/server"
    echo "   npm run dev"
    echo ""
fi
