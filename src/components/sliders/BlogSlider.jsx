import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BlogBox from "../BlogBox";

const BlogSlider = ({ posts }) => {
    var settings = {
        variableWidth: true,
        slidesToScroll: 1,
        infinite: posts.length > 1,
        autoplay: posts.length > 1,
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
                {posts.map((post) => (
                    <BlogBox key={post.id} post={post} />
                ))}
            </Slider>
        </div>
    );
}

export default BlogSlider;


