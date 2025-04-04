import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BlogImage from '../../assets/agency-img1.png';
import BlogBox from "../BlogBox";

const BlogSlider = () => {
    var settings = {
        variableWidth: true,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
        speed: 4000,
        dots: false,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    };

    return (
        <div className="blogSlider">
            <Slider {...settings}>
                <BlogBox />
                <BlogBox />
                <BlogBox />
                <BlogBox />
                <BlogBox />
                <BlogBox />
            </Slider>
        </div>
    );
}

export default BlogSlider;


