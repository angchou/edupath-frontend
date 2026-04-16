import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus"; // Import chuẩn 2026
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  Strikethrough,
  Highlighter,
  Minus,
  Table,
  AArrowUp,
  AArrowDown,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import { Color, TextStyle, FontSize } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-text-style";

export default function Tiptap({ onSave, onClose }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      TableKit.configure({
        table: { resizable: true },
      }),
      TextStyle,
      FontFamily,
      FontSize,
      Color,
    ],
    content: null,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none bg-gray-100 p-4 min-h-[200px] focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
    },
  });

  const handleSave = () => {
    if (!editor) return;

    if (editor.isEmpty) {
      alert("Chưa có nội dung gì sao mà lưu?");
      return;
    }

    const html = editor.getHTML();
    onSave(html);
  };

  if (!editor) return null;

  return (
    <div className="relative shadow-lg p-2 font-sans">
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-1 bg-black text-white rounded-xl p-2 shadow-xl">
          <Heading1
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleHeading({ level: 1 })}
          />
          <Heading2
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleHeading({ level: 2 })}
          />
          <Heading3
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleHeading({ level: 3 })}
          />
          <Bold
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleBold()}
          />
          <Italic
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleItalic()}
          />
          <Underline
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleUnderline()}
          />
          <Strikethrough
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleStrike()}
          />
          <List
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleBulletList()}
          />
          <ListOrdered
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleOrderedList()}
          />
          <Quote
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
            onClick={() => editor.commands.toggleBlockquote()}
          />
          <Highlighter
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className="size-6 p-1 hover:bg-blue-500 transition rounded-sm"
          />
        </div>
      </BubbleMenu>

      <div className="control-group">
        <div className="button-group flex flex-col gap-2 bg-blue-500 text-white p-2 shadow-xl">
          <div className="flex gap-2">
            <Heading1
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            />
            <Heading2
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            />
            <Heading3
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            />
            <Bold
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <Italic
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <Underline
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
            <Strikethrough
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            />
            <List
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ListOrdered
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <Quote
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />
            <Highlighter
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
            />
            <Minus
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            />
            <AArrowUp
              onClick={() => {
                const currentSize =
                  editor.getAttributes("textStyle").fontSize || "16px";

                const newSize = parseInt(currentSize) + 1 + "px";

                editor.chain().focus().setFontSize(newSize).run();
              }}
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
            />
            <AArrowDown
              onClick={() => {
                const currentSize =
                  editor.getAttributes("textStyle").fontSize || "16px";

                const newSize = parseInt(currentSize) - 1 + "px";

                editor.chain().focus().setFontSize(newSize).run();
              }}
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
            />
          </div>
          <div className="flex gap-2 ml-1 items-center">
            Màu chữ:
            <button
              onClick={() => editor.chain().focus().setColor("black").run()}
              className="w-6 h-6 bg-black transition rounded-sm"
            ></button>
            <button
              onClick={() => editor.chain().focus().setColor("#f54254").run()}
              className="w-6 h-6 bg-[#f54254] transition rounded-sm"
            ></button>
            <button
              onClick={() => editor.chain().focus().setColor("#12d40f").run()}
              className="w-6 h-6 bg-[#12d40f] transition rounded-sm"
            ></button>
            <button
              onClick={() => editor.chain().focus().setColor("#ffd029").run()}
              className="w-6 h-6 bg-[#ffd029] transition rounded-sm"
            ></button>
            <button
              onClick={() => editor.chain().focus().setColor("#295bff").run()}
              className="w-6 h-6 bg-[#295bff] transition rounded-sm border-1"
            ></button>
            <button
              onClick={() =>
                editor.chain().focus().setFontFamily("Inter").run()
              }
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
              data-test-id="times new roman"
            >
              Times new Roman
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setFontFamily("monospace").run()
              }
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
              data-test-id="monospace"
            >
              Monospace
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .setFontFamily("var(--title-font-family)")
                  .run()
              }
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
              data-test-id="css-variable"
            >
              CSS variable
            </button>
            <button
              onClick={() => editor.chain().focus().unsetFontFamily().run()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
              data-test-id="unsetFontFamily"
            >
              Unset font
            </button>
          </div>
          <div className="flex gap-2">
            <Table
              className="size-8 p-1 hover:bg-white hover:text-black transition rounded-sm"
              onClick={() =>
                editor.commands.insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow: false,
                })
              }
            />
            <button
              onClick={() => editor.commands.addColumnAfter()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Thêm cột
            </button>
            <button
              onClick={() => editor.commands.deleteColumn()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Xóa cột
            </button>
            <button
              onClick={() => editor.commands.addRowAfter()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Thêm hàng
            </button>
            <button
              onClick={() => editor.commands.deleteRow()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Xóa hàng
            </button>
            <button
              onClick={() => editor.commands.deleteTable()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Xóa bảng
            </button>
            <button
              onClick={() => editor.commands.mergeCells()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Gộp
            </button>
            <button
              onClick={() => editor.commands.splitCell()}
              className="p-1 hover:bg-white hover:text-black transition rounded-sm"
            >
              Tách
            </button>
          </div>
        </div>
      </div>

      <EditorContent editor={editor} />

      <div className="flex gap-2 w-full">
        <button
          onClick={() => onClose()}
          className="mt-4 px-12 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md font-bold transition"
        >
          Hủy
        </button>
        <button
          onClick={handleSave}
          className="mt-4 px-12 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold transition"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
