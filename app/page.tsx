'use client';

import React from 'react';
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-col gap-6 w-full">
          {/* ボタンエリア */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/login" 
              className="flex flex-col items-center self-stretch bg-[#69A9E2] py-[18px] rounded-lg shadow-sm hover:bg-[#5898d1] transition-colors"
            >
              <span className="text-white text-[32px] font-bold">ログイン</span>
            </Link>

            <Link 
              href="/login/register" 
              className="flex flex-col items-center self-stretch bg-[#69A9E2] py-[18px] rounded-lg shadow-sm hover:bg-[#5898d1] transition-colors"
            >
              <span className="text-white text-[32px] font-bold">新規登録</span>
            </Link>
          </div>

          {/* 補助リンク */}
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <Link href="/top" className="text-zinc-500 hover:underline">
              トップページへ
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
