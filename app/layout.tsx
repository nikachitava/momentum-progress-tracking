import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";

const fontFiraGo = localFont({
    src: [
        {
            path: "../public/fonts/FiraGO-Medium.otf",
            weight: "500",
            style: "medium",
        },
        {
            path: "../public/fonts/FiraGO-Regular.otf",
            weight: "400",
            style: "regular",
        },
        {
            path: "../public/fonts/FiraGO-SemiBold.otf",
            weight: "600",
            style: "semibold",
        },
    ],
});

export const metadata: Metadata = {
    title: "Momentum - Progress Tracking Software",
    description: "Software to track the progress",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${fontFiraGo.className} antialiased`}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
