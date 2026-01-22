'use client';

import { useState, useRef, useEffect } from 'react';

type Props = {
  value: string;                 // 表示文字列
  onChange: (newValue: string) => void; // 文字列変更時コールバック
  appendText?: string;           // 追加文字列（音声入力）
};

const EditableText: React.FC<Props> = ({ value, onChange, appendText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // appendText があれば現在のカーソル位置に挿入
  useEffect(() => {
    if (!appendText) return;

    const input = inputRef.current;
    if (!input) {
      // 編集中でない場合は最後に追加
      onChange(value + appendText);
      return;
    }

    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;

    const newValue = value.slice(0, start) + appendText + value.slice(end);
    onChange(newValue);

    // カーソル位置を更新
    const cursorPos = start + appendText.length;
    setTimeout(() => {
      input.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }, [appendText, onChange, value]);

  const textStyle = "text-xl mb-[38px] ml-[13px]";

  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setIsEditing(false);
          }}
          className={textStyle}
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className={`cursor-pointer ${textStyle}`}
        >
          {value || "内容を入力"}
        </p>
      )}
    </div>
  );
};

export default EditableText;
