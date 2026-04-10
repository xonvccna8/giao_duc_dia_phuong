import { type Place } from '../data/places';
import { ExternalLink, Copy, Check, Info } from 'lucide-react';

interface VRViewerProps {
  place: Place;
  copied: boolean;
  onCopyLink: () => void;
  onOpenYoutube: () => void;
}

/**
 * VR Viewer component – hiển thị panorama 360 bằng A-Frame embed.
 * A-Frame được nhúng qua iframe để tránh xung đột với React DOM.
 * Cách này hoạt động tốt trên VR browser của Meta Quest 2.
 */
export function VRViewer({ place, copied, onCopyLink, onOpenYoutube }: VRViewerProps) {
  // Tạo HTML cho iframe A-Frame động theo địa danh được chọn
  const aframeHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <script src="https://aframe.io/releases/1.5.0/aframe.min.js"><\/script>
  <style>
    body { margin: 0; background: #000; overflow: hidden; }
    a-scene { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <a-scene
    embedded
    vr-mode-ui="enabled: true"
    loading-screen="dotsColor: #4ade80; backgroundColor: #0a1a12"
    renderer="antialias: true; colorManagement: true"
  >
    <!-- Bầu trời 360 – thay panorama bằng ảnh equirectangular thật -->
    <a-sky
      src="${place.panorama}"
      rotation="0 -130 0"
      color="${place.panorama ? '' : '#1a3a2a'}"
    ></a-sky>

    <!-- Text thông tin địa danh nổi trong không gian 3D -->
    <a-entity position="0 1.6 -3">
      <a-plane
        width="2.5" height="0.6"
        color="#0a2015"
        opacity="0.85"
        rounded="true"
      ></a-plane>
      <a-text
        value="${place.title}"
        align="center"
        color="#4ade80"
        width="2.2"
        position="0 0.1 0.01"
        font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
      ></a-text>
      <a-text
        value="${place.subtitle}"
        align="center"
        color="#a7f3d0"
        width="2.2"
        position="0 -0.12 0.01"
        wrap-count="40"
      ></a-text>
    </a-entity>

    <!-- Camera mặc định -->
    <a-camera position="0 1.6 0" look-controls wasd-controls="enabled: false">
      <a-cursor color="#4ade80" opacity="0.7" scale="0.5 0.5 0.5"></a-cursor>
    </a-camera>

    <!-- Ánh sáng môi trường -->
    <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
  </a-scene>
</body>
</html>`;

  const iframeSrc = `data:text/html;charset=utf-8,${encodeURIComponent(aframeHTML)}`;

  return (
    <div className="flex flex-col h-full gap-4 animate-slide-up">
      {/* Panorama 360 iframe */}
      <div className="aframe-container flex-1 glow-green">
        <iframe
          title={`Panorama 360 – ${place.title}`}
          src={iframeSrc}
          className="w-full h-full border-0"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          loading="lazy"
        />
        {/* Overlay badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold
                        bg-black/40 backdrop-blur border border-white/10 text-emerald-300 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          360° VR
        </div>
      </div>

      {/* Mô tả ngắn */}
      <div className="glass-card rounded-2xl px-5 py-4">
        <p className="text-white/70 text-sm leading-relaxed">{place.description}</p>
      </div>

      {/* Action buttons – đủ to để dùng tay cầm Meta Quest 2 */}
      <div className="flex gap-3 flex-wrap">
        {/* Nút mở YouTube 360 */}
        <button
          id={`btn-youtube-${place.id}`}
          onClick={onOpenYoutube}
          className="btn-vr-primary flex-1"
          aria-label={`Mở YouTube 360 cho ${place.title}`}
        >
          <ExternalLink size={20} />
          <span>Mở YouTube 360</span>
        </button>

        {/* Nút sao chép link */}
        <button
          id={`btn-copy-${place.id}`}
          onClick={onCopyLink}
          className="btn-vr-secondary flex-1"
          aria-label="Sao chép liên kết YouTube 360"
        >
          {copied ? (
            <>
              <Check size={20} className="text-emerald-400" />
              <span className="text-emerald-400">Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy size={20} />
              <span>Sao chép link</span>
            </>
          )}
        </button>
      </div>

      {/* Hướng dẫn Meta Quest 2 */}
      <div className="glass-card rounded-2xl px-5 py-4 flex gap-3 items-start">
        <Info size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-emerald-300 text-xs font-semibold mb-1 uppercase tracking-wide">
            Hướng dẫn dùng Meta Quest 2
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            Nhấn nút <strong className="text-white/70">"Enter VR"</strong> góc dưới phải để vào chế độ VR toàn màn hình. 
            Xoay đầu để quan sát không gian 360°. <br />
            Hoặc nhấn <strong className="text-white/70">"Mở YouTube 360"</strong> để xem video 360° trong ứng dụng YouTube.
          </p>
        </div>
      </div>
    </div>
  );
}
