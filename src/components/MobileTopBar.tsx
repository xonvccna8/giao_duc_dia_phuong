import { type Place } from '../data/places';
import { ChevronDown } from 'lucide-react';

interface MobileTopBarProps {
  places: Place[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Thanh chọn địa danh dạng dropdown – chỉ hiển thị trên màn hình nhỏ / VR browser portrait.
 * Khi sidebar ẩn (< 900px), đây là cách chính để chọn địa danh.
 */
export function MobileTopBar({ places, selectedId, onSelect }: MobileTopBarProps) {
  const selected = places.find((p) => p.id === selectedId) ?? places[0];

  return (
    <div className="mobile-topbar shrink-0 px-4 py-3 border-b border-white/05 items-center gap-3">
      <span className="text-xl shrink-0" role="img" aria-label={selected.title}>
        {selected.icon}
      </span>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="flex-1 bg-white/08 border border-white/12 rounded-xl px-3 py-2.5
                   text-white text-sm font-medium appearance-none cursor-pointer
                   focus:outline-none focus:border-emerald-500/50"
        aria-label="Chọn địa danh"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        {places.map((p) => (
          <option key={p.id} value={p.id} style={{ background: '#0a2015', color: '#e8f5e9' }}>
            {p.icon} {p.title}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="text-white/40 shrink-0 pointer-events-none -ml-8" />
    </div>
  );
}
