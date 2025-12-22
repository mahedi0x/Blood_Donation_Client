import React from "react";
import { Link } from "react-router";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowRight,
  Droplet
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#ef233c] p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Droplet className="text-white fill-white" size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter italic">
                Blood<span className="text-[#ef233c]">Bridge</span>
              </span>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              Connecting heroes with those in need. Join our community-driven platform to make blood donation accessible, fast, and safe for everyone.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#ef233c] hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/search-donors" className="hover:text-[#ef233c] transition-colors">Search Donors</Link></li>
                <li><Link to="/dashboard/create-donation-request" className="hover:text-[#ef233c] transition-colors">Request Blood</Link></li>
                <li><Link to="/donors" className="hover:text-[#ef233c] transition-colors">Donor List</Link></li>
                <li><Link to="/funding" className="hover:text-[#ef233c] transition-colors">Funding</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/about" className="hover:text-[#ef233c] transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-[#ef233c] transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-[#ef233c] transition-colors">FAQs</Link></li>
                <li><Link to="/privacy" className="hover:text-[#ef233c] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-sm font-medium text-gray-400 leading-relaxed">
              Get weekly updates on local blood drives and community impact stories.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 outline-none focus:border-[#ef233c] transition-all text-white font-bold"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#ef233c] text-white px-4 rounded-xl hover:bg-[#d90429] transition-all flex items-center justify-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Contacts & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Phone size={16} className="text-[#ef233c]" />
              <span>+880 123 456 789</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold">
              <Mail size={16} className="text-[#ef233c]" />
              <span>support@bloodbridge.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold">
              <MapPin size={16} className="text-[#ef233c]" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              © {currentYear} BloodBridge Application. Made with <Heart size={12} className="text-[#ef233c] fill-[#ef233c]" /> for humanity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;