import React, { ReactNode } from "react";

export default function Dropdwon({ children }: { children: React.ReactNode }) {
  return (
    <ul className="bg-[#2a272f]  rounded-md border border-[#535156] absolute">
      {children}
    </ul>
  );
}
