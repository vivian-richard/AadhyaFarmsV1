import React, { createContext, useContext } from 'react';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  products: string[]; // Product IDs used
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface NutritionGuide {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface FarmStory {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Behind the Scenes' | 'Sustainability' | 'Animal Care' | 'Community';
}

export interface VideoTutorial {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  duration: string;
  category: 'Cooking' | 'Tips' | 'Farm Tour' | 'Product Guide';
  products: string[];
  views: number;
  date: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  benefits: string[];
  relatedProducts: string[];
}

interface BlogContextType {
  recipes: Recipe[];
  nutritionGuides: NutritionGuide[];
  farmStories: FarmStory[];
  videoTutorials: VideoTutorial[];
  healthArticles: HealthArticle[];
  getRecipeById: (id: string) => Recipe | undefined;
  getNutritionGuideById: (id: string) => NutritionGuide | undefined;
  getFarmStoryById: (id: string) => FarmStory | undefined;
  getVideoById: (id: string) => VideoTutorial | undefined;
  getHealthArticleById: (id: string) => HealthArticle | undefined;
  getRecipesByProduct: (productId: string) => Recipe[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};

const RECIPES: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Creamy Paneer Butter Masala',
    image: '/products/Paneer.png',
    description: 'Rich and creamy paneer curry made with fresh farm paneer, perfect for dinner',
    ingredients: [
      '250g Fresh Farm Paneer (cubed)',
      '2 tbsp Pure Desi Ghee',
      '2 large onions (finely chopped)',
      '3 tomatoes (pureed)',
      '1 cup fresh cream',
      '2 tsp ginger-garlic paste',
      'Spices: 1 tsp red chili, 1 tsp garam masala, 1/2 tsp turmeric',
      'Salt to taste',
      'Fresh coriander for garnish'
    ],
    instructions: [
      'Heat ghee in a pan and sauté onions until golden brown',
      'Add ginger-garlic paste and cook for 2 minutes',
      'Add tomato puree and all spices, cook until oil separates',
      'Add paneer cubes and mix gently',
      'Pour in fresh cream and simmer for 5 minutes',
      'Garnish with coriander and serve hot with naan or rice'
    ],
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Medium',
    products: ['paneer', 'ghee'],
    category: 'Dinner',
    nutritionInfo: {
      calories: 380,
      protein: '18g',
      carbs: '15g',
      fat: '28g'
    }
  },
  {
    id: 'recipe-2',
    title: 'Golden Milk Turmeric Latte',
    image: '/products/Milk.png',
    description: 'Healing golden milk with turmeric, perfect immunity booster',
    ingredients: [
      '1 cup Fresh Farm Milk',
      '1 tsp Pure Desi Ghee',
      '1/2 tsp turmeric powder',
      '1/4 tsp cinnamon powder',
      '1 pinch black pepper',
      '1 tsp honey or jaggery',
      'Pinch of cardamom (optional)'
    ],
    instructions: [
      'Heat milk in a saucepan on medium heat',
      'Add turmeric, cinnamon, and black pepper',
      'Stir continuously for 5 minutes',
      'Add ghee and mix well',
      'Remove from heat and add honey',
      'Pour into a cup and sprinkle cardamom on top'
    ],
    prepTime: '2 mins',
    cookTime: '7 mins',
    servings: 1,
    difficulty: 'Easy',
    products: ['milk-1l', 'ghee'],
    category: 'Breakfast',
    nutritionInfo: {
      calories: 180,
      protein: '8g',
      carbs: '18g',
      fat: '8g'
    }
  },
  {
    id: 'recipe-3',
    title: 'Homemade Fruit Yogurt Bowl',
    image: '/products/Curd.png',
    description: 'Healthy breakfast bowl with fresh curd, fruits, and honey',
    ingredients: [
      '1 cup Organic Curd',
      '1/2 cup mixed fruits (banana, apple, berries)',
      '2 tbsp Natural Honey',
      '2 tbsp granola or oats',
      '1 tbsp chia seeds',
      'Handful of nuts (almonds, walnuts)',
      'Mint leaves for garnish'
    ],
    instructions: [
      'Take fresh curd in a large bowl',
      'Chop all fruits into small pieces',
      'Layer curd and fruits in a serving bowl',
      'Drizzle honey on top',
      'Add granola and chia seeds',
      'Garnish with nuts and mint leaves'
    ],
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    products: ['curd-1kg'],
    category: 'Breakfast',
    nutritionInfo: {
      calories: 250,
      protein: '12g',
      carbs: '35g',
      fat: '8g'
    }
  },
  {
    id: 'recipe-4',
    title: 'Ghee Roasted Vegetables',
    image: '/products/Ghee.png',
    description: 'Colorful roasted vegetables with aromatic ghee',
    ingredients: [
      '3 tbsp Pure Desi Ghee',
      '2 cups mixed vegetables (carrots, bell peppers, broccoli, cauliflower)',
      '1 tsp cumin seeds',
      '1/2 tsp turmeric',
      '1 tsp chaat masala',
      'Salt and pepper to taste',
      'Fresh lemon juice'
    ],
    instructions: [
      'Preheat oven to 200°C',
      'Cut all vegetables into bite-sized pieces',
      'Melt ghee and add cumin seeds',
      'Toss vegetables with ghee mixture and spices',
      'Spread on a baking tray in single layer',
      'Roast for 25-30 minutes until golden',
      'Squeeze lemon juice before serving'
    ],
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    products: ['ghee'],
    category: 'Dinner',
    nutritionInfo: {
      calories: 160,
      protein: '4g',
      carbs: '12g',
      fat: '12g'
    }
  }
];

const NUTRITION_GUIDES: NutritionGuide[] = [
  {
    id: 'guide-1',
    title: 'Complete Guide to Dairy Nutrition',
    image: '/products/Milk.png',
    excerpt: 'Understanding the nutritional powerhouse of farm-fresh dairy products',
    content: `
## The Power of Fresh Dairy

Fresh dairy products are among nature's most complete foods, providing essential nutrients that support overall health and wellbeing.

### Key Nutrients in Milk

**Calcium**: Essential for strong bones and teeth. One glass of milk provides 30% of daily calcium needs.

**Protein**: High-quality complete protein with all essential amino acids. Perfect for muscle building and repair.

**Vitamin D**: Helps calcium absorption and supports immune function.

**B Vitamins**: B12, riboflavin, and niacin support energy metabolism and nervous system health.

### Benefits of Fresh vs. Processed

Farm-fresh milk retains more nutrients and natural enzymes compared to ultra-processed alternatives:

- Higher vitamin content
- Better protein quality
- Natural probiotic bacteria
- No artificial additives
- Superior taste and texture

### Daily Recommendations

- Adults: 2-3 servings daily
- Children: 3-4 servings daily
- Athletes: 4-5 servings daily

### Best Times to Consume

**Morning**: Boost energy and kickstart metabolism
**Post-workout**: Aid muscle recovery
**Before bed**: Promote better sleep with tryptophan

### Making the Most of Your Dairy

1. Always choose full-fat for maximum nutrient absorption
2. Consume fresh, avoid long storage
3. Pair with vitamin D-rich foods for better calcium absorption
4. Use in cooking to enhance nutrition in meals
    `,
    author: 'Dr. Priya Sharma',
    date: '2025-12-01',
    readTime: '8 min',
    category: 'Nutrition Science',
    tags: ['Dairy', 'Calcium', 'Protein', 'Health']
  },
  {
    id: 'guide-2',
    title: 'Probiotics: The Curd Connection',
    image: '/products/Curd.png',
    excerpt: 'How fresh curd supports gut health and immunity',
    content: `
## The Probiotic Powerhouse

Fresh curd (yogurt) is one of the richest sources of beneficial bacteria that support digestive health and overall wellness.

### Understanding Probiotics

Probiotics are live microorganisms that provide health benefits when consumed. Fresh farm curd contains billions of beneficial bacteria including:

- **Lactobacillus bulgaricus**: Aids digestion
- **Streptococcus thermophilus**: Boosts immunity
- **Lactobacillus acidophilus**: Supports gut health

### Health Benefits

**Digestive Health**
- Improves digestion and nutrient absorption
- Relieves bloating and gas
- Helps with lactose intolerance
- Supports regular bowel movements

**Immune System**
- 70% of immune cells are in the gut
- Probiotics strengthen immune response
- Reduce frequency of infections
- Support overall immunity

**Weight Management**
- Promotes healthy metabolism
- Increases satiety
- Supports fat loss when combined with exercise

**Skin Health**
- Reduces inflammation
- Improves skin texture
- Natural remedy for acne

### Maximizing Probiotic Benefits

1. **Consume Fresh**: Probiotics decrease over time
2. **Avoid Heating**: Heat kills beneficial bacteria
3. **Daily Consumption**: Consistency is key
4. **Pair Wisely**: Combine with prebiotic-rich foods

### Best Ways to Consume

- Plain with meals
- Smoothies and lassi
- Salad dressings
- Post-meal digestive aid
- Face masks for skin health

### Quality Matters

Farm-fresh curd has:
- Higher bacterial count
- Better culture quality
- No preservatives
- Pure, natural taste
    `,
    author: 'Nutritionist Anjali Verma',
    date: '2025-11-28',
    readTime: '10 min',
    category: 'Gut Health',
    tags: ['Probiotics', 'Curd', 'Digestion', 'Immunity']
  },
  {
    id: 'guide-3',
    title: 'Ghee: Ancient Superfood for Modern Life',
    image: '/products/Ghee.png',
    excerpt: 'Discover the incredible health benefits of pure desi ghee',
    content: `
## Liquid Gold: The Science of Ghee

Clarified butter, or ghee, has been used in Ayurvedic medicine for thousands of years. Modern science now confirms its remarkable health benefits.

### Nutritional Profile

**Healthy Fats**: Rich in short and medium-chain fatty acids that are easily absorbed and used for energy.

**Fat-Soluble Vitamins**: Excellent source of vitamins A, D, E, and K which support:
- Eye health (Vitamin A)
- Bone health (Vitamin D)
- Skin health (Vitamin E)
- Blood clotting (Vitamin K)

**Butyric Acid**: Supports gut health and reduces inflammation.

**CLA (Conjugated Linoleic Acid)**: May support weight management and heart health.

### Health Benefits

**1. Digestive Support**
- Stimulates digestive enzyme secretion
- Supports healthy gut lining
- Reduces inflammation

**2. Brain Health**
- Supports cognitive function
- Provides quick energy for brain
- May improve memory and focus

**3. Immune Function**
- Contains antioxidants
- Supports immune cell function
- Anti-inflammatory properties

**4. Heart Health**
- Contrary to old beliefs, moderate ghee consumption may support heart health
- Contains omega-3 fatty acids
- Raises good cholesterol (HDL)

**5. High Smoke Point**
- Perfect for cooking at high temperatures
- Doesn't produce harmful compounds
- Retains nutritional value when heated

### Daily Recommendations

- General health: 1-2 teaspoons daily
- Active lifestyle: 2-3 teaspoons daily
- Children: 1 teaspoon daily

### Best Uses

**Cooking**: Sautéing, roasting, baking
**Medicine**: Mixed with warm milk
**Beauty**: Hair and skin moisturizer
**Ritual**: Morning routine with warm water

### Quality Indicators

Pure, farm-fresh ghee:
- Rich golden color
- Granular texture when solid
- Pleasant nutty aroma
- Made from grass-fed cows
- No additives or preservatives
    `,
    author: 'Dr. Rajesh Kumar',
    date: '2025-11-25',
    readTime: '12 min',
    category: 'Ayurveda & Health',
    tags: ['Ghee', 'Healthy Fats', 'Ayurveda', 'Cooking']
  }
];

const FARM_STORIES: FarmStory[] = [
  {
    id: 'story-1',
    title: 'A Day in the Life at Aadhya Farms',
    image: '/products/logo final 5.png',
    excerpt: 'Follow our farmers through a typical day of caring for animals and producing quality dairy',
    content: `
## Dawn at the Farm

The day begins before sunrise at Aadhya Farms. As the first rays of light paint the sky, our farmers are already up and preparing for the day ahead.

### Morning Milking (5:00 AM)

Our cows are comfortable and content as they arrive at the milking parlor. Each cow is greeted by name - we know them all individually. The milking process is:

- **Gentle and stress-free**: Happy cows produce better milk
- **Hygienic**: All equipment sanitized before and after
- **Quality-checked**: Every batch tested for purity
- **Immediate cooling**: Preserves freshness and nutrients

### Feeding Time (7:00 AM)

Nutrition is key to producing high-quality dairy. Our cows enjoy:

- Fresh green fodder from our own fields
- Organic supplements
- Clean, fresh water throughout the day
- Minerals and vitamins for optimal health

### Pasture Time (9:00 AM)

Our cows spend their days in open pastures where they:

- Graze on natural grass
- Get plenty of exercise
- Enjoy fresh air and sunshine
- Socialize with their herd

### Processing & Quality Control (11:00 AM)

Back at the dairy, our team:

- Processes fresh milk into curd, ghee, and paneer
- Conducts quality tests
- Packages products fresh
- Prepares for same-day delivery

### Animal Care Check (2:00 PM)

Our veterinary team:

- Checks each animal's health
- Ensures comfortable living conditions
- Addresses any concerns immediately
- Maintains health records

### Evening Milking (5:00 PM)

The second milking of the day follows the same careful process, ensuring:

- Cow comfort and welfare
- Maximum milk quality
- Hygienic practices
- Proper cooling and storage

### Nighttime (8:00 PM)

As the day winds down:

- Cows rest in clean, comfortable shelters
- Final quality checks on the day's production
- Preparation for next day's deliveries
- Farm security ensures everyone's safety

## Our Commitment

Every single day, we're committed to:

- **Animal Welfare**: Happy, healthy animals first
- **Quality**: No shortcuts, no compromises
- **Sustainability**: Caring for our land
- **Community**: Supporting local families

When you choose Aadhya Farms, you're supporting ethical farming and getting the freshest, highest-quality dairy products.
    `,
    author: 'Ramesh Yadav, Head Farmer',
    date: '2025-12-03',
    readTime: '6 min',
    category: 'Behind the Scenes'
  },
  {
    id: 'story-2',
    title: 'Our Journey to Sustainability',
    image: '/products/logo final 5.png',
    excerpt: 'How Aadhya Farms is building a sustainable future for dairy farming',
    content: `
## Growing Responsibly

At Aadhya Farms, sustainability isn't just a buzzword - it's our way of life. Here's how we're making a difference.

### Regenerative Agriculture

**Soil Health**
- Composting all farm waste
- Crop rotation to maintain soil fertility
- No chemical fertilizers
- Natural pest management

**Water Conservation**
- Rainwater harvesting systems
- Drip irrigation for fodder crops
- Water recycling in dairy operations
- Zero water waste policy

### Renewable Energy

We're powered by clean energy:

- **Solar panels**: 80% of our electricity needs
- **Biogas**: From cow manure for cooking
- **Wind energy**: Supplementing our needs
- Goal: 100% renewable by 2026

### Waste Management

Nothing goes to waste at our farm:

**Cow Manure**
- Biogas production for energy
- Organic fertilizer for our fields
- Shared with local farmers

**Packaging**
- Biodegradable materials only
- Glass containers for reuse
- Minimal plastic usage
- Recycling program for customers

### Animal Welfare

Sustainability includes ethical treatment:

- Free-range living spaces
- Natural breeding practices
- Veterinary care without antibiotics overuse
- Retirement program for older cows

### Community Impact

**Local Economy**
- Employing 50+ local families
- Fair wages and benefits
- Training programs for youth
- Supporting local businesses

**Education**
- Farm tours for students
- Workshops on sustainable farming
- Community outreach programs
- Knowledge sharing with other farmers

### Carbon Footprint

We're working to be carbon-negative:

- Local delivery routes only
- Electric vehicle fleet by 2026
- Tree plantation program
- Carbon offset initiatives

### Future Goals

**2026 Goals:**
- Zero waste certification
- 100% renewable energy
- Expand to 100 acres
- Launch farmer training center

**2030 Vision:**
- Carbon negative operations
- Support 100 local farms
- Lead sustainable dairy practices
- Preserve traditional farming

## Join Our Journey

Every purchase supports:
- Sustainable farming
- Local communities
- Environmental conservation
- Ethical animal welfare

Together, we're building a better future.
    `,
    author: 'Kavita Sharma, Sustainability Manager',
    date: '2025-11-30',
    readTime: '8 min',
    category: 'Sustainability'
  }
];

const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'video-1',
    title: 'How to Make Perfect Paneer at Home',
    thumbnail: '/products/Paneer.png',
    videoUrl: 'https://example.com/paneer-tutorial',
    description: 'Learn the art of making soft, fresh paneer using our farm milk. Step-by-step guide from our kitchen to yours.',
    duration: '12:30',
    category: 'Cooking',
    products: ['milk-1l'],
    views: 15420,
    date: '2025-11-20'
  },
  {
    id: 'video-2',
    title: 'Farm Tour: Meet Our Cows',
    thumbnail: '/products/logo final 5.png',
    videoUrl: 'https://example.com/farm-tour',
    description: 'Take a virtual tour of Aadhya Farms and meet the happy cows that produce your fresh dairy products.',
    duration: '18:45',
    category: 'Farm Tour',
    products: ['milk-1l', 'curd-1kg', 'ghee'],
    views: 28930,
    date: '2025-11-15'
  },
  {
    id: 'video-3',
    title: 'Making Traditional Desi Ghee',
    thumbnail: '/products/Ghee.png',
    videoUrl: 'https://example.com/ghee-making',
    description: 'Discover the traditional bilona method of making pure desi ghee. Ancient technique, modern quality.',
    duration: '15:20',
    category: 'Cooking',
    products: ['ghee'],
    views: 12850,
    date: '2025-11-10'
  },
  {
    id: 'video-4',
    title: '5 Quick Breakfast Ideas with Fresh Curd',
    thumbnail: '/products/Curd.png',
    videoUrl: 'https://example.com/curd-breakfast',
    description: 'Healthy, delicious breakfast recipes using fresh farm curd. Perfect for busy mornings!',
    duration: '10:15',
    category: 'Cooking',
    products: ['curd-1kg'],
    views: 9240,
    date: '2025-11-05'
  }
];

const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'article-1',
    title: 'The Protein Power of Paneer',
    image: '/products/Paneer.png',
    excerpt: 'Why paneer is the ultimate vegetarian protein source',
    content: `
## Paneer: Complete Protein for Vegetarians

Paneer is one of the few vegetarian foods that provides complete protein with all essential amino acids.

### Nutritional Profile (per 100g)

- **Protein**: 18-20g
- **Calcium**: 200mg
- **Fat**: 20-25g
- **Calories**: 265
- **Carbs**: 1.2g

### Key Health Benefits

**1. Muscle Building**
High-quality protein supports muscle growth and repair, making it perfect for:
- Athletes and fitness enthusiasts
- Growing children and teenagers
- Recovery after illness
- Vegetarian bodybuilders

**2. Bone Health**
Rich in calcium and phosphorus:
- Strengthens bones and teeth
- Prevents osteoporosis
- Supports bone density
- Essential for growing children

**3. Weight Management**
Despite being calorie-dense, paneer can support weight loss:
- High protein increases satiety
- Reduces overall calorie intake
- Boosts metabolism
- Preserves muscle mass during weight loss

**4. Blood Sugar Control**
Low carbohydrate content makes it ideal for:
- Diabetic-friendly diet
- Low-carb meal plans
- Stable energy levels
- No blood sugar spikes

**5. Heart Health**
Contains beneficial fats:
- Omega-3 fatty acids
- Conjugated linoleic acid (CLA)
- May reduce heart disease risk
- Supports healthy cholesterol

### Who Should Eat Paneer?

**Perfect For:**
- Vegetarians seeking protein
- Athletes and active individuals
- Growing children
- Pregnant and nursing mothers
- People recovering from illness

**Best Times to Consume:**
- Post-workout for muscle recovery
- Breakfast for sustained energy
- Dinner for overnight muscle repair
- Snacks for protein boost

### Cooking Tips

**Preserve Nutrition:**
- Avoid overcooking
- Add at end of cooking
- Don't fry at very high heat
- Fresh is best - use within 2-3 days

**Healthy Preparations:**
- Grilled paneer tikka
- Paneer bhurji (scramble)
- Add to salads
- Paneer wraps
- Light curries

### Fresh vs Store-Bought

Farm-fresh paneer advantages:
- Higher protein content
- Better texture
- No preservatives
- Superior taste
- Maximum nutrition
    `,
    author: 'Dr. Meera Patel',
    date: '2025-12-02',
    readTime: '7 min',
    category: 'Nutrition',
    benefits: [
      'Muscle building',
      'Bone health',
      'Weight management',
      'Blood sugar control',
      'Heart health'
    ],
    relatedProducts: ['paneer']
  },
  {
    id: 'article-2',
    title: 'Milk: Nature\'s Complete Food',
    image: '/products/Milk.png',
    excerpt: 'Understanding why milk is called the perfect food',
    content: `
## The Complete Nutrition Package

Milk is often called "complete food" because it contains all the essential nutrients required for growth and development.

### What Makes Milk Complete?

**Macronutrients**
- **Protein**: 8g per cup (complete with all amino acids)
- **Carbohydrates**: 12g (mainly lactose for energy)
- **Fats**: 8g (essential fatty acids and fat-soluble vitamins)

**Micronutrients**
- **Calcium**: 300mg (30% daily needs)
- **Vitamin D**: Helps calcium absorption
- **Vitamin B12**: Essential for nerves and blood cells
- **Riboflavin**: Energy metabolism
- **Phosphorus**: Bone health
- **Potassium**: Heart health

### Life-Stage Benefits

**Infants & Children**
- Critical for growth and development
- Builds strong bones and teeth
- Supports brain development
- Provides essential calories

**Teenagers**
- Supports rapid growth spurts
- Peak bone mass development
- Athletic performance
- Hormonal balance

**Adults**
- Maintains bone density
- Muscle maintenance
- Energy and stamina
- Healthy aging

**Seniors**
- Prevents osteoporosis
- Maintains muscle mass
- Supports mobility
- Easy to digest protein

### Types of Milk Benefits

**Full-Fat Milk**
- Maximum vitamin absorption
- Sustained energy
- Better satiety
- All natural nutrients intact

**Toned Milk**
- Lower calories
- Still nutritious
- Good for weight management
- Maintains protein content

### Athletic Performance

Milk is the perfect sports drink:

**Pre-Workout**
- Provides sustained energy
- Hydration
- Prevents muscle breakdown

**Post-Workout**
- Optimal protein for recovery
- Carbs replenish glycogen
- Electrolytes for rehydration
- Reduces muscle soreness

### Common Myths Debunked

**Myth**: Milk causes mucus
**Fact**: No scientific evidence supports this

**Myth**: Adults don't need milk
**Fact**: Beneficial at all ages for bone health

**Myth**: Milk causes weight gain
**Fact**: Can actually support weight loss when part of balanced diet

### Quality Matters

Farm-fresh milk benefits:
- No hormones or antibiotics
- Higher nutrient content
- Better taste and texture
- Natural, unprocessed
- From happy, healthy cows

### Daily Recommendations

- **Children (1-8 years)**: 2 cups
- **Teenagers (9-18)**: 3 cups
- **Adults (19-50)**: 2-3 cups
- **Seniors (50+)**: 3 cups
- **Pregnant/Nursing**: 3-4 cups

### Best Consumption Times

**Morning**: Kickstart metabolism
**Post-exercise**: Optimal recovery
**Before bed**: Better sleep (contains tryptophan)
**With meals**: Enhances nutrient absorption
    `,
    author: 'Dr. Vikram Singh',
    date: '2025-11-27',
    readTime: '9 min',
    category: 'Health & Wellness',
    benefits: [
      'Complete nutrition',
      'Bone strength',
      'Muscle growth',
      'Energy boost',
      'Healthy aging'
    ],
    relatedProducts: ['milk-500ml', 'milk-1l']
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getRecipeById = (id: string) => RECIPES.find(r => r.id === id);
  const getNutritionGuideById = (id: string) => NUTRITION_GUIDES.find(g => g.id === id);
  const getFarmStoryById = (id: string) => FARM_STORIES.find(s => s.id === id);
  const getVideoById = (id: string) => VIDEO_TUTORIALS.find(v => v.id === id);
  const getHealthArticleById = (id: string) => HEALTH_ARTICLES.find(a => a.id === id);
  
  const getRecipesByProduct = (productId: string) => {
    return RECIPES.filter(r => r.products.includes(productId));
  };

  return (
    <BlogContext.Provider
      value={{
        recipes: RECIPES,
        nutritionGuides: NUTRITION_GUIDES,
        farmStories: FARM_STORIES,
        videoTutorials: VIDEO_TUTORIALS,
        healthArticles: HEALTH_ARTICLES,
        getRecipeById,
        getNutritionGuideById,
        getFarmStoryById,
        getVideoById,
        getHealthArticleById,
        getRecipesByProduct
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
