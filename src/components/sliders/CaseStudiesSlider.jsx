import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";

const CaseStudiesSlider = ({ caseStudies }) => {

    var settings = {
        variableWidth: true,
        slidesToScroll: 1,
        infinite: caseStudies.length > 1,
        autoplay: caseStudies.length > 1,
        autoplaySpeed: 8000,
        speed: 4000,
        dots: false,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    };

    return (
        <div className="caseStudiesCarousel">
            <Slider {...settings}>
                {caseStudies.map((study, index) => (
                        <NavLink 
                            key={study._id} 
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
                                    src={study.featuredImage ? 
                                        (study.featuredImage.startsWith('http') ? 
                                            study.featuredImage : 
                                            `${process.env.REACT_APP_URL || 'http://localhost:5002'}${study.featuredImage}`
                                        ) : 
                                        '/placeholder.jpg'
                                    } 
                                    alt={study.title} 
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </NavLink>
                    ))
                }
            </Slider>
        </div>
    );
};

export default CaseStudiesSlider;
