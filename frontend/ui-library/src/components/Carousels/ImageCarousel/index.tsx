import React, { useEffect, useMemo, useRef, useState } from 'react';
import NextImageBox from '@/components/Media/NextImageBox';
import styled from '@emotion/styled';
import lodash from 'lodash';

type Props = {
    srcArr: Array<string>;
};

const Transition_Delay = 500;

const ImageCarousel: React.FC<Props> = ({ srcArr }) => {
    const carouselWindowRef = useRef<HTMLDivElement>(null);
    const clonedSrcArray = useMemo<Array<string>>(
        () => [srcArr.at(-1) || '', ...srcArr, srcArr.at(0) || ''],
        [srcArr],
    );

    const isMoving = useRef(false);
    const [current, setCurrent] = useState(1);
    const [duration, setDuration] = useState(Transition_Delay);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // 부모 사이즈에 따라 조절되는 캐러셀..
        const carouselWindow = carouselWindowRef.current;
        if (!carouselWindow) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                setWidth(width);
            }
        });
        resizeObserver.observe(carouselWindow);
        return () => resizeObserver.unobserve(carouselWindow);
    });

    const move = (position: number) => {
        if (isMoving.current) return;
        isMoving.current = true;
        setDuration(Transition_Delay);
        setCurrent(position);
    };

    const handleNext = () => move(current + 1);
    const handlePrev = () => move(current - 1);

    const handleTransitionEnd = () => {
        isMoving.current = true;
        if (current === 0) {
            setDuration(0);
            setCurrent(clonedSrcArray.length - 2);
        } else if (current === clonedSrcArray.length - 1) {
            setDuration(0);
            setCurrent(1);
        }

        isMoving.current = false;
    };
    return (
        <>
            <CarouselWindow ref={carouselWindowRef}>
                {width}
                <PrevControl onClick={handlePrev}>{'<<'}</PrevControl>
                <CarouselSildes
                    currentSlide={current}
                    duration={duration}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {clonedSrcArray.map((src, idx) => (
                        <div key={idx} style={{ minWidth: width, position: 'relative' }}>
                            <NextImageBox fill src={src} alt={''} />
                        </div>
                    ))}
                </CarouselSildes>
                <NextControl onClick={handleNext}>{'>>'}</NextControl>

                <div>
                    {srcArr.map((_, idx) => (
                        <button
                            id={`bot-control-${idx}`}
                            key={`bot-control-${idx}`}
                            onClick={() => {
                                if (current === clonedSrcArray.length - 2 && idx === 0) {
                                    move(clonedSrcArray.length - 1);
                                } else if (current === 1 && idx === srcArr.length - 1) {
                                    move(0);
                                } else {
                                    move(idx + 1);
                                }
                                isMoving.current = false;
                            }}
                        >
                            move to {idx}
                        </button>
                    ))}
                </div>
            </CarouselWindow>
        </>
    );
};

export default React.memo(ImageCarousel);

const CarouselWindow = styled.div`
    position: relative;
    margin: 0 auto;
    overflow: hidden;
`;

const CarouselSildes = styled.div<{ duration: number; currentSlide: number }>`
    display: flex;
    transition: transform ${({ duration }) => duration}ms ease-out;
    transform: translate3D(${({ currentSlide }) => currentSlide * -100}%, 0, 0);
    img {
        padding: 10px;
    }
`;

const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2em;
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 99;
    &:focus {
        // outline: none;
    }
`;
const PrevControl = styled(CarouselButton)`
    left: 10px;
`;

const NextControl = styled(CarouselButton)`
    right: 10px;
`;
