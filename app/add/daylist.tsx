'use client'

import React, { useState } from "react";
import EditableText from "./inline";
import TimePicker from "./timepicker";
import DatePicker from "./datepicker";
import Microphone from "./microphone";

type Props = {
  category: string;
  onBack: () => void;
  onComplete: () => void;
};

const SelectDate: React.FC<Props> = ({ category, onBack, onComplete }) => {
  const [editableText, setEditableText] = useState(""); // EditableText の文字列
  const [time, setTime] = useState('17:00');
  const [openTimePicker, setOpenTimePicker] = useState(false);

  return (
    <div className="flex flex-col bg-white relative min-h-screen">
      <div className="self-stretch pt-[55px] px-[13px]">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-5">
          <span
            className="text-black text-sm cursor-pointer"
            onClick={onBack}
          >
            ←カテゴリ選択
          </span>

          <span className="text-black text-xl">{category}</span>

          <div className="w-[95px] h-[13px]" />
        </div>

        {/* EditableText */}
        <EditableText
          value={editableText}
          onChange={setEditableText}
        />

        {/* 日付/締切 */}
        <span className="text-[#6A6A6A] text-sm mb-[21px] ml-3.5">
          日付/締切
        </span>

        <div className="flex items-center mb-[34px] ml-[11px] mr-6 gap-10">
          <DatePicker />

          <div
            className="flex flex-1 flex-col items-center cursor-pointer"
            onClick={() => setOpenTimePicker(true)}
          >
            <span className="text-black text-xl">{time}　　v</span>
            <div className="self-stretch bg-[#AEAEB2] h-[1px]" />
          </div>

          {openTimePicker && (
            <TimePicker
              initialTime={time}
              onClose={() => setOpenTimePicker(false)}
              onConfirm={(t) => setTime(t)}
            />
          )}
        </div>

        {/* 通知 */}
        <span className="text-[#8E8E93] text-sm mb-[22px] ml-3">
          通知
        </span>

        <span className="text-black text-xl mb-[3px] ml-4">
          １日前　　　v
        </span>

        <div className="bg-[#AEAEB2] w-[140px] h-[1px] mb-[433px] ml-[11px]" />

        {/* 新規作成ボタン */}
        <div className="flex flex-col items-center bg-[#69A9E1] py-[11px]">
          <span
            onClick={onComplete}
            className="text-white text-2xl cursor-pointer"
          >
            新規作成
          </span>
        </div>
      </div>

      {/* 音声入力サイドバー */}
      <Microphone
        onResult={(text) =>
          setEditableText(prev => prev + text) // 追記型で反映
        }
      />
    </div>
  );
};

export default SelectDate;
