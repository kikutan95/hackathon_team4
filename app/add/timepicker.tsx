'use client';

import React, { useRef, useState } from 'react';

type Props = {
  initialTime?: string; // "17:00"
  onClose: () => void;
  onConfirm: (time: string) => void;
};

const TimePicker: React.FC<Props> = ({
  initialTime = '17:00',
  onClose,
  onConfirm,
}) => {
  const [hour, setHour] = useState(Number(initialTime.split(':')[0]));
  const [minute, setMinute] = useState(Number(initialTime.split(':')[1]));

  const touchStartY = useRef<number | null>(null);

  /* ========= ユーティリティ ========= */
  const getLoopedNumbers = (
    current: number,
    range: number,
    size: number = 2
  ) =>
    Array.from({ length: size * 2 + 1 }, (_, i) => {
      const offset = i - size;
      return (current + offset + range) % range;
    });

  const clampLoop = (value: number, range: number) =>
    (value + range) % range;

  /* ========= 操作ハンドラ ========= */
  const handleWheel = (
    e: React.WheelEvent,
    setter: (v: number) => void,
    current: number,
    range: number
  ) => {
    e.preventDefault();
    setter(clampLoop(current + (e.deltaY > 0 ? 1 : -1), range));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (
    e: React.TouchEvent,
    setter: (v: number) => void,
    current: number,
    range: number
  ) => {
    if (touchStartY.current === null) return;

    const diff = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diff) > 20) {
      setter(clampLoop(current + (diff > 0 ? 1 : -1), range));
    }

    touchStartY.current = null;
  };

  const handleConfirm = () => {
    onConfirm(
      `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full bg-white rounded-t-[1.5rem] shadow-2xl overflow-hidden animate-slideUp">

        {/* ハンドル */}
        <div className="pt-3 pb-2 flex justify-center">
          <div className="h-1.5 w-10 rounded-full bg-zinc-200" />
        </div>

        {/* ヘッダー */}
        <div className="flex items-center px-4 pb-2">
          <button className="text-primary text-[17px]" onClick={onClose}>
            キャンセル
          </button>

          <h2 className="flex-1 text-center text-lg font-semibold">
            時刻設定
          </h2>

          <button
            className="text-primary text-[17px] font-semibold"
            onClick={handleConfirm}
          >
            完了
          </button>
        </div>

        {/* ホイール */}
        <div className="relative px-6 py-6">
          <div className="absolute inset-x-8 top-1/2 h-10 -translate-y-1/2 bg-zinc-100/80 rounded-lg pointer-events-none" />

          <div className="flex relative z-10">

            {/* 時 */}
            <div
              className="flex-1 text-center"
              onWheel={(e) => handleWheel(e, setHour, hour, 24)}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, setHour, hour, 24)}
            >
              {getLoopedNumbers(hour, 24).map((h) => (
                <p
                  key={h}
                  className={`h-10 flex items-center justify-center ${
                    h === hour
                      ? 'text-[28px] font-semibold text-zinc-900'
                      : 'text-xl text-zinc-400'
                  }`}
                >
                  {String(h).padStart(2, '0')}
                </p>
              ))}
            </div>

            <div className="flex items-center px-4">
              <span className="text-2xl font-semibold">:</span>
            </div>

            {/* 分 */}
            <div
              className="flex-1 text-center"
              onWheel={(e) => handleWheel(e, setMinute, minute, 60)}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, setMinute, minute, 60)}
            >
              {getLoopedNumbers(minute, 60).map((m) => (
                <p
                  key={m}
                  className={`h-10 flex items-center justify-center ${
                    m === minute
                      ? 'text-[28px] font-semibold text-zinc-900'
                      : 'text-xl text-zinc-400'
                  }`}
                >
                  {String(m).padStart(2, '0')}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default TimePicker;
