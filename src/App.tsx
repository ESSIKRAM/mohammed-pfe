import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/auth/AuthModal";
import { useState } from "react";

function AppRoutes() {
  const { user, logout, upgradeAccount } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const handleLogin = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                isPremium={user?.isPremium}
                username={user?.username}
                remainingQueries={user?.remainingQueries}
                onUpgrade={upgradeAccount}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile
                isPremium={user?.isPremium}
                username={user?.username}
                email={user?.email}
                avatarUrl={user?.avatarUrl}
                onLogout={logout}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={setShowAuthModal}
        defaultTab={authModalTab}
      />

      {/* Tempo Routes */}
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
