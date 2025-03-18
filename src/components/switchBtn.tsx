import { useState } from "react";

export default function SwitchBtn() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ${
          enabled ? "translate-x-7" : ""
        }`}
      ></div>
    </button>
  );
}
