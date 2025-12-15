import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/career-hub" className="flex items-center gap-2">
            <div className="font-bold text-xl tracking-tight">
              indeed<span className="text-accent">flex</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-accent transition-colors">
                Roles <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/industries/hospitality" className="cursor-pointer">Hospitality</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/industries/industrial" className="cursor-pointer">Industrial & Warehouse</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/industries/retail" className="cursor-pointer">Retail</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/industries/facilities" className="cursor-pointer">Facilities</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-accent transition-colors">
                Locations <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/austin" className="cursor-pointer">Austin, TX</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/dallas" className="cursor-pointer">Dallas, TX</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/houston" className="cursor-pointer">Houston, TX</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/nashville" className="cursor-pointer">Nashville, TN</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/atlanta" className="cursor-pointer">Atlanta, GA</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/cincinnati" className="cursor-pointer">Cincinnati, OH</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/columbus" className="cursor-pointer">Columbus, OH</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/career-hub/locations/ontario" className="cursor-pointer">Ontario, CA</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/career-hub/tools" className="hover:text-accent transition-colors">
              Tools
            </Link>

            <Link to="/career-hub/guides" className="hover:text-accent transition-colors">
              Career Guides
            </Link>

            <Link to="/career-hub/financial-tips" className="hover:text-accent transition-colors">
              Financial Tips
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Get the App
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-4">
              <Link 
                to="/career-hub/industries/hospitality" 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hospitality Jobs
              </Link>
              <Link 
                to="/career-hub/industries/industrial" 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Warehouse Jobs
              </Link>
              <Link 
                to="/career-hub/industries/retail" 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Retail Jobs
              </Link>
              <Link 
                to="/career-hub/tools" 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Career Tools
              </Link>
              <Link 
                to="/career-hub/guides" 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Career Guides
              </Link>
              <Link 
                to="/career-hub/financial-tips" 
                className="hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Financial Tips
              </Link>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full mt-2">
                Get the App
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
