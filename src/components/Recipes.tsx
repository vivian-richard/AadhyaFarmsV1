import React, { useState } from 'react';
import { Clock, Users, ChefHat, Heart } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  ingredients: string[];
  instructions: string[];
  products: string[];
}

const Recipes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Traditional Paneer Butter Masala',
      image: '/products/Paneer.png',
      time: '30 mins',
      servings: 4,
      difficulty: 'Medium',
      category: 'Main Course',
      products: ['Fresh Paneer', 'Fresh Milk', 'Ghee'],
      ingredients: [
        '500g Fresh Paneer (cubed)',
        '2 tbsp Ghee',
        '1 cup Fresh Milk',
        '2 Onions (pureed)',
        '3 Tomatoes (pureed)',
        '1 tbsp Ginger-Garlic paste',
        'Spices: Cumin, Coriander, Garam Masala',
        'Kasuri Methi, Salt, Sugar',
      ],
      instructions: [
        'Heat ghee in a pan and sauté ginger-garlic paste',
        'Add onion puree and cook until golden',
        'Add tomato puree and spices, cook for 10 minutes',
        'Add fresh milk and bring to a gentle simmer',
        'Add paneer cubes and kasuri methi',
        'Simmer for 5 minutes, garnish with cream',
        'Serve hot with naan or rice',
      ],
    },
    {
      id: '2',
      title: 'Homemade Ghee Rice',
      image: '/products/Ghee.png',
      time: '40 mins',
      servings: 6,
      difficulty: 'Easy',
      category: 'Rice Dishes',
      products: ['Pure Ghee', 'Fresh Milk'],
      ingredients: [
        '2 cups Basmati Rice',
        '4 tbsp Pure Ghee',
        '1/2 cup Fresh Milk',
        'Whole spices: Bay leaf, Cinnamon, Cardamom, Cloves',
        'Cashews and Raisins',
        'Salt to taste',
      ],
      instructions: [
        'Wash and soak rice for 30 minutes',
        'Heat ghee and fry cashews and raisins, set aside',
        'In the same ghee, add whole spices',
        'Add drained rice and sauté for 2 minutes',
        'Add water, milk, and salt',
        'Cook until rice is done',
        'Garnish with fried cashews and raisins',
      ],
    },
    {
      id: '3',
      title: 'Fresh Curd Rice (Thayir Sadam)',
      image: '/products/Curd.png',
      time: '15 mins',
      servings: 4,
      difficulty: 'Easy',
      category: 'Rice Dishes',
      products: ['Fresh Curd', 'Fresh Milk'],
      ingredients: [
        '2 cups Cooked Rice',
        '1.5 cups Fresh Curd',
        '1/4 cup Fresh Milk',
        'Tempering: Mustard seeds, Curry leaves, Green chillies',
        'Pomegranate, Cucumber (optional)',
        'Salt to taste',
      ],
      instructions: [
        'Mash cooked rice with milk while warm',
        'Let it cool to room temperature',
        'Add fresh curd and salt, mix well',
        'Prepare tempering with mustard, curry leaves, chillies',
        'Pour tempering over curd rice',
        'Garnish with pomegranate and cucumber',
        'Serve chilled',
      ],
    },
    {
      id: '4',
      title: 'Scrambled Eggs with Ghee',
      image: '/products/Eggs-Nandanam.png',
      time: '10 mins',
      servings: 2,
      difficulty: 'Easy',
      category: 'Breakfast',
      products: ['Free Range Eggs', 'Pure Ghee'],
      ingredients: [
        '4 Free Range Eggs',
        '2 tbsp Pure Ghee',
        '1/4 cup Fresh Milk',
        '1 Onion (chopped)',
        '2 Green Chillies',
        'Coriander leaves',
        'Salt and Pepper',
      ],
      instructions: [
        'Beat eggs with milk, salt, and pepper',
        'Heat ghee in a pan',
        'Sauté onions and green chillies',
        'Pour egg mixture',
        'Stir gently until softly scrambled',
        'Garnish with coriander',
        'Serve with toast',
      ],
    },
    {
      id: '5',
      title: 'Classic Badam Milkshake',
      image: '/products/Badam-Milk.png',
      time: '5 mins',
      servings: 2,
      difficulty: 'Easy',
      category: 'Beverages',
      products: ['Fresh Milk', 'Badam Milk'],
      ingredients: [
        '2 cups Chilled Fresh Milk',
        '1/4 cup Badam Milk',
        '2 tbsp Sugar or Honey',
        '4-5 Ice cubes',
        'Saffron strands',
        'Chopped almonds for garnish',
      ],
      instructions: [
        'Add milk, badam milk, and sweetener to blender',
        'Add ice cubes and saffron',
        'Blend until smooth and frothy',
        'Pour into glasses',
        'Garnish with chopped almonds',
        'Serve immediately',
      ],
    },
    {
      id: '6',
      title: 'Chicken Biryani with Ghee',
      image: '/products/Chicken-Curry-Cut.png',
      time: '90 mins',
      servings: 6,
      difficulty: 'Hard',
      category: 'Main Course',
      products: ['Country Chicken', 'Pure Ghee', 'Fresh Curd'],
      ingredients: [
        '1kg Country Chicken (cut)',
        '3 cups Basmati Rice',
        '1/2 cup Pure Ghee',
        '1 cup Fresh Curd',
        'Whole spices and Biryani Masala',
        'Onions, Tomatoes, Mint, Coriander',
        'Saffron soaked in milk',
      ],
      instructions: [
        'Marinate chicken with curd, spices, and ghee for 1 hour',
        'Parboil rice with whole spices',
        'Fry onions until golden in ghee',
        'Layer marinated chicken in heavy-bottomed pot',
        'Add fried onions, herbs, and partially cooked rice',
        'Pour saffron milk and remaining ghee',
        'Cover and cook on dum for 30 minutes',
        'Serve hot with raita',
      ],
    },
  ];

  const categories = ['All', ...Array.from(new Set(recipes.map((r) => r.category)))];

  const filteredRecipes =
    selectedCategory === 'All'
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <ChefHat className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-4xl font-bold text-green-800 mb-4">Farm Fresh Recipes</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Delicious recipes using our fresh, organic products straight from the farm
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      recipe.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800'
                        : recipe.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{recipe.title}</h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings} servings
                  </div>
                </div>

                {/* Products Used */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Products Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.products.map((product, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Recipe Button */}
                <details className="group/recipe">
                  <summary className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center list-none">
                    View Full Recipe
                  </summary>

                  <div className="mt-4 space-y-4 animate-fade-in">
                    {/* Ingredients */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
                      <ol className="space-y-2 text-sm text-gray-700">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start">
                            <span className="font-semibold text-green-600 mr-2">
                              {index + 1}.
                            </span>
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <Heart className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-3xl font-bold mb-4">Have a Recipe to Share?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            We'd love to feature your farm-fresh recipes! Send us your creations using our
            products.
          </p>
          <a
            href="mailto:contactus@aadhyafarms.in"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Submit Your Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
