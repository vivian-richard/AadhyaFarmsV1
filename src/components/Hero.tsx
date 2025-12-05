import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <div className="bg-gradient-to-b from-[#F5EFE0] to-[#E8DCC8] relative overflow-auto ">
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
        <img src="/cow.png" alt="" className="h-96 w-auto" />
      </div>
      <div className="absolute left-0 bottom-0 opacity-5 pointer-events-none">
        <img src="/goat.png" alt="" className="h-80 w-auto" />
      </div>

      {/* Full-bleed farm scene behind content (md+), content overlays on top */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-screen z-0 pointer-events-none">
        <img
          src="/farmscene.png"
          alt="Aadhya Farms Farm Scene"
          className="w-full  object-contain"
        />
      </div>

      <div className="container mx-auto px-6 py-8 md:py-12 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12 mb-16">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              {/* Mobile: show existing logo */}
              <img
                src="/logo-transparent.png"
                alt="Aadhya Farms"
                className="block md:hidden h-64 w-auto drop-shadow-2xl animate-in fade-in"
              />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2D5016] leading-tight">
              The Essence of Nature
            </h1>
            <p className="text-xl lg:text-2xl text-[#7A5C3C] leading-relaxed max-w-3xl mx-auto">
              Experience pure, organic dairy products from our farm to your table.
              Discover the joy of authentic farm life with our immersive farm stay experiences.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-[#2D5016] text-[#F5EFE0] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#3D6020] transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage('farmstay')}
                className="bg-[#D4AF37] text-[#2D5016] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#C09F27] transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Book Farm Stay</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-[#F5EFE0]">🥛</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">100% Organic</h3>
            <p className="text-[#7A5C3C] leading-relaxed">
              Pure, chemical-free dairy products from grass-fed cows and goats
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-[#F5EFE0]">🏡</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">Farm Fresh</h3>
            <p className="text-[#7A5C3C] leading-relaxed">
              Direct from our farm to your home, ensuring maximum freshness
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-[#F5EFE0]">🌱</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">Sustainable</h3>
            <p className="text-[#7A5C3C] leading-relaxed">
              Eco-friendly farming practices that nurture the land
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-32 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2D5016] mb-6">
            Why Choose Aadhya Farms?
          </h2>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto mb-16">
            We're committed to providing you with the finest organic dairy products while maintaining sustainable farming practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] p-8 rounded-2xl text-white shadow-xl">
              <div className="text-4xl mb-4">🐄</div>
              <h4 className="text-xl font-bold mb-3">Happy Animals</h4>
              <p className="text-[#E8DCC8]">Our cows and goats roam freely in natural pastures, ensuring their well-being and quality milk production.</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#C09F27] p-8 rounded-2xl text-[#2D5016] shadow-xl">
              <div className="text-4xl mb-4">🌿</div>
              <h4 className="text-xl font-bold mb-3">No Chemicals</h4>
              <p>Zero pesticides, antibiotics, or artificial hormones. Just pure, natural goodness from pasture to table.</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] p-8 rounded-2xl text-white shadow-xl">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-xl font-bold mb-3">Fresh Delivery</h4>
              <p className="text-[#E8DCC8]">Daily delivery to ensure you receive the freshest milk and dairy products right at your doorstep.</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#C09F27] p-8 rounded-2xl text-[#2D5016] shadow-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-bold mb-3">Quality Assured</h4>
              <p>Rigorous quality checks and certifications ensure every product meets the highest organic standards.</p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-32 bg-gradient-to-r from-[#2D5016] to-[#3D6020] rounded-3xl p-12 md:p-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-xl text-[#E8DCC8] leading-relaxed mb-6">
                Founded with a passion for sustainable agriculture, Aadhya Farms began as a family dream to bring pure, organic dairy products to health-conscious families.
              </p>
              <p className="text-lg text-[#E8DCC8] leading-relaxed mb-8">
                Today, we're proud to maintain traditional farming methods while embracing modern quality standards, ensuring every drop of milk reflects our commitment to excellence and environmental stewardship.
              </p>
              <button
                onClick={() => setCurrentPage('about')}
                className="bg-[#D4AF37] text-[#2D5016] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#C09F27] transition-all duration-300 shadow-lg"
              >
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <div className="bg-[#F5EFE0] rounded-2xl p-8 transform rotate-3">
                <img src="/handandplant.png" alt="Our Farm" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2D5016] mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto mb-16">
            Don't just take our word for it. Here's what families across the region are saying about Aadhya Farms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  P
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[#2D5016]">Priya Sharma</h4>
                  <p className="text-[#7A5C3C] text-sm">Mumbai</p>
                </div>
              </div>
              <p className="text-[#7A5C3C] italic">
                "The milk quality is exceptional! My children love the taste, and I love knowing it's completely natural and healthy."
              </p>
              <div className="flex text-[#D4AF37] mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#2D5016] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  R
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[#2D5016]">Rajesh Kumar</h4>
                  <p className="text-[#7A5C3C] text-sm">Pune</p>
                </div>
              </div>
              <p className="text-[#7A5C3C] italic">
                "Fresh delivery every morning! The farm stay experience was amazing - truly connects you with nature and sustainable living."
              </p>
              <div className="flex text-[#D4AF37] mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[#2D5016]">Anita Patel</h4>
                  <p className="text-[#7A5C3C] text-sm">Nashik</p>
                </div>
              </div>
              <p className="text-[#7A5C3C] italic">
                "Finally found a dairy farm I can trust completely. The organic certification and transparent practices give me complete peace of mind."
              </p>
              <div className="flex text-[#D4AF37] mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 mb-20 text-center bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] rounded-3xl p-12 md:p-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2D5016] mb-6">
            Ready to Experience Pure Organic Goodness?
          </h2>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto mb-12">
            Join thousands of satisfied customers who have made the switch to healthier, sustainable dairy products. Order today or visit our farm to see the difference for yourself.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-[#2D5016] text-[#F5EFE0] px-10 py-5 rounded-lg text-xl font-semibold hover:bg-[#3D6020] transition-all duration-300 shadow-xl transform hover:-translate-y-1"
            >
              Order Now
            </button>
            <button
              onClick={() => setCurrentPage('farmstay')}
              className="bg-white border-2 border-[#2D5016] text-[#2D5016] px-10 py-5 rounded-lg text-xl font-semibold hover:bg-[#2D5016] hover:text-white transition-all duration-300 shadow-xl transform hover:-translate-y-1"
            >
              Visit Our Farm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
