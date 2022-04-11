import { useEffect, useState } from 'react';

type AllowType = string | boolean | object;

// Local Storage 사용
export const useLocalStorage = (key: string, initialState: AllowType) => {
  const localStorage = window.localStorage;
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // 데이터 변경 시
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // 초기 마운트 시
  useEffect(() => {
    // Local Storage 변화 시
    const onModifyStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage || key !== e.key) {
        return;
      }
      setState(JSON.parse(e.newValue ?? '[]'));
    };

    window.addEventListener('storage', onModifyStorage);
    return () => window.removeEventListener('storage', onModifyStorage);
  }, []);

  return [state, setState];
};

export default useLocalStorage;
