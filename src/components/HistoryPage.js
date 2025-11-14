import React from 'react';
import { History, MapPin } from 'lucide-react';
import { historyData } from '../data/translations';

const HistoryPage = ({ language, translations }) => {
  const t = translations[language];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center">
            <History className="h-5 w-5 mr-2 text-green-600" />
            {t.pastPredictions}
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {historyData.map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-200">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Crop</label>
                    <p className="text-gray-900">{entry.crop[language]}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Soil Type</label>
                    <p className="text-gray-900">{entry.soil[language]}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date</label>
                    <p className="text-gray-900">{entry.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Yield</label>
                    <p className="text-green-600 font-semibold">
                      {entry.yield[language]}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Location
                    </label>
                    <p className="text-gray-700 text-sm">
                      {entry.location[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {language === 'en' 
                ? 'Location data helps improve prediction accuracy based on local weather and soil conditions.'
                : 'स्थान डेटा स्थानीय मौसम और मिट्टी की स्थिति के आधार पर भविष्यवाणी की सटीकता में सुधार करने में मदद करता है।'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;