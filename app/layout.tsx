import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
	title: {
		default: "Outplacement para Ejecutivos en Perú | IBOutplacement",
		template: "%s | IBOutplacement",
	},
	description: "Blog profesional de IBGroup: artículos, noticias y recursos actualizados.",
	keywords: [
		"IBGroup",
		"Blog",
		"Noticias",
		"Artículos",
		"Recursos",
		"Tecnología",
		"Negocios"
	],
	authors: [{ name: "IBGroup", url: "https://ibgroup.com" }],
	creator: "IBGroup",
	openGraph: {
		title: "Outplacement para Ejecutivos en Perú | IBOutplacement",
		description: "Blog profesional de IBGroup: artículos, noticias y recursos actualizados.",
		url: "https://ibgroup.com/blog",
		siteName: "IBGroup Blog",
		locale: "es_ES",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Outplacement para Ejecutivos en Perú | IBOutplacement",
		description: "Blog profesional de IBGroup: artículos, noticias y recursos actualizados.",
		creator: "@ibgroup",
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function Layout({ children }: { children: React.ReactNode; }) {
	return (
		<html lang="es" className={inter.variable}>
			<head />
			<body className="min-h-screen bg-background text-foreground font-sans antialiased">
				{children}
			</body>
		</html>
	);
}
