import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import HistoryPage from "./components/HistoryPage";
import LoginPage from "./components/LoginPage";
import { translations } from "./data/translations";

function App() {
  // App States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currentTab, setCurrentTab] = useState("dashboard");

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login Screen */}
      {!isLoggedIn ? (
        <LoginPage
          onLogin={handleLogin}
          language={language}
          setLanguage={setLanguage}
          translations={translations}
        />
      ) : (
        <>
          {/* Navigation Bar */}
          <Navigation
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            language={language}
            setLanguage={setLanguage}
            translations={translations}
            onLogout={handleLogout}
          />

          {/* Page Content */}
          <div className="p-4">
            {currentTab === "dashboard" && (
              <Dashboard language={language} translations={translations} />
            )}

            {currentTab === "history" && (
              <HistoryPage language={language} translations={translations} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
