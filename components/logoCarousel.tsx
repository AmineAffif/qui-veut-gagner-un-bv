import { useEffect, useRef } from "react";

interface LogoCarouselProps {
  logos: string[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;

    if (!scrollContainer) return;

    const scrollStep = () => {
      if (!scrollContainer) return;
      scrollContainer.scrollLeft += 1;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-[200px] overflow-hidden relative bg-white">
      <div
        ref={scrollContainerRef}
        className="flex w-[200%] h-full animate-scroll space-x-4"
      >
        <div className="flex w-full h-full space-x-4 justify-around">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-full flex items-center justify-center w-[200px]"
            >
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="h-auto max-h-full"
              />
            </div>
          ))}
        </div>
        <div className="flex w-full h-full space-x-4 justify-around">
          {logos.map((logo, index) => (
            <div
              key={index + logos.length}
              className="flex-shrink-0 h-full flex items-center justify-center w-[200px]"
            >
              <img
                src={logo}
                alt={`Logo ${index}`}
                height={70}
                className="h-[70px] max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
