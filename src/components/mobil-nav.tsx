import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { GroupIcon, Home, LineChart, LucideOutdent, Menu, Package, Package2, ShoppingCart, Users} from 'lucide-react'

 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

 import Link from 'next/link'
import { Badge } from './ui/badge'
import {

} from "lucide-react"

interface SidbarProps {
  onLinkClick: (content: string) => void;
  activeContent: string | null;
}

const MobilNav: React.FC<SidbarProps> = ({ onLinkClick, activeContent }) => {
  
  const isActive = (content: string) => activeContent === content ? 'bg-muted text-primary' : 'text-muted-foreground';

  return (
    <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                    <span className="">BCL Stock</span>
                </Link>
                
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
              Article In
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </button>
            <button
              onClick={() => onLinkClick('products')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('products')}`}
            >
              <LucideOutdent className="h-4 w-4" />
              Out
            </button>
            
            <button
              onClick={() => onLinkClick('analytics')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('analytics')}`}
            >
              <GroupIcon className="h-4 w-4" />
              Groups
            </button>

            <button
              onClick={() => onLinkClick('users')}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('users')}`}
            >
              <Users className="h-4 w-4" />
              Users
            </button>

              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
  )
}

export default MobilNav;