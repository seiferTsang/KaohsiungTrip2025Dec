import React, { useState } from 'react';
import { ITINERARY_DATA, STORAGE_PREFIX } from './constants';
import AttractionCard from './components/AttractionCard';
import WeatherWidget from './components/WeatherWidget';

const App: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDayChange = (index: number) => {
    if (index === currentDayIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDayIndex(index);
      setIsAnimating(false);
    }, 200); // Wait for fade out
  };

  const clearAllNotes = () => {
    if (window.confirm('確定要刪除所有筆記嗎？這個動作無法復原。')) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      // Force re-render by reloading or state update trick (reloading is safest for full clear)
      window.location.reload();
    }
  };

  const currentSchedule = ITINERARY_DATA[currentDayIndex];

  return (
    <div className="min-h-screen bg-[#F0F8FF] font-sans pb-20">
      {/* Header with Doraemon Theme Colors */}
      <header className="sticky top-0 z-50 bg-[#0096df] text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
             {/* Doraemon Bell Icon SVG */}
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-inner">
                <div className="w-8 h-8 bg-[#fec31d] rounded-full border-2 border-black relative">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black"></div>
                    <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full opacity-80"></div>
                </div>
             </div>
             <div>
                <h1 className="text-xl font-black tracking-wide">高雄5日4夜</h1>
                <p className="text-xs font-medium text-blue-100">多啦A夢特別篇</p>
             </div>
          </div>
          <button 
            onClick={clearAllNotes}
            className="text-xs bg-[#dd0018] hover:bg-red-600 text-white px-3 py-1.5 rounded-full font-bold shadow transition-colors"
          >
            清除筆記
          </button>
        </div>
        
        {/* Day Tabs */}
        <div className="max-w-3xl mx-auto px-2 pb-2">
            <div className="flex justify-between bg-blue-800/30 p-1 rounded-xl backdrop-blur-sm overflow-x-auto no-scrollbar">
                {ITINERARY_DATA.map((day, index) => (
                    <button
                        key={day.date}
                        onClick={() => handleDayChange(index)}
                        className={`
                            flex-1 min-w-[60px] py-2 px-1 rounded-lg text-center transition-all duration-300 mx-0.5
                            flex flex-col items-center justify-center
                            ${currentDayIndex === index 
                                ? 'bg-white text-[#0096df] shadow-md scale-100' 
                                : 'text-blue-100 hover:bg-white/10 scale-95'}
                        `}
                    >
                        <span className="text-xs opacity-80 font-bold">{day.date}</span>
                        <span className="text-sm font-black leading-none mt-0.5">{day.dayLabel}</span>
                    </button>
                ))}
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        
        <WeatherWidget 
          selectedDate={currentSchedule.date} 
          dayIndex={currentDayIndex} 
        />

        <div className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-2 bg-[#dd0018] rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-800">{currentSchedule.date} 行程一覽</h2>
            </div>
            
            <div className="space-y-6">
                {currentSchedule.items.map((item) => (
                    <AttractionCard key={item.id} item={item} />
                ))}
            </div>
        </div>

      </main>
      
      {/* Footer */}
      <footer className="text-center py-8 text-blue-300 text-sm">
        <p>Made with 💙 & 🔔</p>
        <p className="text-xs mt-1 opacity-70">Travel PWA Demo</p>
      </footer>
    </div>
  );
};

export default App;