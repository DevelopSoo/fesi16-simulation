import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  // localStorage가 변하면 callback을 실행할거야.
  window.addEventListener("storage", callback);
  // 컴포넌트가 언마운트되면 storage 이벤트 리스너를 제거할거야.
  return () => window.removeEventListener("storage", callback);
}

function useLocalStorage(key: string) {
  // subscribe: storage 변경이 일어났다는 신호를 감지하고 React에 알림
  // getSnapshot: localStorage 값을 읽어 이전 값과 비교 후 리렌더링 여부 결정
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null,
  );
}

function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  // 같은 탭에도 "값 바뀌었어!" 하고 직접 알려줍니다
  window.dispatchEvent(new StorageEvent("storage", { key }));
}

export { useLocalStorage, setLocalStorage };
