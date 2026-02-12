"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import styled from "styled-components";

// Analyze: Types 1–2 indicate constipation (likely need more fiber/water), while 5–7 indicate diarrhea (may indicate infection or food sensitivities).
const BRISTOL_TYPES = [
  { type: 1, description: "Separate hard lumps, like nuts (hard to pass)" },
  { type: 2, description: "Sausage-shaped but lumpy" },
  { type: 3, description: "Like a sausage but with cracks on the surface" },
  { type: 4, description: "Like a sausage or snake, smooth and soft (Ideal)" },
  { type: 5, description: "Soft blobs with clear-cut edges" },
  { type: 6, description: "Fluffy pieces with ragged edges, a mushy stool" },
  { type: 7, description: "Watery, no solid pieces, entirely liquid" },
];

type Props = {
  onSelect: (type: number) => void;
};

export function Carousel({ onSelect }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 3 });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", (embla) => {
      const selectedIndex = embla.selectedScrollSnap();
      const stool = BRISTOL_TYPES[selectedIndex];
      onSelect(stool.type);
    });
  }, [emblaApi, onSelect]);

  return (
    <div className="embla">
      <SlideViewport ref={emblaRef}>
        <SlideContainer>
          {BRISTOL_TYPES.map((stool) => (
            <Slide key={`bristol-${stool.type}`}>
              <SlideContents>
                <p>{stool.type}</p>
                <p>{stool.description}</p>
              </SlideContents>
            </Slide>
          ))}
        </SlideContainer>
      </SlideViewport>
    </div>
  );
}

const Slide = styled.div`
  flex: 0 0 66%;
  min-width: 0;
  height: 32rem;
  padding-left: 1rem;
  display: flex;
`;

const SlideContents = styled.div`
  background-color: #000;
  width: 100%;
  color: #fff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SlideContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: -1rem;
`;

const SlideViewport = styled.div`
  overflow: hidden;
`;
