import { useEffect, useState } from "react";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";

import { easeOut, motion, useMotionValue } from "framer-motion";
import Dots from "./Dots";
const imgs = [image1, image2, image3];
const DRAG_BUFFER = 50; // how much the user needs to drag to change the image
const AUTO_DELAY = 1000;
const SPRING_OPTIONS = {
  type: "spring", // Use "spring" for spring animations
  mass: 1,
  stiffness: 200, // Adjust stiffness for snappiness
  damping: 20, // Damping controls oscillation
};

export default function SwipeCarousel() {
  const [dragging, setDragging] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    if (dragging) return; // stop auto play when grabed
    const intervalRef = setInterval(() => {
      console.log(imgIndex);
      if (imgIndex === imgs.length - 1) {
        setImgIndex(0);
      } else {
        setImgIndex((prev) => prev + 1);
      }
    }, AUTO_DELAY);
    return () => clearInterval(intervalRef);
  });

  const onDragStart = () => {
    setDragging(true);
  };
  const onDragStop = () => {
    setImgIndex(0); // I decided to return to index zero after i stop grabbing the image
    setDragging(false);
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative  min-h-screen overflow-hidden bg-neutral-950 py-8 ">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        style={{
          x: dragX, // as we drag the image, it will update the dragX value
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragStop}
        className="flex items-center cursor-grab active:cursor-grabbing "
      >
        <Images imgIndex={imgIndex} />
      </motion.div>
      <Dots imgs={imgs} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
}
type ImagesProps = {
  imgIndex: number;
};
const Images = ({ imgIndex }: ImagesProps) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-[600px] w-screen flex-shrink-0 rounded-xl bg-neutral-800 object-cover "
          ></motion.div>
        );
      })}
    </>
  );
};
