import Tiptap from "../../Tiptap";

export default function TextBlock({ onSave, onClose }) {
  const handleSave = async (html) => {
    try {
      const payload = [
        {
          loaiTN: 1,
          text: html,
          url: null,
          stt: 1,
        },
      ];

      await uploadText(payload, khoaHocID);

      onClose(); // đóng modal sau khi save
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return <Tiptap onSave={onSave} onClose={onClose} />;
}
