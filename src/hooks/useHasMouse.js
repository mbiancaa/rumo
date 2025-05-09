import { useEffect, useState } from 'react';

const useHasMouse = () => {
    const [hasMouse, setHasMouse] = useState(false);

    useEffect(() => {
        const match = window.matchMedia('(pointer: fine)');
        setHasMouse(match.matches);

        const handler = (e) => setHasMouse(e.matches);
        match.addEventListener('change', handler);

        return () => match.removeEventListener('change', handler);
    }, []);

    return hasMouse;
};

export default useHasMouse;