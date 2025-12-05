import { Heart, Leaf, Award, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE0] to-[#E8DCC8] py-20 relative overflow-hidden">
      <div className="absolute left-0 top-1/4 opacity-4 pointer-events-none">
        <img src="/cow.png" alt="" className="h-80 w-auto" />
      </div>
      <div className="absolute right-0 bottom-0 opacity-4 pointer-events-none">
        <img src="/tree.png" alt="" className="h-96 w-auto" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2D5016] mb-6">
            About Aadhya Farms
          </h1>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto leading-relaxed">
            For You, The Essence of Nature
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-4">Our Story</h2>
              <p className="text-[#7A5C3C] leading-relaxed text-lg mb-4">
                Aadhya Farms was born from a simple dream - to bring pure, organic dairy products
                to families across India while preserving traditional farming practices. Nestled
                in the heart of rural India, our farm is home to happy cows, goats, and chickens
                that roam freely in lush green pastures.
              </p>
              <p className="text-[#7A5C3C] leading-relaxed text-lg">
                We believe that when you take care of the land and animals with love, they give
                back the purest products. Every drop of milk, every egg, and every product from
                our farm carries the essence of nature and the care we put into our work.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] p-8 rounded-2xl shadow-lg text-[#F5EFE0]">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                To provide 100% organic, chemical-free dairy products while promoting sustainable
                farming practices and offering authentic farm experiences that reconnect people
                with nature and their roots.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#2D5016] rounded-3xl"></div>
              <div className="relative z-10 w-full rounded-3xl shadow-2xl bg-white p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-8 pointer-events-none">
                  <img src="/cow.png" alt="" className="h-full w-full object-cover" />
                </div>
                <img
                  src="/cow.png"
                  alt="Aadhya Farms"
                  className="relative z-10 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-[#F5EFE0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">Animal Welfare</h3>
            <p className="text-[#7A5C3C]">
              Our animals are treated with love and respect, ensuring their health and happiness
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-[#F5EFE0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">100% Organic</h3>
            <p className="text-[#7A5C3C]">
              No chemicals, pesticides, or artificial additives in our farming process
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[#F5EFE0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">Quality First</h3>
            <p className="text-[#7A5C3C]">
              Every product meets the highest standards of purity and freshness
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-[#2D5016] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-[#F5EFE0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D5016] mb-3">Sustainable</h3>
            <p className="text-[#7A5C3C]">
              Eco-friendly practices that protect and nurture our environment
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-12 flex items-center justify-center">
              <img
                src="/goat.png"
                alt="Farm Animal"
                className="h-64 w-auto"
              />
            </div>
            <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-12 flex items-center justify-center border-l border-r border-[#D4AF37]">
              <img
                src="/hen.png"
                alt="Farm Animal"
                className="h-64 w-auto"
              />
            </div>
            <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-12 flex items-center justify-center">
              <img
                src="/tree.png"
                alt="Nature"
                className="h-64 w-auto"
              />
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] p-12 text-[#F5EFE0] text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Farm Family</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              Experience the difference that care, tradition, and organic practices make.
              Visit us, taste our products, and become part of the Aadhya Farms family.
            </p>
            <button className="bg-[#D4AF37] text-[#2D5016] px-10 py-4 rounded-lg text-xl font-semibold hover:bg-[#C09F27] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Visit Our Farm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
