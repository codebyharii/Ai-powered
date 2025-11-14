import React, { useState } from 'react';
import { BarChart3, Wheat, MapPin, Loader2 } from 'lucide-react';

const Dashboard = ({ language, translations }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    cropType: '',
    soilType: '',
    plantingDate: '',
    location: null
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError(language === 'en' ? 
        'Geolocation is not supported by this browser' : 
        'यह ब्राउज़र भौगोलिक स्थिति का समर्थन नहीं करता');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          location: {
            lat: latitude.toFixed(4),
            lon: longitude.toFixed(4)
          }
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = language === 'en' ? 
              'Location access denied by user' : 
              'उपयोगकर्ता द्वारा स्थान की पहुंच से मना किया गया';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = language === 'en' ? 
              'Location information is unavailable' : 
              'स्थान की जानकारी उपलब्ध नहीं है';
            break;
          case error.TIMEOUT:
            errorMessage = language === 'en' ? 
              'Location request timed out' : 
              'स्थान अनुरोध का समय समाप्त हो गया';
            break;
          default:
            errorMessage = language === 'en' ? 
              'An unknown error occurred' : 
              'एक अज्ञात त्रुटि हुई';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const clearLocation = () => {
    setFormData({...formData, location: null});
    setLocationError('');
  };

  const generatePrediction = () => {
    const yields = ['2.3', '2.8', '3.1', '3.5', '4.2', '4.8', '5.1'];
    const randomYield = yields[Math.floor(Math.random() * yields.length)];
    
    setPrediction({
      yield: `${randomYield} tons/ha`,
      yieldHi: `${randomYield} टन/हेक्टेयर`,
      location: formData.location,
      recommendations: [
        { icon: '💧', text: t.irrigateRec },
        { icon: '🌱', text: t.fertilizerRec },
        { icon: '🐛', text: t.pestRec }
      ]
    });
  };

  const handleSubmit = () => {
    if (formData.cropType && formData.soilType && formData.plantingDate) {
      generatePrediction();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Wheat className="h-5 w-5 mr-2 text-green-600" />
            Crop Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.cropType}
              </label>
              <select
                value={formData.cropType}
                onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">{t.selectCrop}</option>
                <option value="wheat">{t.wheat}</option>
                <option value="rice">{t.rice}</option>
                <option value="corn">{t.corn}</option>
                <option value="soybean">{t.soybean}</option>
                <option value="tomato">{t.tomato}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.soilType}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">{t.selectSoil}</option>
                <option value="clay">{t.clay}</option>
                <option value="sandy">{t.sandy}</option>
                <option value="loam">{t.loam}</option>
                <option value="silt">{t.silt}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.plantingDate}
              </label>
              <input
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Location Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.location}
              </label>
              
              {!formData.location ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingLocation ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    )}
                    {isLoadingLocation 
                      ? (language === 'en' ? 'Getting Location...' : 'स्थान प्राप्त कर रहे हैं...')
                      : t.useCurrentLocation
                    }
                  </button>
                  
                  {locationError && (
                    <p className="text-sm text-red-600 mt-1">{locationError}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm text-green-800">
                      {language === 'en' 
                        ? `Lat ${formData.location.lat}, Lon ${formData.location.lon}`
                        : `अक्षांश ${formData.location.lat}, देशांतर ${formData.location.lon}`
                      }
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={clearLocation}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    {language === 'en' ? 'Clear' : 'हटाएं'}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
            >
              {t.predict}
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Prediction Results
          </h2>
          
          {prediction ? (
            <div className="space-y-6">
              {/* Yield Prediction */}
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t.predictedYield}
                </h3>
                <div className="text-3xl font-bold text-green-600">
                  {language === 'en' ? prediction.yield : prediction.yieldHi}
                </div>
              </div>

              {/* Location Info in Results */}
              {prediction.location && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {t.predictionLocation}
                  </h3>
                  <p className="text-sm text-blue-700">
                    {language === 'en' 
                      ? `Latitude: ${prediction.location.lat}, Longitude: ${prediction.location.lon}`
                      : `अक्षांश: ${prediction.location.lat}, देशांतर: ${prediction.location.lon}`
                    }
                  </p>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t.recommendations}</h3>
                <div className="space-y-3">
                  {prediction.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl mr-3">{rec.icon}</span>
                      <p className="text-sm text-gray-700 flex-1">{rec.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>{t.fillForm}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;