import "./globals.css";

export const metadata = {
  title: "Module 2 Q&A Packs — Civil Engineering CAT Prep",
  description: "CAT-style Q&A revision packs for civil engineering students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
          rel="stylesheet"
        />
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
