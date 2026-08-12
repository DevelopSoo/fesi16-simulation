// src/app/page.tsx
"use client";

import { setLocalStorage, useLocalStorage } from "@/hooks/useLocalStorage";

const products = [
  { id: 1, name: "노트북" },
  { id: 2, name: "스마트폰" },
  { id: 3, name: "태블릿" },
  { id: 4, name: "이어폰" },
  { id: 5, name: "키보드" },
];

export default function Home() {
  // 1. "recentProducts" 라는 키의 로컬 스토리지 값을 가져온다.
  const raw = useLocalStorage("recentProducts");
  const recentProducts: string[] = raw ? JSON.parse(raw) : [];

  const handleProductClick = (productName: string) => {
    const updated = [
      productName,
      ...recentProducts.filter((name) => name !== productName),
    ];
    // 2. 로컬스토리지 값을 저장한다.
    setLocalStorage("recentProducts", JSON.stringify(updated));
  };

  return (
    <div className="relative">
      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">상품 목록</h1>
        <ul className="flex flex-wrap gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <button
                onClick={() => handleProductClick(product.name)}
                className="cursor-pointer rounded border p-4 hover:bg-gray-100"
              >
                {product.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed top-4 right-4 rounded bg-blue-500 p-4 text-white shadow-lg">
        <div className="mb-2 font-bold">최근 본 상품</div>
        <ul className="space-y-1">
          {recentProducts.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
