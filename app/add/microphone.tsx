'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiX } from 'react-icons/fi';

// ====== SpeechRecognition 型定義（ブラウザ非対応型も含む） ======
declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// ====== Microphone コンポーネント ======
type MicrophoneProps = {
  onResult?: (text: string) => void; // 音声認識結果コールバック
};

const Microphone: React.FC<MicrophoneProps> = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert('このブラウザは音声認識に対応していません');
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = 'ja-JP';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
      if (onResult) onResult(spokenText);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <>
      {/* マイクボタン */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FiMic size={24} />
      </button>

      {/* サイドバー */}
      <div
        className={`fixed bottom-0 right-0 w-80 max-w-full h-64 bg-white border-t border-l shadow-lg transform transition-transform ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">音声入力</h2>
          <button onClick={() => setOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full h-24"
            value={text}
            placeholder="ここに音声入力されます"
            readOnly
          />

          <button
            onClick={toggleListening}
            className={`px-4 py-2 rounded text-white ${
              listening ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {listening ? '録音中...' : '音声入力開始'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Microphone;
