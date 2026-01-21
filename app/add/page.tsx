'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SelectCategory from "./category";
import SelectDate from "./daylist";

type Screen = "category" | "date";

export default function Page() {
  const router = useRouter();

  const [screen, setScreen] = useState<Screen>("category");
  const [category, setCategory] = useState<string>("");

  const handleComplete = () => {
    router.push("/top");
  };

  return (
    <>
      {screen === "category" && (
        <SelectCategory
          onSelect={(selectedCategory: string) => {
            setCategory(selectedCategory);
            setScreen("date");
          }}
        />
      )}

      {screen === "date" && (
        <SelectDate
          category={category}
          onBack={() => setScreen("category")}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}