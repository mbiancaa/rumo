import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BlogImage from '../../assets/team_members/team2.png';

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
                <article className="blogBox">
                    <img src={BlogImage} />
                    <div className="blogContentWrapper">
                        <span className="blogCategory">SEO Marketing</span>
                        <h3 className="blogTitle"><a href="">How to boost your search rankings with keyword optimization</a></h3>
                        <div className="blogFooter">
                            <span className="blogDate">7 Mar, 2025</span>
                            <span className="blogTime">5 min read</span>
                        </div>
                    </div>
                </article>
                <article className="blogBox">
                    <img src={BlogImage} />
                    <div className="blogContentWrapper">
                        <span className="blogCategory">SEO Marketing</span>
                        <h3 className="blogTitle"><a href="">How to boost your search rankings with keyword optimization</a></h3>
                        <div className="blogFooter">
                            <span className="blogDate">7 Mar, 2025</span>
                            <span className="blogTime">5 min read</span>
                        </div>
                    </div>
                </article>
                <article className="blogBox">
                    <img src={BlogImage} />
                    <div className="blogContentWrapper">
                        <span className="blogCategory">SEO Marketing</span>
                        <h3 className="blogTitle"><a href="">How to boost your search rankings with keyword optimization</a></h3>
                        <div className="blogFooter">
                            <span className="blogDate">7 Mar, 2025</span>
                            <span className="blogTime">5 min read</span>
                        </div>
                    </div>
                </article>
                <article className="blogBox">
                    <img src={BlogImage} />
                    <div className="blogContentWrapper">
                        <span className="blogCategory">SEO Marketing</span>
                        <h3 className="blogTitle"><a href="">How to boost your search rankings with keyword optimization</a></h3>
                        <div className="blogFooter">
                            <span className="blogDate">7 Mar, 2025</span>
                            <span className="blogTime">5 min read</span>
                        </div>
                    </div>
                </article>
            </Slider>
        </div>
    );
}

export default BlogSlider;


