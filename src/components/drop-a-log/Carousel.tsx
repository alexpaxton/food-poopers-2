"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import styled from "styled-components";

import { POOP_ART } from "@/components/drop-a-log/poop-art/PoopArt";

import { BRISTOL_TYPES, POOP_COLORS } from "@/constants";

type Props = {
  selectedType: number;
  onSelect: (type: number) => void;
  color: string;
  spicy: boolean;
};

export function Carousel({ onSelect, selectedType, color, spicy }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 3 });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", (embla) => {
      const selectedIndex = embla.selectedScrollSnap();
      const stool = BRISTOL_TYPES[selectedIndex];
      onSelect(stool.type);
    });
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(selectedType - 1, false);
  }, [selectedType, emblaApi]);

  const colors = getPoopColors(color);

  return (
    <SlideViewport ref={emblaRef}>
      <SlideContainer>
        {BRISTOL_TYPES.map((stool) => {
          const Artwork = POOP_ART[stool.type];
          return (
            <Slide key={`bristol-${stool.type}`}>
              <SlideContents>
                <Artwork
                  className="poop"
                  selected={stool.type === selectedType}
                  spicy={spicy}
                  primaryColor={colors.hex}
                  secondaryColor={colors.accent}
                />
                <Description>{stool.description}</Description>
              </SlideContents>
            </Slide>
          );
        })}
      </SlideContainer>
    </SlideViewport>
  );
}

function getPoopColors(color: string) {
  const poop = POOP_COLORS.find((c) => c.color === color);

  if (!poop) {
    throw new Error("getPoopColors was passed an erroneous color");
  }

  return poop;
}

const Slide = styled.div`
  flex: 0 0 80%;
  min-width: 0;
  height: 40rem;
  display: flex;
  position: relative;
  padding: 1rem;
  position: relative;
`;

const SlideContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 5;
  padding: 0 2rem;
`;

const SlideContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
`;

const SlideViewport = styled.div`
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 2rem;
  font-weight: 400;
  padding: 0 3rem;
  width: 100%;
  text-align: center;
`;
