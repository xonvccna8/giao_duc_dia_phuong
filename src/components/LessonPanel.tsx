import { type Place } from '../data/places';
import { BookOpen, HelpCircle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface LessonPanelProps {
  place: Place;
}

/**
 * Chế độ Gợi ý bài học – hiển thị ảnh minh họa, notes và câu hỏi học tập.
 * Phù hợp cho giáo viên trình chiếu trên máy tính hoặc học sinh đọc sau trải nghiệm VR.
 */
export function LessonPanel({ place }: LessonPanelProps) {
  return (
    <div className="flex flex-col h-full gap-4 overflow-y-auto animate-slide-up">
      {/* Ảnh minh họa */}
      <div className="relative w-full rounded-3xl overflow-hidden shrink-0" style={{ height: '220px' }}>
        <img
          src={place.fallbackImage}
          alt={`Ảnh minh họa ${place.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Title overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl" role="img" aria-label={place.title}>{place.icon}</span>
            <h2 className="text-white font-bold text-xl leading-tight">{place.title}</h2>
          </div>
          <p className="text-white/70 text-sm leading-snug">{place.subtitle}</p>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="glass-card rounded-2xl px-5 py-4 flex gap-3 items-start">
        <BookOpen size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-2">
            Mô tả địa danh
          </p>
          <p className="text-white/75 text-sm leading-relaxed">{place.description}</p>
        </div>
      </div>

      {/* Ghi chú khai thác sư phạm */}
      <div className="glass-card rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-amber-400" />
          <p className="text-amber-300 text-xs font-semibold uppercase tracking-wide">
            Gợi ý khai thác bài học
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {place.notes.map((note, idx) => (
            <li key={idx} className="note-item">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-white/75 text-sm leading-relaxed">{note}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Câu hỏi học tập */}
      <div className="glass-card rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={18} className="text-teal-400" />
          <p className="text-teal-300 text-xs font-semibold uppercase tracking-wide">
            Câu hỏi định hướng quan sát
          </p>
        </div>
        <ol className="flex flex-col gap-3">
          {place.teachingQuestions.map((q, idx) => (
            <li key={idx} className="question-card">
              <span className="w-7 h-7 rounded-xl bg-teal-700/50 text-teal-300 text-xs font-bold
                               flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-white/80 text-sm leading-relaxed">{q}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Hoạt động sau trải nghiệm */}
      <div className="rounded-2xl px-5 py-4 mb-2"
           style={{ background: 'linear-gradient(135deg, rgba(6,78,59,0.4), rgba(13,74,100,0.3))', border: '1px solid rgba(52,211,153,0.15)' }}>
        <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-3">
          💡 Gợi ý hoạt động sau trải nghiệm VR
        </p>
        <ul className="flex flex-col gap-2 text-white/65 text-sm leading-relaxed">
          <li className="flex gap-2">
            <span className="text-emerald-400 shrink-0">→</span>
            Học sinh chia sẻ cảm nhận sau khi quan sát panorama 360°
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 shrink-0">→</span>
            Thảo luận nhóm theo các câu hỏi định hướng ở trên
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 shrink-0">→</span>
            Vẽ sơ đồ tư duy về địa danh vừa trải nghiệm
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 shrink-0">→</span>
            Viết đoạn văn ngắn mô tả cảm nhận và giá trị địa phương
          </li>
        </ul>
      </div>
    </div>
  );
}
