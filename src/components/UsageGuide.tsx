import { Headset, MousePointerClick, RotateCcw, FileQuestion } from 'lucide-react';

/** Hướng dẫn sử dụng ngắn gọn – hiển thị ở cuối trang hoặc panel phụ */
export function UsageGuide() {
  const steps = [
    {
      icon: <Headset size={20} className="text-emerald-400" />,
      text: 'Mở website bằng Browser trên Meta Quest 2',
    },
    {
      icon: <MousePointerClick size={20} className="text-teal-400" />,
      text: 'Chọn địa danh muốn trải nghiệm từ danh sách bên trái',
    },
    {
      icon: <RotateCcw size={20} className="text-amber-400" />,
      text: 'Nhấn "Enter VR" hoặc mở YouTube 360 → xoay đầu để quan sát',
    },
    {
      icon: <FileQuestion size={20} className="text-purple-400" />,
      text: 'Chuyển sang "Gợi ý bài học" → trả lời câu hỏi học tập',
    },
  ];

  return (
    <div className="glass-card rounded-2xl px-5 py-4">
      <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
        Hướng dẫn sử dụng
      </p>
      <ol className="flex flex-col gap-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/05 border border-white/08
                            flex items-center justify-center shrink-0">
              {step.icon}
            </div>
            <p className="text-white/60 text-xs leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
