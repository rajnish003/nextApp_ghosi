"use client";

export default function HandshakeLoader() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-white/90 backdrop-blur-sm">
      <div className="relative w-48 h-32">
        <div className="absolute left-0 top-1/2 w-16 h-10 bg-blue-500 rounded-lg transform -rotate-12 origin-right animate-handshake-left" />
        <div className="absolute right-0 top-1/2 w-16 h-10 bg-green-500 rounded-lg transform rotate-12 origin-left animate-handshake-right" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-700 animate-pulse">
          Connecting Community...
        </div>
      </div>
    </div>
  );
}