import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}