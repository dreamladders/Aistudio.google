import React from 'react';
import { X, Download, FileCode, FileText, Contact, CheckCircle, Package } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#171410] border border-[#2e261e] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Download className="w-5 h-5" />
          <h3 className="text-xl font-bold text-stone-100 font-display">
            Download Files & Assets
          </h3>
        </div>
        <p className="text-xs text-stone-400 mb-6">
          Choose the file package you would like to download for Hotel Firdous
        </p>

        <div className="space-y-3.5">
          {/* Option 1: Full Website Source Code ZIP */}
          <a
            href="/hotel-firdous-website.zip"
            download="hotel-firdous-website.zip"
            className="flex items-start gap-4 p-4 rounded-xl bg-[#1f1913] border border-amber-900/40 hover:border-amber-500/60 transition-all group"
          >
            <div className="p-3 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300">
                  Full Website Source Code (.ZIP)
                </h4>
                <span className="text-[11px] font-mono text-amber-400 font-semibold">4.4 MB</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Contains complete React + Vite + TypeScript source code, components, high-resolution food images, and configs.
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>Click to Download ZIP</span>
              </div>
            </div>
          </a>

          {/* Option 2: Printable Menu & Price List */}
          <a
            href="/hotel-firdous-menu.html"
            download="hotel-firdous-menu.html"
            className="flex items-start gap-4 p-4 rounded-xl bg-[#1f1913] border border-stone-800 hover:border-amber-500/60 transition-all group"
          >
            <div className="p-3 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-colors shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-100 group-hover:text-emerald-300">
                  Printable Menu & Price Card (.HTML / PDF)
                </h4>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">Ready to Print</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Clean, offline printable card formatted with 5 AM breakfast, Dum Biryani handis, and contact hotline.
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>Click to Download Menu</span>
              </div>
            </div>
          </a>

          {/* Option 3: vCard Contact */}
          <a
            href="/hotel-firdous-contact.vcf"
            download="hotel-firdous-contact.vcf"
            className="flex items-start gap-4 p-4 rounded-xl bg-[#1f1913] border border-stone-800 hover:border-amber-500/60 transition-all group"
          >
            <div className="p-3 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-stone-950 transition-colors shrink-0">
              <Contact className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-100 group-hover:text-blue-300">
                  Digital Contact Card (.VCF)
                </h4>
                <span className="text-[11px] font-mono text-blue-400 font-semibold">1-Tap Save</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Add Hotel Firdous phone (093911 76439) and Azampura GPS coordinates directly into your smartphone contacts.
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>Click to Download vCard</span>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Hotel Firdous · Chaderghat, Malakpet</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#252018] hover:bg-stone-800 text-stone-200 rounded-lg text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
