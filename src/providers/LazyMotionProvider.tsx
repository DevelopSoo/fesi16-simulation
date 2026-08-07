// src/providers/LazyMotionProvider.tsx

"use client";

import { LazyMotion } from "motion/react";

// 애니메이션 기능을 메인 번들에 넣지 않고 별도 청크로 빼고, 백그라운드에서 받아옴
const loadFeatures = () => import("@/lib/feature").then((res) => res.default);

export default function LazyMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
