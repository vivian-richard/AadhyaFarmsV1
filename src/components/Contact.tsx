import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE0] to-[#E8DCC8] py-20 relative overflow-hidden">
      <div className="absolute right-0 top-1/3 opacity-4 pointer-events-none">
        <img src="/hen.png" alt="" className="h-80 w-auto scale-x-[-1]" />
      </div>
      <div className="absolute left-0 bottom-0 opacity-4 pointer-events-none">
        <img src="/goat.png" alt="" className="h-96 w-auto" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2D5016] mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-[#7A5C3C] max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or farm stay? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#2D5016] p-4 rounded-lg">
                  <Phone className="h-8 w-8 text-[#F5EFE0]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D5016] mb-2">Phone</h3>
                  <p className="text-[#7A5C3C] text-lg mb-2">Give us a call for quick assistance</p>
                  <a href="tel:+918332090317" className="text-[#D4AF37] text-xl font-semibold hover:underline">
                    +91 8332090317
                  </a>
                  <br />
                  <a href="tel:+919502961413" className="text-[#D4AF37] text-xl font-semibold hover:underline">
                    +91 9502961413
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#2D5016] p-4 rounded-lg">
                  <Mail className="h-8 w-8 text-[#F5EFE0]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D5016] mb-2">Email</h3>
                  <p className="text-[#7A5C3C] text-lg mb-2">Send us an email anytime</p>
                  <a href="mailto:contactus@aadhyafarms.in" className="text-[#D4AF37] text-xl font-semibold hover:underline">
                    contactus@aadhyafarms.in
                  </a>
                  <br />
                  <a href="mailto:contactus@aadhyafarms.in" className="text-[#D4AF37] text-xl font-semibold hover:underline">
                    contactus@aadhyafarms.in
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#2D5016] p-4 rounded-lg">
                  <MapPin className="h-8 w-8 text-[#F5EFE0]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D5016] mb-2">Location</h3>
                  <p className="text-[#7A5C3C] text-lg mb-2">Visit our organic farm</p>
                  <p className="text-[#7A5C3C] text-lg">
                    Aadhya Farms<br />
                    Village Road, Near Green Valley<br />
                    District, State, India - 123456
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#2D5016] p-4 rounded-lg">
                  <Clock className="h-8 w-8 text-[#F5EFE0]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D5016] mb-2">Working Hours</h3>
                  <p className="text-[#7A5C3C] text-lg">
                    Monday - Saturday: 6:00 AM - 8:00 PM<br />
                    Sunday: 7:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-[#2D5016] mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-[#2D5016] font-semibold mb-2 text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none transition-colors text-lg"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-[#2D5016] font-semibold mb-2 text-lg">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none transition-colors text-lg"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[#2D5016] font-semibold mb-2 text-lg">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none transition-colors text-lg"
                  placeholder="+91 8332090317"
                />
              </div>

              <div>
                <label className="block text-[#2D5016] font-semibold mb-2 text-lg">
                  Subject
                </label>
                <select className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none transition-colors text-lg">
                  <option>Product Inquiry</option>
                  <option>Farm Stay Booking</option>
                  <option>Bulk Orders</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2D5016] font-semibold mb-2 text-lg">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E8DCC8] focus:border-[#2D5016] focus:outline-none transition-colors text-lg resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D5016] text-[#F5EFE0] py-4 rounded-lg text-xl font-semibold hover:bg-[#3D6020] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Send className="h-6 w-6" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#2D5016] to-[#3D6020] rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 text-[#F5EFE0]">
              <h2 className="text-4xl font-bold mb-6">Visit Our Farm</h2>
              <p className="text-xl leading-relaxed mb-8">
                Experience the beauty of organic farming firsthand. Our farm is open for visitors
                who want to see where their food comes from and learn about sustainable agriculture.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg">Free farm tours available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg">Meet our happy animals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg">Learn organic farming techniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#D4AF37] text-2xl">✓</span>
                  <span className="text-lg">Fresh products available on-site</span>
                </div>
              </div>
            </div>
            <div className="bg-[#F5EFE0] p-12 flex flex-col items-center justify-center gap-8">
              <img
                src="/cow.png"
                alt="Adult Cow"
                className="h-72 w-auto"
              />
              <img
                src="/cow.png"
                alt="Calf"
                className="h-48 w-auto absolute bottom-6 right-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
