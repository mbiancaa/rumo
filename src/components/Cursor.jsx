import { useEffect, useRef } from 'react';
import style from '../styles/modules/Cursor.module.css';

const Cursor = () => {
    const innerRef = useRef(null);
    const outerRef = useRef(null);

    useEffect(() => {
        const inner = innerRef.current;
        const outer = outerRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isMoving) {
                outer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
            inner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        };

        document.addEventListener('mousemove', onMouseMove);

        inner.style.visibility = 'visible';
        outer.style.visibility = 'visible';

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={outerRef} className={`${style.mouseCursor} ${style.mouseOuter}`} />
            <div ref={innerRef} className={`${style.mouseCursor} ${style.mouseInner}`} />
        </>
    );
};

export default Cursor;
