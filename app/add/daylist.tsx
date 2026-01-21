'use client'

import React,{useState} from "react";
import EditableText from "./inline";
import TimePicker from "./timepicker";
import DatePicker from "./datepicker";

type Props = {
  category: string;
  onBack: () => void;
  onComplete: () => void;
};

const SelectDate: React.FC<Props> = ({ category, onBack, onComplete }) => {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('17:00');

  return (
    <div className="flex flex-col bg-white">
      <div className="self-stretch">
        <div className="self-stretch relative">
          <div className="flex flex-col items-start self-stretch bg-white pt-[55px]">
            <div className="flex justify-between items-center self-stretch mb-5 mx-[13px]">
              <span
                className="text-black text-sm cursor-pointer"
                onClick={onBack}
              >
                ←カテゴリ選択
              </span>

              <span className="text-black text-xl">{category}</span>

              <div className="w-[95px] h-[13px]" />
            </div>

            <EditableText />

            <span className="text-[#6A6A6A] text-sm mb-[21px] ml-3.5">
              日付/締切
            </span>

            <div className="flex items-center self-stretch mb-[34px] ml-[11px] mr-6 gap-10">
              <DatePicker />

              <div
               className="flex flex-1 flex-col items-center cursor-pointer"
               onClick={() => setOpen(true)}
              >
                <span className="text-black text-xl">
                  {time}　　v
                </span>
                <div className="self-stretch bg-[#AEAEB2] h-[1px]" />
              </div>
              {open && (
                <TimePicker
                 initialTime={time}
                 onClose={() => setOpen(false)}
                 onConfirm={(t) => setTime(t)}
                 />
              )}
            </div>

            <span className="text-[#8E8E93] text-sm mb-[22px] ml-3">
              通知
            </span>

            <span className="text-black text-xl mb-[3px] ml-4">
              １日前　　　v
            </span>

            <div className="bg-[#AEAEB2] w-[140px] h-[1px] mb-[433px] ml-[11px]" />

            <div className="flex flex-col items-center self-stretch bg-[#69A9E1] py-[11px]">
              <span
               onClick={onComplete}
               className="text-white text-2xl"
              >
                {"新規作成"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;

