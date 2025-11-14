import React from 'react';
import { Sprout, Globe } from 'lucide-react';

const LoginPage = ({ onLogin, language, setLanguage, translations }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sprout className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.tagline}</p>
            
            {/* IMPACTERS Team Badge */}
            <div className="mt-4 inline-block">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Team IMPACTERS 🚀
              </span>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t.username}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t.username}
                defaultValue="demo"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t.password}
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t.password}
                defaultValue="demo"
              />
            </div>
            <button
              onClick={onLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              {t.login}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center justify-center mx-auto text-gray-600 hover:text-gray-800"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;