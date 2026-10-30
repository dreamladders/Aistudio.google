import React, { useState } from 'react';
import { 
  MapPin, Navigation, Phone, Clock, Copy, Check, ExternalLink, 
  Train, Bus, Car, Building2, Compass
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationDirections: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string>('kachiguda');

  const handleCopy = (text: string, isPlusCode = false) => {
    navigator.clipboard.writeText(text);
    if (isPlusCode) {
      setCopiedPlusCode(true);
      setTimeout(() => setCopiedPlusCode(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(`Hotel Firdous Sahifa Masjid Rd Azampura Malakpet Hyderabad`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const transitRoutes = [
    {
      id: 'kachiguda',
      name: 'From Kachiguda Railway Station',
      distance: '1.2 km',
      autoTime: '4 mins',
      walkTime: '12 mins',
      tip: 'Exit from Kachiguda main gate, head south toward Chaderghat via Sahifa Masjid road. Ideal for 5:00 AM breakfast arrivals!'
    },
    {
      id: 'malakpet',
      name: 'From Malakpet Metro Station (Red Line)',
      distance: '1.4 km',
      autoTime: '5 mins',
      walkTime: '15 mins',
      tip: 'Take an auto from Malakpet Metro Pillar 114 towards Azampura Sahifa Masjid.'
    },
    {
      id: 'mgbs',
      name: 'From MGBS Central Bus Stand',
      distance: '1.6 km',
      autoTime: '6 mins',
      walkTime: '18 mins',
      tip: 'Cross the Chaderghat bridge into Azampura. Hotel Firdous is right opposite Sahifa Masjid road lane.'
    },
    {
      id: 'charminar',
      name: 'From Charminar / Old City',
      distance: '2.8 km',
      autoTime: '10 mins',
      walkTime: '30 mins',
      tip: 'Head via Darulshifa and Chaderghat causeway into Azampura.'
    }
  ];

  const currentRoute = transitRoutes.find(r => r.id === selectedOrigin) || transitRoutes[0];

  return (
    <section id="location" className="py-16 bg-[#12100d] border-b border-[#29221b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Chaderghat & Azampura Landmark</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-100 font-display">
              Location & Easy Directions
            </h2>
            <p className="mt-2 text-stone-400 max-w-xl text-sm">
              Conveniently located near Sahifa Masjid in Azampura, just 4 minutes from Kachiguda Station.
            </p>
          </div>

          <button
            onClick={openGoogleMaps}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2 shadow active:scale-95 self-start md:self-auto"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Coordinates & Transit Calculator (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Address Card */}
            <div className="bg-[#181410] border border-[#2f271e] rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-100 text-base">
                    Hotel Firdous Restaurant
                  </h3>
                  <p className="mt-1 text-sm text-stone-300 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-[#262018] text-xs">
                    <button
                      onClick={() => handleCopy(RESTAURANT_INFO.address)}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? 'Copied to clipboard' : 'Copy Full Address'}</span>
                    </button>
                    
                    <span className="text-stone-600">·</span>

                    <button
                      onClick={() => handleCopy(RESTAURANT_INFO.plusCode, true)}
                      className="text-stone-300 hover:text-amber-400 flex items-center gap-1 font-mono transition-colors"
                    >
                      {copiedPlusCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                      <span>Plus Code: {RESTAURANT_INFO.plusCode}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact & Hours Quick Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#262018] text-xs text-stone-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[11px]">Timings</span>
                    <span className="font-semibold text-stone-200">5:00 AM – 11:30 PM (Daily)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[11px]">Direct Line / Takeaway</span>
                    <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="font-semibold text-amber-300 hover:underline">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Route / Landmark Proximity Guide */}
            <div className="bg-[#181410] border border-[#2f271e] rounded-xl p-6">
              <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Train className="w-4 h-4 text-amber-400" />
                <span>Travel Distance & Route Guide</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {transitRoutes.map(route => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedOrigin(route.id)}
                    className={`p-2.5 rounded-lg text-left transition-all text-xs active:scale-95 ${
                      selectedOrigin === route.id
                        ? 'bg-amber-500 text-stone-950 font-bold shadow'
                        : 'bg-[#221c16] text-stone-300 hover:bg-[#2c241c] border border-stone-800'
                    }`}
                  >
                    <p className="font-semibold truncate">{route.name.replace('From ', '')}</p>
                    <p className={`text-[11px] ${selectedOrigin === route.id ? 'text-stone-900' : 'text-amber-400'}`}>
                      {route.distance}
                    </p>
                  </button>
                ))}
              </div>

              {/* Current Route Detail */}
              <div className="p-4 bg-[#211b15] rounded-lg border border-stone-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-amber-300 font-semibold">
                  <span>{currentRoute.name}</span>
                  <div className="flex items-center gap-3 text-stone-300 font-normal">
                    <span className="flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-amber-400" /> {currentRoute.autoTime}
                    </span>
                    <span className="text-stone-600">·</span>
                    <span>{currentRoute.walkTime} walk</span>
                  </div>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  {currentRoute.tip}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Styled Map & GPS Locator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#181410] border border-[#2f271e] rounded-xl overflow-hidden shadow-xl">
              
              {/* Map Canvas Graphic */}
              <div className="relative aspect-[4/3] bg-[#221d17] p-6 flex flex-col justify-between overflow-hidden">
                {/* Decorative Map Grid Lines */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Simulated Street Labels */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Azampura Main Rd</span>
                  <span>Chaderghat Causeway</span>
                </div>

                {/* Central Pin */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 animate-ping absolute" />
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl relative z-10">
                      <MapPin className="w-6 h-6 fill-stone-950 text-amber-500" />
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-1.5 bg-[#0f0e0c]/90 backdrop-blur-md border border-amber-500/50 rounded-lg text-center shadow-lg">
                    <p className="font-bold text-xs text-amber-300">Hotel Firdous</p>
                    <p className="text-[10px] text-stone-300">Opp. Sahifa Masjid Lane</p>
                  </div>
                </div>

                {/* Bottom Route Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs pt-3 border-t border-stone-800 text-stone-300">
                  <span className="font-mono text-stone-400">17.3789° N, 78.4902° E</span>
                  <button
                    onClick={openGoogleMaps}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold underline"
                  >
                    <span>Start Navigation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Landmarks List */}
              <div className="p-4 bg-[#14120e] border-t border-[#2b241c] space-y-2 text-xs">
                <p className="font-semibold text-stone-200">Nearby Landmarks:</p>
                <div className="space-y-1.5 text-stone-400">
                  {RESTAURANT_INFO.landmarks.map(lm => (
                    <div key={lm.name} className="flex items-center justify-between text-[11px]">
                      <span>{lm.name}</span>
                      <span className="text-amber-400 font-medium">{lm.distance} ({lm.time.split('/')[0]})</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
