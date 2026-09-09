import type { Metadata } from "next";
import { Outfit, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ChatWidget from "@/components/ai-assistant/chat-widget";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const devanagariFont = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Sagar Bhatiya | Portfolio | AI Engineer & Full Stack Developer",
  description: "Portfolio of Sagar Bhatiya, a Computer Science student and AI Engineer specializing in Artificial Intelligence, LLMs, RAG applications, and Full Stack Web Development.",
  keywords: [
    "Sagar Bhatiya",
    "Portfolio",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "LLMs",
    "RAG Applications",
    "Python",
    "PyTorch",
    "React Developer",
    "Next.js Developer",
    "Software Engineer",
    "DSA",
    "Web Developer"
  ],
  authors: [{ name: "Sagar Bhatiya" }],
  openGraph: {
    title: "Sagar Bhatiya | AI Engineer & Full Stack Developer",
    description: "Portfolio of Sagar Bhatiya, an AI Engineer and Full Stack Developer building intelligent applications and scalable web systems.",
    type: "website",
    locale: "en_US"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${devanagariFont.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <ChatWidget />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
