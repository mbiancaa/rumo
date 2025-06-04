import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BlogBox from "../BlogBox";
import { useRef } from "react";

const BlogSlider = ({ posts }) => {
    const sliderRef = useRef(null);

    var settings = {
        variableWidth: true,
        slidesToScroll: 1,
        infinite: posts.length > 1,
        autoplay: posts.length > 1,
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
        <div className="blogSlider">
            <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                {posts.map((post) => (
                    <BlogBox key={post.id} post={post} />
                ))}
            </Slider>
            {posts.length > 3 && (
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
}

export default BlogSlider;


