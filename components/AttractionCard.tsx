
import React, { useState, useEffect } from 'react';
import { ItineraryItem, NoteData } from '../types';
import { STORAGE_PREFIX, EXPIRY_DAYS } from '../constants';

interface AttractionCardProps {
  item: ItineraryItem;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ item }) => {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.imageUrl);

  useEffect(() => {
    // Reset image source when item changes
    setImgSrc(item.imageUrl);
  }, [item.imageUrl]);

  // Load note from local storage
  useEffect(() => {
    const savedData = localStorage.getItem(`${STORAGE_PREFIX}${item.id}`);
    if (savedData) {
      try {
        const parsed: NoteData = JSON.parse(savedData);
        // Check expiry (simple day difference)
        const diffTime = Math.abs(Date.now() - parsed.timestamp);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays <= EXPIRY_DAYS) {
          setNote(parsed.content);
        } else {
          localStorage.removeItem(`${STORAGE_PREFIX}${item.id}`);
        }
      } catch (e) {
        console.error("Error parsing note", e);
      }
    }
  }, [item.id]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNote(newContent);
    setIsSaved(false);
    
    const data: NoteData = {
      content: newContent,
      timestamp: Date.now()
    };
    localStorage.setItem(`${STORAGE_PREFIX}${item.id}`, JSON.stringify(data));
    
    // Visual feedback helper
    setTimeout(() => setIsSaved(true), 500);
  };

  const openMap = () => {
    const query = encodeURIComponent(item.locationQuery || item.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleImageError = () => {
    // Fallback image if the main one fails
    setImgSrc('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md mb-6 border-2 border-gray-100 flex flex-col md:flex-row transform transition-all hover:shadow-xl group">
      {/* Image Section */}
      <div className="md:w-1/3 h-48 md:h-auto relative bg-gray-200 overflow-hidden">
        <img 
          src={imgSrc} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute top-2 left-2 bg-[#0096df] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white">
          {item.time}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
          
          <div className="flex items-start gap-1 text-gray-500 text-sm mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{item.address}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>營業時間: {item.hours}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed bg-[#F0F8FF] p-3 rounded-xl border border-blue-100">
            {item.description}
          </p>
        </div>

        <div className="mt-2">
            <div className="relative">
                <textarea 
                    className="w-full bg-[#fffae6] border border-[#fec31d] rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0096df] transition-all resize-none text-gray-700 placeholder-gray-400"
                    rows={2}
                    placeholder="📝 隨手記筆記... (自動儲存)"
                    value={note}
                    onChange={handleNoteChange}
                />
                <div className={`absolute bottom-2 right-2 text-xs text-green-600 font-bold bg-white px-1 rounded transition-opacity duration-300 ${isSaved && note ? 'opacity-100' : 'opacity-0'}`}>
                    已儲存 ✓
                </div>
            </div>

            <button 
                onClick={openMap}
                className="mt-3 w-full bg-white border-2 border-[#dd0018] text-[#dd0018] font-bold py-2.5 px-4 rounded-full hover:bg-[#dd0018] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.447-.894L15 7m0 13V7" />
                </svg>
                Google Map 導航
            </button>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
