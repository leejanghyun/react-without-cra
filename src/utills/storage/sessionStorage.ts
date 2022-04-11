import { useEffect, useState } from 'react';

type AllowType = string | boolean | object;

// Session Storage 사용
export const useSessionStorage = (key: string, initialState: AllowType) => {
  const sessionStorage = window.sessionStorage;
  const [state, setState] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // 데이터 변경 시
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // 초기 마운트 시
  useEffect(() => {
    // Session Storage 변화 시
    const onModifyStorage = (e: StorageEvent) => {
      if (e.storageArea !== sessionStorage || key !== e.key) {
        return;
      }
      setState(JSON.parse(e.newValue ?? '[]'));
    };

    window.addEventListener('storage', onModifyStorage);
    return () => window.removeEventListener('storage', onModifyStorage);
  }, []);

  return [state, setState];
};

export default useSessionStorage;
