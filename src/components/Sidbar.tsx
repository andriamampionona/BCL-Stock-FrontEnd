import React from 'react';
import { Home, ShoppingCart, Package, Users, LineChart, Package2, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';

interface SidbarProps {
  onLinkClick: (content: string) => void;
  activeContent: string | null;
}

const Sidbar: React.FC<SidbarProps> = ({ onLinkClick, activeContent }) => {
  const isActive = (content: string) => activeContent === content ? 'bg-muted text-primary' : 'text-muted-foreground';

  return (
   <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">BCL Stock</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <button
              onClick={() => onLinkClick('dashboard')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('dashboard')}`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => onLinkClick('orders')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('orders')}`}
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </button>
            <button
              onClick={() => onLinkClick('products')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('products')}`}
            >
              <Package className="h-4 w-4" />
              Products
            </button>
            <button
              onClick={() => onLinkClick('users')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('users')}`}
            >
              <Users className="h-4 w-4" />
              Users
            </button>
            <button
              onClick={() => onLinkClick('analytics')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('analytics')}`}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidbar;