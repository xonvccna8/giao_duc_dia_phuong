import { type Place } from '../data/places';
import { MapPin } from 'lucide-react';

interface SidebarPlacesProps {
  places: Place[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Sidebar hiển thị danh sách 4 địa danh bên trái.
 * Nút đủ lớn để dùng tay cầm Meta Quest 2 chọn.
 */
export function SidebarPlaces({ places, selectedId, onSelect }: SidebarPlacesProps) {
  return (
    <aside className="sidebar-area flex flex-col h-full w-72 shrink-0">
      {/* Header sidebar */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={16} className="text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            Địa danh
          </span>
        </div>
        <p className="text-white/40 text-xs leading-relaxed">
          Chọn địa danh để bắt đầu trải nghiệm VR
        </p>
      </div>

      {/* Danh sách địa danh */}
      <nav className="flex flex-col gap-2 px-3 pb-4 overflow-y-auto flex-1">
        {places.map((place) => {
          const isActive = place.id === selectedId;
          return (
            <button
              key={place.id}
              onClick={() => onSelect(place.id)}
              className={`place-card text-left w-full ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
              aria-label={`Chọn địa danh ${place.title}`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-emerald-400" />
              )}

              <div className="flex items-start gap-3">
                {/* Icon */}
                <span className="text-2xl leading-none mt-0.5 shrink-0" role="img" aria-label={place.title}>
                  {place.icon}
                </span>
                <div className="min-w-0">
                  {/* Tiêu đề */}
                  <p className={`font-semibold text-sm leading-snug truncate ${isActive ? 'text-emerald-300' : 'text-white/90'}`}>
                    {place.title}
                  </p>
                  {/* Subtitle */}
                  <p className="text-white/40 text-xs leading-snug mt-0.5 line-clamp-2">
                    {place.subtitle}
                  </p>
                </div>
              </div>

              {/* Active badge */}
              {isActive && (
                <div className="flex items-center gap-1 mt-1 ml-9">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium">Đang xem</span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer sidebar hint */}
      <div className="px-4 py-4 border-t border-white/05">
        <p className="text-white/25 text-xs text-center leading-relaxed">
          Tối ưu cho trình duyệt<br />Meta Quest 2
        </p>
      </div>
    </aside>
  );
}
