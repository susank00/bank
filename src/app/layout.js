// app/layout.js
import { AuthProvider } from "./context/AuthContext";
import "../styles/globals.css"; // Global styles
import Navbar from "./components/Navbar"; // Import Navbar

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar /> {/* Render Navbar on every page */}
          {children} {/* Render page-specific content */}
        </AuthProvider>
      </body>
    </html>
  );
}
