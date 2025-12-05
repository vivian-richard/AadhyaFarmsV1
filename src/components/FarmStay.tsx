import { Calendar, Users, Home, Utensils, Sun, Moon } from 'lucide-react';

export default function FarmStay() {
  const amenities = [
    { icon: Home, title: 'Comfortable Rooms', description: 'Clean, spacious rooms with modern amenities' },
    { icon: Utensils, title: 'Organic Meals', description: 'Fresh farm-to-table meals three times daily' },
    { icon: Sun, title: 'Farm Activities', description: 'Milk cows, feed animals, harvest vegetables' },
    { icon: Users, title: 'Family Friendly', description: 'Perfect for families and group retreats' },
  ];

  const activities = [
    'Morning cow milking experience',
    'Feeding farm animals',
    'Organic vegetable harvesting',
    'Traditional cooking workshops',
    'Nature walks and bird watching',
    'Sunset tractor rides',
    'Bonfire nights with folk music',
    'Yoga and meditation sessions',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE0] to-[#E8DCC8] py-20 relative overflow-hidden">
      <div className="absolute right-0 top-0 opacity-4 pointer-events-none">
        <img src="/goat.png" alt="" className="h-96 w-auto" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2D5016] mb-6">
            Farm Stay Experience
          </h1>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto leading-relaxed">
            Escape the city chaos and immerse yourself in authentic farm life.
            Experience nature, learn organic farming, and create lasting memories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-12 flex items-center justify-center">
              <div className="bg-[#F5EFE0] rounded-2xl p-8 transform rotate-3">
                <img
                  src="/farmstay1.png"
                  alt="Farm Animals"
                  className="h-80 w-auto rounded-lg"
                />
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#2D5016] mb-4">
                Reconnect with Nature
              </h2>
              <p className="text-[#7A5C3C] leading-relaxed text-lg">
                Our farm stay offers a unique opportunity to disconnect from the digital world
                and reconnect with nature. Wake up to the sounds of roosters, breathe fresh air,
                and experience the simple joys of rural life. Perfect for families, couples, and
                anyone seeking peace and authenticity.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-start space-x-4"
              >
                <div className="bg-[#2D5016] p-4 rounded-lg">
                  <amenity.icon className="h-8 w-8 text-[#F5EFE0]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D5016] mb-2">{amenity.title}</h3>
                  <p className="text-[#7A5C3C]">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12">
              <h2 className="text-4xl font-bold text-[#2D5016] mb-8">Farm Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F5EFE0] transition-colors duration-300"
                  >
                    <span className="text-[#D4AF37] text-xl mt-1">●</span>
                    <span className="text-[#7A5C3C] text-lg">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] p-12 flex items-center justify-center relative overflow-hidden">
              {/* <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img src="/hen.png" alt="" className="h-full w-full object-cover" />
              </div> */}
              <div className="bg-[#F5EFE0] rounded-2xl p-8 transform rotate-3">
                <img
                  src="/farmactivites.png"
                  alt="Farm Activities"
                  className="h-80 w-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] rounded-2xl shadow-2xl p-12 text-[#F5EFE0]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Booking Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#F5EFE0] bg-opacity-10 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Sun className="h-8 w-8 text-[#D4AF37]" />
                  <h3 className="text-2xl font-bold">Day Visit</h3>
                </div>
                <p className="text-3xl font-bold text-[#D4AF37] mb-2">₹1,500</p>
                <p className="text-lg">per person</p>
                <p className="mt-4 text-sm opacity-90">
                  Includes breakfast, lunch, and all farm activities
                </p>
              </div>

              <div className="bg-[#F5EFE0] bg-opacity-10 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Moon className="h-8 w-8 text-[#D4AF37]" />
                  <h3 className="text-2xl font-bold">Overnight Stay</h3>
                </div>
                <p className="text-3xl font-bold text-[#D4AF37] mb-2">₹3,000</p>
                <p className="text-lg">per person</p>
                <p className="mt-4 text-sm opacity-90">
                  Includes accommodation, all meals, and activities
                </p>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-[#D4AF37] text-[#2D5016] px-12 py-4 rounded-lg text-xl font-semibold hover:bg-[#C09F27] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto">
                <Calendar className="h-6 w-6" />
                <span>Book Your Farm Stay</span>
              </button>
              <p className="mt-6 text-lg opacity-90">
                Call us at +91 8332090317 or email contactus@aadhyafarms.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
