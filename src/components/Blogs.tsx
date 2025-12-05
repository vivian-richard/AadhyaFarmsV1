import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blogs() {
  const blogPosts = [
    {
      title: 'The Benefits of A2 Milk: Why It\'s Better for Your Family',
      excerpt: 'Discover the nutritional advantages of A2 milk and why more families are making the switch to this healthier dairy option.',
      image: '/cow.png',
      date: 'November 28, 2024',
      author: 'Aadhya Farms Team',
      category: 'Health & Nutrition',
    },
    {
      title: 'Organic Farming Practices: How We Nurture Our Land',
      excerpt: 'Learn about our sustainable farming methods that keep the soil healthy and produce the finest organic dairy products.',
      image: '/farmscene.png',
      date: 'November 15, 2024',
      author: 'Farm Manager',
      category: 'Sustainable Farming',
    },
    {
      title: 'Farm-to-Table: The Journey of Your Morning Milk',
      excerpt: 'Follow the journey of fresh milk from our happy cows to your breakfast table, ensuring quality at every step.',
      image: '/products.png',
      date: 'November 5, 2024',
      author: 'Aadhya Farms Team',
      category: 'Farm Life',
    },
    {
      title: 'Raising Happy Animals: Our Animal Welfare Standards',
      excerpt: 'Explore how we ensure our cows and goats live happy, healthy lives with plenty of space to roam and natural grazing.',
      image: '/goat.png',
      date: 'October 20, 2024',
      author: 'Animal Care Specialist',
      category: 'Animal Welfare',
    },
    {
      title: 'Seasonal Farm Activities: What to Expect During Your Visit',
      excerpt: 'Plan your farm stay experience by learning about the different activities available throughout the seasons.',
      image: '/farmactivites.png',
      date: 'October 10, 2024',
      author: 'Guest Relations',
      category: 'Farm Stay',
    },
    {
      title: 'Traditional Ghee Making: An Ancient Art Preserved',
      excerpt: 'Discover the time-honored process of making pure, hand-churned ghee using traditional methods passed down through generations.',
      image: '/cow.png',
      date: 'September 25, 2024',
      author: 'Aadhya Farms Team',
      category: 'Traditional Methods',
    },
  ];

  const categories = ['All', 'Health & Nutrition', 'Sustainable Farming', 'Farm Life', 'Animal Welfare', 'Farm Stay', 'Traditional Methods'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE0] to-[#E8DCC8] py-20 relative overflow-hidden">
      <div className="absolute left-0 top-1/4 opacity-3 pointer-events-none">
        <img src="/cow.png" alt="" className="h-96 w-auto" />
      </div>
      <div className="absolute right-0 bottom-1/4 opacity-3 pointer-events-none">
        <img src="/goat.png" alt="" className="h-80 w-auto transform scale-x-[-1]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2D5016] mb-6">
            Farm Stories & Insights
          </h1>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto leading-relaxed">
            Explore our journey in organic farming, learn about sustainable practices,
            and discover tips for a healthier lifestyle.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-2 rounded-full bg-white text-[#2D5016] font-semibold hover:bg-[#2D5016] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-12 flex items-center justify-center">
                <div className="bg-[#F5EFE0] rounded-2xl p-8 transform rotate-3 shadow-xl">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="h-80 w-auto rounded-lg"
                  />
                </div>
              </div>
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-block px-4 py-2 bg-[#D4AF37] text-[#2D5016] rounded-full text-sm font-bold mb-4 w-fit">
                  Featured Post
                </div>
                <h2 className="text-4xl font-bold text-[#2D5016] mb-4">
                  {blogPosts[0].title}
                </h2>
                <div className="flex items-center space-x-6 text-[#7A5C3C] mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{blogPosts[0].author}</span>
                  </div>
                </div>
                <p className="text-[#7A5C3C] text-lg leading-relaxed mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <button className="bg-[#2D5016] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3D6020] transition-all duration-300 flex items-center space-x-2 w-fit">
                  <span>Read More</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-8 flex items-center justify-center h-64 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src={post.image} alt="" className="h-full w-full object-cover blur-sm" />
                </div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-auto object-contain relative z-10"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-[#F5EFE0] text-[#2D5016] rounded-full text-xs font-bold mb-3">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-[#2D5016] mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-4 text-[#7A5C3C] text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <p className="text-[#7A5C3C] leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="text-[#2D5016] font-semibold hover:text-[#D4AF37] transition-colors duration-300 flex items-center space-x-2">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-[#2D5016] to-[#3D6020] rounded-3xl p-12 md:p-16 text-white shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Stay Updated with Farm News
            </h2>
            <p className="text-xl text-[#E8DCC8] leading-relaxed mb-8">
              Subscribe to our newsletter for the latest updates, farm tips, special offers, and new blog posts delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-lg w-full sm:w-96 text-[#2D5016] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button className="bg-[#D4AF37] text-[#2D5016] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#C09F27] transition-all duration-300 shadow-lg whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
