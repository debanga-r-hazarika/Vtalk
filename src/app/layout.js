import localFont from "next/font/local";
import "./globals.css";

const gtMaru = localFont({
  src: [
    {
      path: "../../public/font/GTMaruLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/GTMaruRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/GTMaruMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/GTMaruBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/GTMaruBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gt-maru",
});

export const metadata = {
  title: "V talk - Create Your AI Persona",
  description: "Create your own AI character by defining its personality, communication style, interests, memories, and behavior. Talk with your AI persona naturally and get paid.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${gtMaru.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF5] text-black font-sans">
        {children}
      </body>
    </html>
  );
}
