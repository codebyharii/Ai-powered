import React from 'react';
import { Sprout, BarChart3, History, Globe, LogOut } from 'lucide-react';

const Navigation = ({ currentTab, setCurrentTab, language, setLanguage, translations, onLogout }) => {
  const t = translations[language];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-xs text-gray-500 -mt-1">
                {language === 'en' ? 'by Team IMPACTERS' : 'टीम इम्पैक्टर्स द्वारा'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === 'dashboard'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              {t.dashboard}
            </button>
            
            <button
              onClick={() => setCurrentTab('history')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === 'history'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="h-4 w-4 mr-1" />
              {t.history}
            </button>
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4 mr-1" />
              {t.logout}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;