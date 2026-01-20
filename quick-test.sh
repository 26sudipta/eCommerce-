#!/bin/bash
echo "Testing Backend API..."
curl -s http://localhost:5000/api/health && echo "" && echo "✅ Server is working!"
