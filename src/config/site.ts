export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CareerCraft AI",
  description: "Your personal AI toolkit for crafting CVs, tracking job applications, and getting feedback to enhance your job search.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Documents",
      href: "/documents",
    },
    {
      title: "Preferences",
      href: "/preferences",
    },
  ],
  authNav: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  links: {
    github: "https://github.com/firebase/firebase-studio", // Replace with actual project link
    twitter: "https://twitter.com/firebase", // Replace with actual project link
  },
};
