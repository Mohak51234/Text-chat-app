import React,{useEffect,useState} from 'react'

const PREFIX="whatsapp-clone-"

export default function UseLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => { 
        const jsonValue = localStorage.getItem(prefixedKey);
        // console.log("Hi");
        if (jsonValue != null && jsonValue!="undefined") return JSON.parse(jsonValue);
        // console.log("Bye");
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
