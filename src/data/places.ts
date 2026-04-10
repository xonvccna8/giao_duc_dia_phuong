// ── TypeScript Interfaces ──────────────────────────────────────────────────────

/**
 * Kiểu dữ liệu cho một địa danh trong website VR giáo dục địa phương.
 * Dễ mở rộng: thêm trường mới mà không cần sửa logic render.
 */
export interface Place {
  /** ID duy nhất để nhận diện địa danh */
  id: string;
  /** Tên chính thức của địa danh */
  title: string;
  /** Mô tả ngắn hiển thị trong card */
  subtitle: string;
  /** Mô tả chi tiết cho phần học tập */
  description: string;
  /**
   * URL ảnh panorama 360°.
   * Thay bằng URL ảnh 360 thật khi có.
   * Phải là ảnh equirectangular (tỉ lệ 2:1).
   */
  panorama: string;
  /**
   * URL ảnh minh họa thông thường (fallback khi không có panorama).
   * Dùng trong Chế độ Gợi ý bài học.
   */
  fallbackImage: string;
  /**
   * URL video YouTube 360°.
   * Mở trong tab mới để học sinh dùng Meta Quest 2 xem.
   */
  youtube360: string;
  /** Ghi chú – các điểm khai thác sư phạm cho giáo viên */
  notes: string[];
  /** Câu hỏi định hướng quan sát / thảo luận sau trải nghiệm */
  teachingQuestions: string[];
  /** Màu accent đại diện cho địa danh (Tailwind gradient classes) */
  color: string;
  /** Emoji/icon đại diện */
  icon: string;
}

// ── Dữ liệu 4 địa danh Con Cuông ─────────────────────────────────────────────
// Thay các link panorama, fallbackImage và youtube360 bằng nội dung thật.
// Không cần sửa bất kỳ logic nào sau khi thay link.

export const places: Place[] = [
  // ── 1. Thác Khe Kèm ────────────────────────────────────────────────────────
  {
    id: 'thac-khe-kem',
    title: 'Thác Khe Kèm',
    subtitle: 'Cảnh quan thác nước đặc trưng, điểm du lịch sinh thái nổi bật của Con Cuông.',
    description:
      'Thác Khe Kèm là một địa danh tiêu biểu của Con Cuông, nổi bật với cảnh quan thiên nhiên ' +
      'hùng vĩ, không khí trong lành và giá trị du lịch sinh thái. Dòng thác đổ xuống từ độ cao ' +
      'lớn, tạo nên âm thanh và hơi nước mát lạnh đặc trưng của vùng núi rừng Nghệ An.',
    // ─── THAY LINK NÀY bằng ảnh panorama 360 thật (equirectangular 2:1) ───
    panorama: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Equirectangular-projection.jpg',
    // ─── THAY LINK NÀY bằng ảnh minh họa thật của Thác Khe Kèm ───
    fallbackImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    // ─── THAY LINK NÀY bằng URL YouTube 360 thật ───
    youtube360: 'https://www.youtube.com/results?search_query=thac+khe+kem+con+cuong+360',
    notes: [
      'Mô tả đặc điểm cảnh quan thác nước: chiều cao, dòng chảy, hệ sinh thái ven thác.',
      'Nêu giá trị du lịch và ý thức bảo vệ môi trường địa phương.',
    ],
    teachingQuestions: [
      'Em quan sát thấy địa hình quanh thác có đặc điểm gì?',
      'Thác Khe Kèm có giá trị như thế nào đối với du lịch địa phương?',
      'Cần làm gì để bảo vệ cảnh quan tự nhiên tại đây?',
    ],
    color: 'from-blue-800/60 to-cyan-800/40',
    icon: '💧',
  },

  // ── 2. Vườn quốc gia Pù Mát ────────────────────────────────────────────────
  {
    id: 'vu-quoc-gia-pu-mat',
    title: 'Vườn quốc gia Pù Mát',
    subtitle: 'Không gian sinh thái, rừng nguyên sinh, trải nghiệm khám phá thiên nhiên.',
    description:
      'Vườn quốc gia Pù Mát là khu bảo tồn thiên nhiên quan trọng, có hệ sinh thái rừng phong phú, ' +
      'đa dạng sinh học cao và có ý nghĩa lớn với giáo dục môi trường. Nơi đây bảo tồn nhiều loài ' +
      'động thực vật quý hiếm, trong đó có sao la – loài thú đặc hữu của Đông Dương.',
    // ─── THAY LINK NÀY bằng ảnh panorama 360 thật ───
    panorama: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Equirectangular-projection.jpg',
    // ─── THAY LINK NÀY bằng ảnh minh họa thật của Vườn quốc gia Pù Mát ───
    fallbackImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    // ─── THAY LINK NÀY bằng URL YouTube 360 thật ───
    youtube360: 'https://www.youtube.com/results?search_query=pu+mat+national+park+360',
    notes: [
      'Quan sát thảm thực vật và địa hình rừng: tán rừng nhiều tầng, cây gỗ lớn, thực vật dưới tán.',
      'Liên hệ vai trò bảo tồn thiên nhiên ở Con Cuông và tầm quan trọng với hệ sinh thái khu vực.',
    ],
    teachingQuestions: [
      'Em nhận thấy hệ thực vật ở đây có gì nổi bật?',
      'Vì sao cần bảo vệ rừng và động vật hoang dã?',
      'Pù Mát có vai trò gì đối với môi trường địa phương?',
    ],
    color: 'from-emerald-800/60 to-green-800/40',
    icon: '🌿',
  },

  // ── 3. Khe Nước Mọc ────────────────────────────────────────────────────────
  {
    id: 'khe-nuoc-moc',
    title: 'Khe Nước Mọc',
    subtitle: 'Điểm du lịch sinh thái với dòng nước tự nhiên độc đáo, trong xanh, mát mẻ.',
    description:
      'Khe Nước Mọc gây ấn tượng bởi nguồn nước tự nhiên trong lành, cảnh quan yên bình. ' +
      'Dòng nước mát lạnh chảy qua những phiến đá và tán cây rậm rạp, tạo nên vẻ đẹp hoang sơ ' +
      'và là địa điểm phù hợp để tìm hiểu về môi trường sinh thái địa phương.',
    // ─── THAY LINK NÀY bằng ảnh panorama 360 thật ───
    panorama: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Equirectangular-projection.jpg',
    // ─── THAY LINK NÀY bằng ảnh minh họa thật của Khe Nước Mọc ───
    fallbackImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    // ─── THAY LINK NÀY bằng URL YouTube 360 thật ───
    youtube360: 'https://www.youtube.com/results?search_query=khe+nuoc+moc+con+cuong+360',
    notes: [
      'Nhận xét đặc điểm nguồn nước và cảnh quan xung quanh: độ trong, nhiệt độ, địa hình đá cuội.',
      'Nêu ý nghĩa của việc giữ gìn môi trường sinh thái tại các điểm du lịch tự nhiên.',
    ],
    teachingQuestions: [
      'Dòng nước ở đây có những đặc điểm gì?',
      'Cảnh quan quanh khe nước gợi cho em cảm nhận như thế nào?',
      'Vì sao cần giữ gìn vệ sinh môi trường ở các điểm sinh thái?',
    ],
    color: 'from-teal-800/60 to-cyan-700/40',
    icon: '🏞️',
  },

  // ── 4. Đập Phà Lài ─────────────────────────────────────────────────────────
  {
    id: 'dap-pha-lai',
    title: 'Đập Phà Lài',
    subtitle: 'Công trình gắn với cảnh quan sông nước và đời sống địa phương.',
    description:
      'Đập Phà Lài là không gian tiêu biểu cho mối liên hệ giữa nguồn nước, sản xuất và đời sống ' +
      'của người dân địa phương. Công trình nằm bên dòng sông Giăng, phản ánh vai trò quan trọng ' +
      'của việc khai thác và quản lý nguồn nước trong nông nghiệp và sinh hoạt hằng ngày.',
    // ─── THAY LINK NÀY bằng ảnh panorama 360 thật ───
    panorama: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Equirectangular-projection.jpg',
    // ─── THAY LINK NÀY bằng ảnh minh họa thật của Đập Phà Lài ───
    fallbackImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    // ─── THAY LINK NÀY bằng URL YouTube 360 thật ───
    youtube360: 'https://www.youtube.com/results?search_query=dap+pha+lai+con+cuong+360',
    notes: [
      'Quan sát cảnh quan sông nước và công trình: mặt nước, địa hình, thảm thực vật ven sông.',
      'Liên hệ vai trò của nguồn nước với sinh hoạt và sản xuất nông nghiệp của người dân.',
    ],
    teachingQuestions: [
      'Em thấy cảnh quan nơi đây có đặc điểm gì?',
      'Nguồn nước có vai trò thế nào với đời sống con người?',
      'Địa danh này giúp em hiểu thêm điều gì về địa phương?',
    ],
    color: 'from-indigo-800/60 to-blue-800/40',
    icon: '🌊',
  },
];
