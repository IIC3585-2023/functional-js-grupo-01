import { useState } from 'react';

const useLocalStorage = (key: any, initialValue = null) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
		setStoredValue(value);
	};

	const clearValue = () => {
		localStorage.removeItem(key);
		setStoredValue(null);
	};

	return [storedValue, setValue, clearValue];
};

export default useLocalStorage;
