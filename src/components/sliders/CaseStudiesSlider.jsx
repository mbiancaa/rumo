import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { getImageUrl } from '../../utils/imageHelpers';
import { useRef } from "react";

const CaseStudiesSlider = ({ caseStudies }) => {
    const sliderRef = useRef(null);

    var settings = {
        variableWidth: true,
        slidesToScroll: 1,
        infinite: caseStudies.length > 1,
        autoplay: caseStudies.length > 1,
        autoplaySpeed: 8000,
        speed: 2000,
        dots: false,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    };

    const goToPrevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className="caseStudiesCarousel">
            <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                {caseStudies.slice().reverse().map((study, index) => (
                    <NavLink
                        key={study.id}
                        to={`/studii-de-caz/${study.slug}`}
                        className={`caseStudyItem ${index % 2 === 1 ? 'blue' : ''}`}
                    >
                        <div className="left">
                            <span className="number">{String(index + 1).padStart(2, '0')}</span>
                            <h3>{study.title}</h3>
                            <div className="arrowCTA"><span className="arrow"></span></div>
                        </div>
                        <div className="right">
                            <img
                                src={getImageUrl(study.featuredImage)}
                                alt={study.title}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </NavLink>
                ))
                }
            </Slider>
            {caseStudies.length > 3 && (
                <div className="testimonialNavigation" style={{ marginTop: 30 }}>
                    <button
                        className="testimonial_button_prev"
                        onClick={goToPrevSlide}
                        aria-label="Testimonial anterior"
                    >
                        <span className="arrow"></span>
                    </button>
                    <button
                        className={`testimonial_button_next`}
                        onClick={goToNextSlide}
                        aria-label="Testimonial următor"
                    >
                        <span className="arrow"></span>
                    </button>
                </div>
            )}

        </div>
    );
};

export default CaseStudiesSlider;
