import React, { useEffect, useRef, useState } from "react";
import "./fade.css";

export default function FadeInOnScroll({ children, className = "" }) {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`fade-wrap ${visible ? "fade-in" : "fade-out"} ${className}`}
        >
            {children}
        </div>
    );
}
