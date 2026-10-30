import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Upload, Camera, Check, Filter } from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto, RESTAURANT_INFO } from '../data/restaurantData';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [userPhotos, setUserPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  if (!isOpen) return null;

  const filteredPhotos = userPhotos.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newEntry: GalleryPhoto = {
      id: `up-${Date.now()}`,
      url: "/src/assets/images/firdous_mutton_biryani_1793377437168.jpg",
      title: newTitle,
      category: 'biryani',
      author: 'You (Diner)',
      caption: 'Freshly uploaded customer photo taken at Hotel Firdous.'
    };
    setUserPhotos([newEntry, ...userPhotos]);
    setNewTitle('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="bg-[#16130f] border border-[#2e261d] w-full max-w-5xl max-h-[92vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#29221b] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-stone-100 font-display">
                Hotel Firdous Photos
              </h3>
              <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 bg-amber-950/60 rounded-md border border-amber-800/60 tabular-nums">
                {RESTAURANT_INFO.photosCount} photos in app
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Verified food shots, simmering handis, and early morning breakfast crowds
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar & Quick Add */}
        <div className="px-6 py-3 border-b border-[#241e17] bg-[#12100d] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Photos (498)' },
              { id: 'biryani', label: 'Biryani Handis' },
              { id: 'breakfast', label: '5 AM Paya & Breakfast' },
              { id: 'starters', label: 'Tala Hua Gosht' },
              { id: 'chai', label: 'Irani Chai & Cafe' },
              { id: 'ambiance', label: 'Restaurant & Kitchen' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSelectedPhotoIndex(null); }}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick upload input */}
          <form onSubmit={handleSimulatedUpload} className="flex items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Dish or caption..."
              className="px-2.5 py-1 text-xs bg-[#1f1913] border border-stone-700 rounded text-stone-200 placeholder:text-stone-500 w-36 sm:w-44 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded text-xs flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Add Photo</span>
            </button>
          </form>
        </div>

        {uploadSuccess && (
          <div className="px-6 py-2 bg-emerald-950/80 border-b border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Your photo has been added to the Hotel Firdous community gallery!</span>
          </div>
        )}

        {/* Gallery Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Lightbox Mode if clicked */}
          {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] ? (
            <div className="space-y-4">
              <div className="relative aspect-[16/9] max-h-[55vh] bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={filteredPhotos[selectedPhotoIndex].url}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption details */}
              <div className="flex items-start justify-between gap-4 bg-[#1e1913] p-4 rounded-xl border border-stone-800 text-xs">
                <div>
                  <h4 className="text-base font-bold text-stone-100 font-display">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h4>
                  <p className="text-stone-300 mt-1">
                    {filteredPhotos[selectedPhotoIndex].caption}
                  </p>
                  <span className="text-[11px] text-amber-400 mt-1 block">
                    Shared by {filteredPhotos[selectedPhotoIndex].author}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-medium"
                >
                  View Grid
                </button>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-stone-900 border border-[#2b241c] hover:border-amber-500/60 transition-all"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-2 left-2 right-2 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-semibold text-white truncate">{photo.title}</p>
                    <p className="text-[10px] text-amber-300 truncate">{photo.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#29221b] bg-[#12100d] flex items-center justify-between text-xs text-stone-400">
          <span>Hotel Firdous · Chaderghat, Malakpet, Hyderabad</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#252019] hover:bg-stone-800 text-stone-200 rounded-lg text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
