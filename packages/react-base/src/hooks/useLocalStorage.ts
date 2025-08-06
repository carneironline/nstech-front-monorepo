import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (err) {
            console.error(err);
        }
    };

    return [storedValue, setValue] as const;
}
