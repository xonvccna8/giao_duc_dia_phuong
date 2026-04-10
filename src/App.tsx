import { useState, useCallback } from 'react';
import { places } from './data/places';
import { Header } from './components/Header';
import { SidebarPlaces } from './components/SidebarPlaces';
import { MobileTopBar } from './components/MobileTopBar';
import { VRViewer } from './components/VRViewer';
import { LessonPanel } from './components/LessonPanel';
import { UsageGuide } from './components/UsageGuide';
import { Glasses, BookOpen, CheckCircle2 } from 'lucide-react';

// ── Mode type ─────────────────────────────────────────────────────────────────
type ViewMode = 'vr' | 'lesson';

// ── Copy toast component (inline nhỏ, tránh import thêm) ─────────────────────
function CopyToast() {
  return (
    <div className="copy-toast" role="status" aria-live="polite">
      <CheckCircle2 size={16} className="text-emerald-300" />
      Đã sao chép liên kết!
    </div>
  );
}

// ── Main App Component ────────────────────────────────────────────────────────

/**
 * ConCuongVRApp – root component của toàn bộ website.
 *
 * Layout:
 *   ┌─────────────────────────────────────────┐
 *   │               Header                    │
 *   ├──────────────┬──────────────────────────┤
 *   │              │  MobileTopBar (mobile)   │
 *   │  Sidebar     ├──────────────────────────┤
 *   │  Places      │  Mode Toggle             │
 *   │              │  VRViewer | LessonPanel  │
 *   │              │  UsageGuide              │
 *   └──────────────┴──────────────────────────┘
 */
export default function App() {
  // Địa danh đang chọn – mặc định là địa danh đầu tiên
  const [selectedId, setSelectedId] = useState<string>(places[0].id);
  // Chế độ hiển thị
  const [mode, setMode] = useState<ViewMode>('vr');
  // Trạng thái sao chép link
  const [copied, setCopied] = useState(false);
  // Khi chọn địa danh mới, reset mode về VR
  const [contentKey, setContentKey] = useState(0);

  // Lấy địa danh đang chọn (luôn có giá trị vì selectedId mặc định)
  const selectedPlace = places.find((p) => p.id === selectedId) ?? places[0];

  // Xử lý chọn địa danh
  const handleSelectPlace = useCallback((id: string) => {
    setSelectedId(id);
    setMode('vr');
    setCopied(false);
    setContentKey((k) => k + 1); // force re-render animation
  }, []);

  // Mở YouTube 360 trong tab mới
  const handleOpenYoutube = useCallback(() => {
    window.open(selectedPlace.youtube360, '_blank', 'noopener,noreferrer');
  }, [selectedPlace.youtube360]);

  // Sao chép link YouTube vào clipboard
  const handleCopyLink = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(selectedPlace.youtube360);
      } else {
        // Fallback cho trình duyệt không hỗ trợ Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = selectedPlace.youtube360;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Không thể sao chép:', err);
    }
  }, [selectedPlace.youtube360]);

  return (
    <div className="bg-mesh w-full h-full flex flex-col">
      {/* ── Header ── */}
      <Header />

      {/* ── Mobile top bar (chỉ hiện khi sidebar ẩn) ── */}
      <MobileTopBar
        places={places}
        selectedId={selectedId}
        onSelect={handleSelectPlace}
      />

      {/* ── Main content area ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* ── Sidebar trái (desktop) ── */}
        <div className="sidebar-area border-r border-white/05 overflow-hidden flex shrink-0"
             style={{ width: '280px' }}>
          <SidebarPlaces
            places={places}
            selectedId={selectedId}
            onSelect={handleSelectPlace}
          />
        </div>

        {/* ── Content area chính ── */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* ── Mode toggle + Place title bar ── */}
          <div className="shrink-0 px-5 py-3 flex items-center justify-between gap-4 border-b border-white/05">
            {/* Tên địa danh đang chọn */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0" role="img" aria-label={selectedPlace.title}>
                {selectedPlace.icon}
              </span>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{selectedPlace.title}</p>
                <p className="text-white/40 text-xs truncate hidden sm:block">{selectedPlace.subtitle}</p>
              </div>
            </div>

            {/* Toggle VR / Bài học */}
            <div className="mode-toggle shrink-0">
              <button
                id="btn-mode-vr"
                onClick={() => setMode('vr')}
                className={`mode-toggle-btn ${mode === 'vr' ? 'active' : 'inactive'}`}
                aria-pressed={mode === 'vr'}
              >
                <Glasses size={16} />
                <span className="hidden xs:inline">Chế độ VR</span>
                <span className="xs:hidden">VR</span>
              </button>
              <button
                id="btn-mode-lesson"
                onClick={() => setMode('lesson')}
                className={`mode-toggle-btn ${mode === 'lesson' ? 'active' : 'inactive'}`}
                aria-pressed={mode === 'lesson'}
              >
                <BookOpen size={16} />
                <span className="hidden xs:inline">Gợi ý bài học</span>
                <span className="xs:hidden">Bài học</span>
              </button>
            </div>
          </div>

          {/* ── Main scrollable content ── */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="flex gap-5 h-full p-5 max-w-5xl mx-auto">

              {/* ── Panel trung tâm: VR hoặc Lesson ── */}
              <div key={contentKey} className="flex-1 flex flex-col min-w-0 min-h-0">
                {mode === 'vr' ? (
                  <VRViewer
                    place={selectedPlace}
                    copied={copied}
                    onCopyLink={handleCopyLink}
                    onOpenYoutube={handleOpenYoutube}
                  />
                ) : (
                  <LessonPanel place={selectedPlace} />
                )}
              </div>

              {/* ── Panel phụ bên phải: Usage guide (chỉ hiện desktop) ── */}
              <div className="hidden lg:flex flex-col gap-4 shrink-0" style={{ width: '240px' }}>
                <UsageGuide />

                {/* Nhanh chọn địa danh khác (desktop shortcut) */}
                <div className="glass-card rounded-2xl px-4 py-4">
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
                    Địa danh khác
                  </p>
                  <div className="flex flex-col gap-2">
                    {places
                      .filter((p) => p.id !== selectedId)
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPlace(p.id)}
                          className="flex items-center gap-2 p-2.5 rounded-xl text-left w-full
                                     hover:bg-white/08 active:bg-white/12 transition-colors"
                        >
                          <span className="text-lg shrink-0" role="img" aria-label={p.title}>
                            {p.icon}
                          </span>
                          <span className="text-white/60 text-xs leading-snug">{p.title}</span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Copy toast notification ── */}
      {copied && <CopyToast />}
    </div>
  );
}
