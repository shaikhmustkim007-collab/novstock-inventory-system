import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Branding */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">
              NOV<span className="text-blue-600">STOCK</span>
            </h2>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              The modern way to manage your inventory. Built for performance, 
              scaled for growth, and designed for simplicity.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Product</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><a href="/home" className="hover:text-blue-600 transition-colors">Catalog</a></li>
              <li><a href="/about" className="hover:text-blue-600 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} NovCode Solutions. All rights reserved.
          </p>
          
          {/* Minimal Socials */}
          <div className="flex gap-6">
            <div className="h-5 w-5 bg-slate-200 rounded-full hover:bg-blue-500 transition-colors cursor-pointer" />
            <div className="h-5 w-5 bg-slate-200 rounded-full hover:bg-blue-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;