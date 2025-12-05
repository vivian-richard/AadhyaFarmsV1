import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D5016] text-[#F5EFE0]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/logo-transparent.png"
              alt="Aadhya Farms"
              className="h-32 w-auto mb-4"
            />
            <p className="text-[#E8DCC8] leading-relaxed">
              For You, The Essence of Nature. Pure organic dairy products and authentic farm experiences.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                  Farm Stay
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37]">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+918332090317" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                    +91 8332090317
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:contactus@aadhyafarms.in" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                    contactus@aadhyafarms.in
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="text-[#E8DCC8]">
                  Village Road, Near Green Valley<br />
                  District, State, India - 123456
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37]">Follow Us</h3>
            <p className="text-[#E8DCC8] mb-4">
              Stay connected for updates, offers, and farm stories!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-[#F5EFE0] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="bg-[#F5EFE0] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="bg-[#F5EFE0] bg-opacity-10 p-3 rounded-lg hover:bg-opacity-20 transition-all"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F5EFE0] border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#E8DCC8] text-center md:text-left">
              &copy; 2024 Aadhya Farms. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#E8DCC8] hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
