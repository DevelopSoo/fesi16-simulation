// src/components/ScrollCard/index.tsx

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollCard({
  children,
}: {
  children: React.ReactNode;
}) {
  // ref를 통해 div 참조하기
  const ref = useRef<HTMLDivElement>(null);
  // 현재 스크롤 위치 추적하기
  const { scrollYProgress } = useScroll({
    // target을 설정하면 전체 스크롤 진행률이 아니라
    // 특정 요소가 뷰포트를 지나가는 진행률을 나타냅니다.
    target: ref,
    // 스크롤 진행률의 기준점 세우기
    // start end는 타겟의 시작점(start)이 뷰포트(end)를 지나는 순간이 스크롤 진행률 0이라는 뜻
    // end start는 타겟의 끝점(end)이 뷰포트(start)를 지나는 순간이 스크롤 진행률 1이라는 뜻
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0 -> 0.3 -> 0.7 -> 1일 때
    [0, 0.3, 0.7, 1],
    // opacity가 0.3 -> 1 -> 1 -> 0.3이 되도록 설정
    [0.3, 1, 1, 0.3],
  );

  const y = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0 -> 0.3 -> 0.7 -> 1일 때
    [0, 0.3, 0.7, 1],
    // y가 200 -> 0 -> 0 -> -200이 되도록 설정 (아래에서 위로 올라오는 효과)
    [200, 0, 0, -200], // px 단위
  );

  const scale = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0.2 -> 0.4 -> 0.6 -> 0.8일 때
    // scale이 0.8 -> 1 -> 1 -> 0.8이 되도록 설정
    [0.2, 0.4, 0.6, 0.8],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={ref}
      className="h-64 rounded-xl bg-gray-400 p-6"
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}
