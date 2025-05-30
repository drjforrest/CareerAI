"use client"; // Required because SidebarProvider and usePathname are client-side

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Briefcase,
  LogOut,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import UserAvatarButton from "@/components/auth/user-avatar-button"; // Re-using the button
import { useSidebar } from "@/components/ui/sidebar"; // Import useSidebar

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/preferences", label: "Preferences", icon: Settings },
];

function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, open, isMobile } = useSidebar();


  return (
    <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} variant="inset" side="left" className="border-r">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Briefcase className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">
            {siteConfig.name}
          </span>
        </Link>
        {/* Hide toggle on mobile as it's handled by sheet overlay click or swipe */}
        {/* Show custom toggle for desktop icon mode */}
         {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="group-data-[collapsible=offcanvas]:hidden"
            onClick={toggleSidebar}
          >
            {open ? <ChevronsLeft className="h-5 w-5" /> : <ChevronsRight className="h-5 w-5" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: 'right', className: 'ml-2' }}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:hidden">
        {/* UserAvatarButton could be placed here or in a top navbar within SidebarInset */}
        {/* For simplicity, let's assume UserAvatarButton is in the main app Navbar */}
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="h-5 w-5" />
          <span>Logout (Mock)</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
       <div className="flex h-full">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-y-auto">
           {/* Mobile specific header with trigger */}
          <header className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2 flex items-center justify-between">
             <Link href="/" className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <div className="flex items-center gap-2">
              <UserAvatarButton />
              <SidebarTrigger />
            </div>
          </header>
          <div className="p-4 sm:p-6 lg:p-8 flex-grow">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
