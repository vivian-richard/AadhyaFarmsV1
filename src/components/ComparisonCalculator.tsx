import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import {
  Calculator, TrendingUp, Leaf, DollarSign, Scale,
  CheckCircle, XCircle, Info, Sparkles,
  ShoppingCart, Package, Truck, TreePine, Award
} from 'lucide-react';

const ComparisonCalculator: React.FC = () => {
  const { products } = useProducts();

  // State Management
  const [activeTab, setActiveTab] = useState<'compare' | 'nutrition' | 'savings' | 'carbon'>('compare');
  
  // Product Comparison State
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  
  // Nutrition Calculator State
  const [nutritionProduct, setNutritionProduct] = useState<string>('');
  const [nutritionQuantity, setNutritionQuantity] = useState<number>(100);
  
  // Cost Savings Calculator State
  const [savingsProduct, setSavingsProduct] = useState<string>('');
  const [deliveriesPerWeek, setDeliveriesPerWeek] = useState<number>(7);
  const [subscriptionMonths, setSubscriptionMonths] = useState<number>(3);
  
  // Carbon Footprint State
  const [carbonProduct, setCarbonProduct] = useState<string>('');
  const [carbonQuantity, setCarbonQuantity] = useState<number>(1);

  // Product Comparison Data
  const productComparisons: { [key: string]: any } = {
    'Milk': {
      organic: {
        name: 'Aadhya Farms Organic Milk',
        price: 75,
        features: [
          { feature: 'No Antibiotics/Hormones', organic: true, storebought: false },
          { feature: 'Grass-Fed Cows', organic: true, storebought: false },
          { feature: 'No Preservatives', organic: true, storebought: false },
          { feature: 'Higher Omega-3', organic: true, storebought: false },
          { feature: 'Fresh (< 24 hours)', organic: true, storebought: false },
          { feature: 'Pasteurized', organic: true, storebought: true },
          { feature: 'Chemical-Free', organic: true, storebought: false },
          { feature: 'Full Cream', organic: true, storebought: true },
        ],
        nutrition: { protein: 3.5, fat: 3.5, calcium: 120, vitamins: 'A, D, B12' },
      },
      storebought: {
        name: 'Regular Store Milk',
        price: 60,
        features: [],
        nutrition: { protein: 3.2, fat: 3.0, calcium: 100, vitamins: 'A, D' },
      },
    },
    'Curd': {
      organic: {
        name: 'Aadhya Farms Fresh Curd',
        price: 45,
        features: [
          { feature: 'Live Probiotics', organic: true, storebought: false },
          { feature: 'No Artificial Cultures', organic: true, storebought: false },
          { feature: 'Organic Milk Base', organic: true, storebought: false },
          { feature: 'Rich & Creamy', organic: true, storebought: true },
          { feature: 'No Additives', organic: true, storebought: false },
          { feature: 'Daily Fresh', organic: true, storebought: false },
          { feature: 'Traditional Method', organic: true, storebought: false },
        ],
        nutrition: { protein: 3.5, probiotics: '10 billion CFU', calcium: 110, fat: 3.2 },
      },
      storebought: {
        name: 'Packaged Store Curd',
        price: 40,
        features: [],
        nutrition: { protein: 3.0, probiotics: 'Limited', calcium: 90, fat: 2.8 },
      },
    },
    'Paneer': {
      organic: {
        name: 'Aadhya Farms Fresh Paneer',
        price: 90,
        features: [
          { feature: 'Made from A2 Milk', organic: true, storebought: false },
          { feature: 'No Preservatives', organic: true, storebought: false },
          { feature: 'High Protein Content', organic: true, storebought: true },
          { feature: 'Fresh Daily', organic: true, storebought: false },
          { feature: 'Natural Curdling', organic: true, storebought: false },
          { feature: 'Soft Texture', organic: true, storebought: true },
          { feature: 'Chemical-Free', organic: true, storebought: false },
        ],
        nutrition: { protein: 18, calcium: 200, fat: 20, carbs: 1.2 },
      },
      storebought: {
        name: 'Packaged Store Paneer',
        price: 85,
        features: [],
        nutrition: { protein: 16, calcium: 180, fat: 22, carbs: 2.0 },
      },
    },
    'Ghee': {
      organic: {
        name: 'Aadhya Farms Pure Desi Ghee',
        price: 450,
        features: [
          { feature: 'Bilona Method', organic: true, storebought: false },
          { feature: 'A2 Cow Milk', organic: true, storebought: false },
          { feature: 'No Adulterants', organic: true, storebought: false },
          { feature: 'Rich Aroma', organic: true, storebought: true },
          { feature: 'High Smoke Point', organic: true, storebought: true },
          { feature: 'Lactose-Free', organic: true, storebought: true },
          { feature: 'Traditional Process', organic: true, storebought: false },
        ],
        nutrition: { fat: 99.8, vitamins: 'A, D, E, K', omega3: 'High', saturatedFat: 62 },
      },
      storebought: {
        name: 'Commercial Ghee',
        price: 400,
        features: [],
        nutrition: { fat: 99.5, vitamins: 'A, D', omega3: 'Low', saturatedFat: 65 },
      },
    },
  };

  // Nutrition Data (per 100g)
  const nutritionData: { [key: string]: any } = {
    'Milk': {
      calories: 62,
      protein: 3.5,
      carbs: 4.8,
      fat: 3.5,
      calcium: 120,
      vitamins: ['A', 'D', 'B12'],
      minerals: { calcium: 120, phosphorus: 90, potassium: 150 },
    },
    'Curd': {
      calories: 60,
      protein: 3.5,
      carbs: 4.5,
      fat: 3.2,
      calcium: 110,
      vitamins: ['B12', 'B2'],
      minerals: { calcium: 110, phosphorus: 85, potassium: 140 },
      probiotics: '10 billion CFU',
    },
    'Paneer': {
      calories: 265,
      protein: 18,
      carbs: 1.2,
      fat: 20,
      calcium: 200,
      vitamins: ['A', 'D', 'B12'],
      minerals: { calcium: 200, phosphorus: 138, selenium: 13 },
    },
    'Ghee': {
      calories: 900,
      protein: 0,
      carbs: 0,
      fat: 99.8,
      vitamins: ['A', 'D', 'E', 'K'],
      minerals: { omega3: 'High', omega6: 'Low' },
      benefits: ['Improves digestion', 'Boosts immunity', 'Anti-inflammatory'],
    },
    'Buttermilk': {
      calories: 40,
      protein: 3.1,
      carbs: 4.8,
      fat: 0.9,
      calcium: 116,
      vitamins: ['B12', 'B2'],
      minerals: { calcium: 116, phosphorus: 89, potassium: 151 },
      probiotics: '5 billion CFU',
    },
  };

  // Carbon Footprint Data (kg CO2 per kg product)
  const carbonFootprintData: { [key: string]: any } = {
    'Milk': {
      farmFresh: {
        production: 0.9,
        transport: 0.1,
        packaging: 0.05,
        total: 1.05,
      },
      supermarket: {
        production: 1.2,
        transport: 0.8,
        packaging: 0.3,
        coldStorage: 0.2,
        total: 2.5,
      },
    },
    'Curd': {
      farmFresh: {
        production: 1.0,
        transport: 0.1,
        packaging: 0.05,
        total: 1.15,
      },
      supermarket: {
        production: 1.3,
        transport: 0.9,
        packaging: 0.4,
        coldStorage: 0.25,
        total: 2.85,
      },
    },
    'Paneer': {
      farmFresh: {
        production: 5.0,
        transport: 0.2,
        packaging: 0.1,
        total: 5.3,
      },
      supermarket: {
        production: 6.5,
        transport: 1.5,
        packaging: 0.6,
        coldStorage: 0.5,
        total: 9.1,
      },
    },
    'Ghee': {
      farmFresh: {
        production: 8.0,
        transport: 0.15,
        packaging: 0.1,
        total: 8.25,
      },
      supermarket: {
        production: 10.0,
        transport: 2.0,
        packaging: 0.5,
        coldStorage: 0.3,
        total: 12.8,
      },
    },
  };

  const calculateCostSavings = () => {
    const product = products.find((p: any) => p.name.includes(savingsProduct));
    if (!product) return null;

    const oneTimePrice = product.price;
    const deliveriesPerMonth = deliveriesPerWeek * 4;
    const totalDeliveries = deliveriesPerMonth * subscriptionMonths;

    // One-time purchase cost (no discount)
    const oneTimeCost = oneTimePrice * totalDeliveries;

    // Subscription cost (10% discount)
    const subscriptionDiscount = 0.10;
    const subscriptionPrice = oneTimePrice * (1 - subscriptionDiscount);
    const subscriptionCost = subscriptionPrice * totalDeliveries;

    const savings = oneTimeCost - subscriptionCost;
    const savingsPercentage = (savings / oneTimeCost) * 100;

    return {
      oneTimeCost,
      subscriptionCost,
      savings,
      savingsPercentage,
      totalDeliveries,
      pricePerDelivery: subscriptionPrice,
    };
  };

  const calculateNutrition = () => {
    const data = nutritionData[nutritionProduct];
    if (!data) return null;

    const multiplier = nutritionQuantity / 100;

    return {
      calories: Math.round(data.calories * multiplier),
      protein: (data.protein * multiplier).toFixed(1),
      carbs: (data.carbs * multiplier).toFixed(1),
      fat: (data.fat * multiplier).toFixed(1),
      calcium: Math.round(data.calcium * multiplier),
      vitamins: data.vitamins,
      minerals: data.minerals,
      probiotics: data.probiotics,
      benefits: data.benefits,
    };
  };

  const calculateCarbonFootprint = () => {
    const data = carbonFootprintData[carbonProduct];
    if (!data) return null;

    return {
      farmFresh: {
        production: (data.farmFresh.production * carbonQuantity).toFixed(2),
        transport: (data.farmFresh.transport * carbonQuantity).toFixed(2),
        packaging: (data.farmFresh.packaging * carbonQuantity).toFixed(2),
        total: (data.farmFresh.total * carbonQuantity).toFixed(2),
      },
      supermarket: {
        production: (data.supermarket.production * carbonQuantity).toFixed(2),
        transport: (data.supermarket.transport * carbonQuantity).toFixed(2),
        packaging: (data.supermarket.packaging * carbonQuantity).toFixed(2),
        coldStorage: (data.supermarket.coldStorage * carbonQuantity).toFixed(2),
        total: (data.supermarket.total * carbonQuantity).toFixed(2),
      },
      saved: ((data.supermarket.total - data.farmFresh.total) * carbonQuantity).toFixed(2),
      savedPercentage: (((data.supermarket.total - data.farmFresh.total) / data.supermarket.total) * 100).toFixed(1),
    };
  };

  const comparisonData = selectedProduct ? productComparisons[selectedProduct] : null;
  const nutritionResult = nutritionProduct ? calculateNutrition() : null;
  const savingsResult = savingsProduct ? calculateCostSavings() : null;
  const carbonResult = carbonProduct ? calculateCarbonFootprint() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-16 w-16 text-[#2D5016]" />
          </div>
          <h1 className="text-5xl font-bold text-[#2D5016] mb-4">Comparison & Calculator</h1>
          <p className="text-xl text-gray-600">Make informed decisions with data-driven insights 📊</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'compare'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Scale className="h-5 w-5" />
            Product Comparison
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'nutrition'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Award className="h-5 w-5" />
            Nutrition Calculator
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'savings'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <DollarSign className="h-5 w-5" />
            Cost Savings
          </button>
          <button
            onClick={() => setActiveTab('carbon')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'carbon'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Leaf className="h-5 w-5" />
            Carbon Footprint
          </button>
        </div>

        {/* Product Comparison Tab */}
        {activeTab === 'compare' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Compare Organic vs Store-Bought</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                >
                  <option value="">Choose a product...</option>
                  <option value="Milk">Milk</option>
                  <option value="Curd">Curd</option>
                  <option value="Paneer">Paneer</option>
                  <option value="Ghee">Ghee</option>
                </select>
              </div>

              {comparisonData && (
                <div className="space-y-6">
                  {/* Price Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-6 w-6 text-green-600" />
                        <h3 className="text-xl font-bold text-green-900">{comparisonData.organic.name}</h3>
                      </div>
                      <p className="text-4xl font-bold text-green-700 mb-2">₹{comparisonData.organic.price}</p>
                      <p className="text-sm text-green-700">Farm-fresh organic quality</p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <ShoppingCart className="h-6 w-6 text-gray-600" />
                        <h3 className="text-xl font-bold text-gray-900">{comparisonData.storebought.name}</h3>
                      </div>
                      <p className="text-4xl font-bold text-gray-700 mb-2">₹{comparisonData.storebought.price}</p>
                      <p className="text-sm text-gray-700">Regular store quality</p>
                    </div>
                  </div>

                  {/* Feature Comparison */}
                  <div className="bg-[#F5EFE0] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#2D5016] mb-4">Feature Comparison</h3>
                    <div className="space-y-3">
                      {comparisonData.organic.features.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <span className="font-semibold text-gray-800">{item.feature}</span>
                          <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                              {item.organic ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-500" />
                              )}
                              <span className="text-sm text-gray-600">Organic</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.storebought ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-500" />
                              )}
                              <span className="text-sm text-gray-600">Store</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                      <h4 className="font-bold text-[#2D5016] mb-3">Organic Nutrition (per 100g)</h4>
                      <div className="space-y-2">
                        {Object.entries(comparisonData.organic.nutrition).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-700 capitalize">{key}:</span>
                            <span className="font-semibold text-gray-900">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                      <h4 className="font-bold text-gray-700 mb-3">Store Nutrition (per 100g)</h4>
                      <div className="space-y-2">
                        {Object.entries(comparisonData.storebought.nutrition).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-700 capitalize">{key}:</span>
                            <span className="font-semibold text-gray-900">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nutrition Calculator Tab */}
        {activeTab === 'nutrition' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Nutrition Calculator</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                  <select
                    value={nutritionProduct}
                    onChange={(e) => setNutritionProduct(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                  >
                    <option value="">Choose a product...</option>
                    <option value="Milk">Milk</option>
                    <option value="Curd">Curd</option>
                    <option value="Paneer">Paneer</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Buttermilk">Buttermilk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (grams)</label>
                  <input
                    type="number"
                    value={nutritionQuantity}
                    onChange={(e) => setNutritionQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    min="1"
                    max="5000"
                  />
                </div>
              </div>

              {nutritionResult && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">
                      Nutritional Information for {nutritionQuantity}g {nutritionProduct}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-blue-700">{nutritionResult.calories}</p>
                        <p className="text-sm text-gray-600 mt-1">Calories</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-green-700">{nutritionResult.protein}g</p>
                        <p className="text-sm text-gray-600 mt-1">Protein</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-yellow-700">{nutritionResult.carbs}g</p>
                        <p className="text-sm text-gray-600 mt-1">Carbs</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-red-700">{nutritionResult.fat}g</p>
                        <p className="text-sm text-gray-600 mt-1">Fat</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F5EFE0] rounded-xl p-6">
                      <h4 className="font-bold text-[#2D5016] mb-3">Vitamins</h4>
                      <div className="flex flex-wrap gap-2">
                        {nutritionResult.vitamins.map((vitamin: string) => (
                          <span key={vitamin} className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-[#2D5016]">
                            Vitamin {vitamin}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#F5EFE0] rounded-xl p-6">
                      <h4 className="font-bold text-[#2D5016] mb-3">Minerals</h4>
                      <div className="space-y-2">
                        {Object.entries(nutritionResult.minerals).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-700 capitalize">{key}:</span>
                            <span className="font-semibold text-gray-900">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {nutritionResult.probiotics && (
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                      <h4 className="font-bold text-green-900 mb-2">Probiotic Content</h4>
                      <p className="text-green-800">{nutritionResult.probiotics}</p>
                    </div>
                  )}

                  {nutritionResult.benefits && (
                    <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-3">Health Benefits</h4>
                      <ul className="space-y-2">
                        {nutritionResult.benefits.map((benefit: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-purple-800">
                            <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cost Savings Calculator Tab */}
        {activeTab === 'savings' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Subscription Cost Savings Calculator</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                  <select
                    value={savingsProduct}
                    onChange={(e) => setSavingsProduct(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                  >
                    <option value="">Choose a product...</option>
                    <option value="Milk">Milk</option>
                    <option value="Curd">Curd</option>
                    <option value="Paneer">Paneer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deliveries per Week</label>
                  <input
                    type="number"
                    value={deliveriesPerWeek}
                    onChange={(e) => setDeliveriesPerWeek(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    min="1"
                    max="7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subscription Duration (Months)</label>
                  <input
                    type="number"
                    value={subscriptionMonths}
                    onChange={(e) => setSubscriptionMonths(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    min="1"
                    max="12"
                  />
                </div>
              </div>

              {savingsResult && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-900 mb-4">One-Time Purchase</h3>
                      <p className="text-4xl font-bold text-red-700 mb-2">₹{savingsResult.oneTimeCost.toLocaleString()}</p>
                      <p className="text-sm text-red-700">{savingsResult.totalDeliveries} deliveries</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-bold text-green-900">Subscription (10% off)</h3>
                      </div>
                      <p className="text-4xl font-bold text-green-700 mb-2">₹{savingsResult.subscriptionCost.toLocaleString()}</p>
                      <p className="text-sm text-green-700">₹{savingsResult.pricePerDelivery.toFixed(2)} per delivery</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-8 border-2 border-yellow-300">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-orange-900 mb-2">Your Total Savings</h3>
                      <p className="text-5xl font-bold text-orange-700 mb-3">₹{savingsResult.savings.toLocaleString()}</p>
                      <p className="text-xl text-orange-800">
                        That's {savingsResult.savingsPercentage.toFixed(1)}% savings over {subscriptionMonths} months!
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F5EFE0] rounded-xl p-6">
                    <h4 className="font-bold text-[#2D5016] mb-3">Subscription Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">10% Discount</p>
                          <p className="text-sm text-gray-600">Save on every delivery</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">No Delivery Charges</p>
                          <p className="text-sm text-gray-600">Free delivery for subscribers</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Flexible Schedule</p>
                          <p className="text-sm text-gray-600">Skip or pause anytime</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Priority Delivery</p>
                          <p className="text-sm text-gray-600">Fresh products guaranteed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Carbon Footprint Tab */}
        {activeTab === 'carbon' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6">Carbon Footprint Tracker</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                  <select
                    value={carbonProduct}
                    onChange={(e) => setCarbonProduct(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                  >
                    <option value="">Choose a product...</option>
                    <option value="Milk">Milk (1L)</option>
                    <option value="Curd">Curd (500g)</option>
                    <option value="Paneer">Paneer (250g)</option>
                    <option value="Ghee">Ghee (500g)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (units)</label>
                  <input
                    type="number"
                    value={carbonQuantity}
                    onChange={(e) => setCarbonQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              {carbonResult && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-4">
                        <TreePine className="h-6 w-6 text-green-600" />
                        <h3 className="text-xl font-bold text-green-900">Farm-Fresh (Aadhya Farms)</h3>
                      </div>
                      <p className="text-4xl font-bold text-green-700 mb-4">{carbonResult.farmFresh.total} kg</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Production:</span>
                          <span className="font-semibold">{carbonResult.farmFresh.production} kg CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Transport:</span>
                          <span className="font-semibold">{carbonResult.farmFresh.transport} kg CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Packaging:</span>
                          <span className="font-semibold">{carbonResult.farmFresh.packaging} kg CO₂</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-300">
                      <div className="flex items-center gap-2 mb-4">
                        <Truck className="h-6 w-6 text-gray-600" />
                        <h3 className="text-xl font-bold text-gray-900">Supermarket</h3>
                      </div>
                      <p className="text-4xl font-bold text-gray-700 mb-4">{carbonResult.supermarket.total} kg</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Production:</span>
                          <span className="font-semibold">{carbonResult.supermarket.production} kg CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Transport:</span>
                          <span className="font-semibold">{carbonResult.supermarket.transport} kg CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Packaging:</span>
                          <span className="font-semibold">{carbonResult.supermarket.packaging} kg CO₂</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Cold Storage:</span>
                          <span className="font-semibold">{carbonResult.supermarket.coldStorage} kg CO₂</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-8 border-2 border-blue-300">
                    <div className="text-center">
                      <Leaf className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-blue-900 mb-2">Carbon Footprint Saved</h3>
                      <p className="text-5xl font-bold text-blue-700 mb-3">{carbonResult.saved} kg CO₂</p>
                      <p className="text-xl text-blue-800">
                        You reduce carbon emissions by {carbonResult.savedPercentage}% by choosing farm-fresh!
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F5EFE0] rounded-xl p-6">
                    <h4 className="font-bold text-[#2D5016] mb-3">Environmental Impact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Local Production</p>
                          <p className="text-sm text-gray-600">Reduced transportation emissions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Minimal Processing</p>
                          <p className="text-sm text-gray-600">Less energy consumption</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">Eco-Friendly Packaging</p>
                          <p className="text-sm text-gray-600">Biodegradable materials</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800">No Cold Storage</p>
                          <p className="text-sm text-gray-600">Daily fresh delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-4">
                      <Info className="h-12 w-12 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-lg mb-1">Did you know?</p>
                        <p className="text-sm">
                          Choosing farm-fresh products over supermarket items for a year can save the equivalent 
                          of planting {Math.round(parseFloat(carbonResult.saved) * 12 / 20)} trees! 🌳
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonCalculator;
