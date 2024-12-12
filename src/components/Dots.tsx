import React, { Dispatch, SetStateAction } from "react";

type DotsProps = {
  imgs: string[];
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
};
export default function Dots({ imgs, imgIndex, setImgIndex }: DotsProps) {
  return (
    <div className="flex w-full justify-center p-3 gap-2">
      {imgs.map((img, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`w-4 h-4 rounded-full ${
              idx === imgIndex ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        );
      })}
    </div>
  );
}
