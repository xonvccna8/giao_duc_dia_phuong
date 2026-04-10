import { Compass } from 'lucide-react';

/**
 * Header toàn trang – tiêu đề lớn, mô tả sứ mệnh website.
 * Được giữ gọn để không chiếm nhiều màn hình trên VR browser.
 */
export function Header() {
  return (
    <header className="shrink-0 px-6 py-4 flex items-center gap-4 border-b border-white/05">
      {/* Logo / Icon */}
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
           style={{ background: 'linear-gradient(135deg, #059669, #0d9488)' }}>
        <Compass size={22} className="text-white" />
      </div>

      {/* Title block */}
      <div className="min-w-0 flex-1">
        <h1 className="text-white font-bold text-base sm:text-lg leading-tight gradient-text">
          Con Cuông VR
        </h1>
        <p className="text-white/40 text-xs sm:text-sm leading-snug truncate">
          Giáo dục địa phương · Huyện Con Cuông, Nghệ An
        </p>
      </div>

      {/* Badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0
                      bg-emerald-900/40 border border-emerald-700/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-300 text-xs font-semibold">Meta Quest 2 Ready</span>
      </div>
    </header>
  );
}
