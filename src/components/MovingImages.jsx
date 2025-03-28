import { useState, useEffect } from 'react';
import AgencyImg1 from '../assets/agency-img1.png';
import AgencyImg2 from '../assets/agency-img2.png';

const MovingImages = () => {

    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            let offsY = (window.scrollY / 70) > 100 || (window.scrollY / 70) < -100 ? 40 : window.scrollY / 70;
            setScrollOffset(offsY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flexContainer d-flex">
            <div className="p-relative">
                <img
                    style={{
                        zIndex: 1,
                        width: 130,
                        height: 320,
                        objectFit: "cover",
                        marginRight: 60,
                        marginTop: (-scrollOffset) * 2,
                        transition: "transform 1s ease-in-out"
                    }}
                    src={AgencyImg1}
                />
                <span className="reversed">Your Digital Path</span>
            </div>
            <img
                style={{
                    zIndex: 1,
                    width: 130,
                    height: 320,
                    objectFit: "cover",
                    marginTop: (+scrollOffset) * 2,
                    transition: "transform 1s ease-in-out"
                }}
                src={AgencyImg2}
            />
        </div>
    );

}

export default MovingImages;