"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { LogIn, LogOut, UserCircle, Settings, UserPlus } from "lucide-react";

// Mock authentication state
const useMockAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User"); // Default user name

  // Simulate checking auth state on mount (e.g., from localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem("mockAuthLoggedIn");
    if (storedAuth === "true") {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("mockAuthUserName") || "User");
    }
  }, []);

  const login = (name = "User") => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("mockAuthLoggedIn", "true");
    localStorage.setItem("mockAuthUserName", name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("mockAuthLoggedIn");
    localStorage.removeItem("mockAuthUserName");
  };

  return { isLoggedIn, userName, login, logout };
};


export default function UserAvatarButton() {
  const { isLoggedIn, userName, logout } = useMockAuth();
  // This component needs to be a client component due to useState and useEffect for mock auth
  // To prevent hydration errors with localStorage, we ensure it's only accessed client-side
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    setClientReady(true);
  }, []);

  if (!clientReady) {
    // Render a placeholder or nothing during server render / initial client render before hydration
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" disabled>Login</Button>
        <Button disabled>Sign Up</Button>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100.png" alt={userName} data-ai-hint="profile user" />
              <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {/* Could be user's email */}
                user@example.com 
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/preferences">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href={siteConfig.authNav.signIn}>
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Link>
      </Button>
      <Button asChild>
        <Link href={siteConfig.authNav.signUp}>
          <UserPlus className="mr-2 h-4 w-4" /> Sign Up
        </Link>
      </Button>
    </div>
  );
}
