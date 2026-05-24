import Tiptap from "../../Tiptap";

export default function TextBlock({ onSave, onClose, content }) {
  return <Tiptap onSave={onSave} onClose={onClose} content={content} />;
}
