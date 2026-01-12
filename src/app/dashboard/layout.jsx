"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Loader2,
  Bell,
  NotebookIcon,
  PencilRuler,
  Share2,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: NotebookIcon,
    },
    {
      name: "Notification",
      href: "/dashboard/notification",
      icon: Bell,
    },
    {
      name: "Branding",
      href: "/dashboard/branding",
      icon: PencilRuler,
    },
    {
      name: "Social",
      href: "/dashboard/social",
      icon: Share2,
    },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      // await handleLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b bg-primary border-r border-white/10 backdrop-blur-xl">
        
          <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <span className="text-3xl font-extrabold font-onest">
                FlowEdit
              </span>
            </Link>
            
           
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

        
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                    active
                      ? "bg-purple-500/20 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "hover:bg-white/5 border border-transparent hover:border-purple-500/30 active:bg-white/10"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      active
                        ? "text-accent"
                        : "text-tertiary group-hover:text-accent/40"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      active
                        ? "text-accent"
                        : "text-tertiary group-hover:text-accent/40"
                    }`}
                  >
                    {item.name}
                  </span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </Link>
              );
            })}

            
            <button
              disabled={isLoading}
              onClick={onLogout}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl 
                hover:bg-white/5 border border-transparent hover:border-purple-500/30 
                transition-all duration-300 group text-left active:bg-white/10
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              aria-busy={isLoading}
              aria-label={isLoading ? "Logging out…" : "Logout"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium text-gray-400">
                    Logging out…
                  </span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <span className="font-medium text-gray-400 group-hover:text-white transition-colors">
                    Logout
                  </span>
                </>
              )}
            </button>
          </nav>

         
         <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 lg:bg-white lg:text-purple-600 lg:shadow-lg hidden lg:block"
              >
                Desktop
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 lg:text-gray-400 lg:hover:text-white lg:hidden bg-white text-purple-600 shadow-lg"
              >
                Mobile
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 text-gray-400 hover:text-white hidden lg:block"
              >
                Mobile
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 text-gray-400 hover:text-white lg:hidden"
              >
                Desktop
              </button>
            </div>
          </div>
        </div>
      </aside>

    
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

     
      <div className="lg:ml-72 pb-20 lg:pb-0">
     
        <header className="sticky top-0 z-20 bg-secondary border-b border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
         
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-900 border border-gray-800 transition-colors active:bg-gray-800"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="w-5 h-5 text-white" />
              </button>

              <Link href="/dashboard" className="lg:hidden">
                <span className="text-xl font-extrabold font-onest">
                  FlowEdit
                </span>
              </Link>
            </div>

           
            <div className="flex items-center gap-2 lg:gap-3">
             
              <button 
                className="hidden sm:flex bg-tertiary p-2.5 lg:p-3 rounded-full hover:bg-purple-500/20 transition-colors active:scale-95"
                aria-label="Notifications"
              >
                <Bell className="text-accent w-4 h-4 lg:w-5 lg:h-5" />
              </button>

            
              <button 
                className="hidden sm:flex bg-tertiary p-2.5 lg:p-3 rounded-full hover:bg-purple-500/20 transition-colors active:scale-95"
                aria-label="Settings"
              >
                <Settings className="text-accent w-4 h-4 lg:w-5 lg:h-5" />
              </button>

          
              <Link
                href="/dashboard/profile"
                className="relative flex items-center gap-2 px-2 py-1.5 lg:px-3 lg:py-2 rounded-full lg:rounded-full bg-tertiary hover:border-purple-400/70 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.7)] transition-all duration-300 active:scale-95"
              >
                <div className="relative w-7 h-7 lg:w-10 lg:h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-purple-400 flex-shrink-0">
                  <Image
                    src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <span className="hidden lg:block text-sm lg:text-base font-semibold text-accent">
                  John Doe
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
      </div>

    </div>
  );
}