'use client';

import React from 'react';
import LoginEditableText from './loginedit';
import PasswordEditableText from './passwordeit';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white p-8 gap-4">
      <div className="text-black text-3xl font-normal font-['Inter'] w-full max-w-xs">
        ログイン
      </div>
      <div className="w-full max-w-xs h-14 bg-gray-200 rounded-2xl">
        <LoginEditableText/>
      </div>
      <div className="w-full max-w-xs h-14 bg-gray-200 rounded-2xl">
        <PasswordEditableText/>
      </div>
      <Link href ="./top" className="w-full max-w-md h-16 bg-blue-400 rounded-xl flex items-center justify-center">
        <span className="text-white text-3xl font-normal font-['Inter']">
          ログイン
        </span>
      </Link>
    </div>
  );
}
