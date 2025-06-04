import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Default Quill color palette (30 colors)
const defaultColors = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
  '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
  '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
  '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
  '#444444', '#5c0000'
];

// Import Quill styles and set whitelist for color and background
const ColorStyle = Quill.import('attributors/style/color');
ColorStyle.whitelist = [...defaultColors, 'var(--blue)', 'var(--green)'];
Quill.register(ColorStyle, true);

const BackgroundStyle = Quill.import('attributors/style/background');
BackgroundStyle.whitelist = [...defaultColors, 'var(--blue)', 'var(--green)'];
Quill.register(BackgroundStyle, true);

const RichTextEditor = forwardRef(({ value, onChange, placeholder }, ref) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Forward the quill instance or methods
  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current,
  }));

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': ColorStyle.whitelist }, { 'background': BackgroundStyle.whitelist }],
        ['link', 'image'],
        ['clean']
      ];

      const quill = new Quill(editorRef.current, {
        modules: { toolbar: toolbarOptions },
        placeholder: placeholder || 'Introduceți conținutul...',
        theme: 'snow'
      });

      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onChange(content);
      });

      quillRef.current = quill;
    }
  }, [onChange, placeholder]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || '';
    }
  }, [value]);

  return (
    <div className="rich-text-editor">
      <div ref={editorRef} />
    </div>
  );
});

export default RichTextEditor;
