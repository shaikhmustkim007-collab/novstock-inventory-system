

import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { LogIn, LogOut, UserPlus, Package } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const Navbar = () => {
  const { state, dispatch, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = !!state.user;

  const handleLogout = async () => {
    try {
      const { data } = await axiosInstance.post("/user/logout");
      dispatch({ type: "LOGOUT" });
      toast.success(data.message);
      navigate("/home");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-xl font-black text-slate-900 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <Package className="text-blue-600" />
          <span>
            NOV<span className="text-blue-600">STOCK</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-1">
              {[
                { to: "/home", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/card", label: "Card" },
              ].map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {userRole === "admin" && (
                <NavigationMenuItem>
                  <NavLink
                    to="/addProduct"
                    className="px-4 py-2 rounded-full text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    Add Product
                  </NavLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" /> Logout
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/register")}
                className="hidden sm:flex"
              >
                Register
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/login")}
                className="bg-slate-900 hover:bg-slate-800"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
