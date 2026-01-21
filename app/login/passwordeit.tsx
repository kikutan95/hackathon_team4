import { useState } from 'react';

export default function PasswordEditableText() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('メールアドレスを入力');

  const textStyle = "text-xl mb-[38px] ml-[13px]";

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
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
          {text}
        </p>
      )}
    </div>
  );
}