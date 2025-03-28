import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AgencyImg1 from '../../assets/agency-img1.png';

const CaseStudiesSlider = () => {
    var settings = {
        variableWidth: true,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1500,
        dots: false,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    };

    return (
        <div className="caseStudiesCarousel">
            <Slider {...settings}>
                <div className="caseStudyItem">
                    <div className="left">
                        <span className="number">01</span>
                        <h3>De la cabinet stomatologic mic la clinică de top - stomatologie</h3>
                        <a href="" className="arrowCTA"><span className="arrow"></span></a>
                    </div>
                    <div className="right">
                        <img src={AgencyImg1} />
                    </div>
                </div>
                <div className="caseStudyItem blue">
                    <div className="left">
                        <span className="number">02</span>
                        <h3>De la 800 followers la 10.000, în doar un an - consultanță afaceri</h3>
                        <a href="" className="arrowCTA"><span className="arrow"></span></a>
                    </div>
                    <div className="right">
                        <img src={AgencyImg1} />
                    </div>
                </div>
                <div className="caseStudyItem">
                    <div className="left">
                        <span className="number">03</span>
                        <h3>Crearea unei prezențe online puternice de la zero - chirurgie generală</h3>
                        <a href="" className="arrowCTA"><span className="arrow"></span></a>
                    </div>
                    <div className="right">
                        <img src={AgencyImg1} />
                    </div>
                </div>
                <div className="caseStudyItem blue">
                    <div className="left">
                        <span className="number">04</span>
                        <h3>Creșterea unei cafenele prin social media marketing - HoReCa</h3>
                        <a href="" className="arrowCTA"><span className="arrow"></span></a>
                    </div>
                    <div className="right">
                        <img src={AgencyImg1} />
                    </div>
                </div>
                <div className="caseStudyItem">
                    <div className="left">
                        <span className="number">05</span>
                        <h3>De la reticență la notorietate - medic specialist chirurgie plastică</h3>
                        <a href="" className="arrowCTA"><span className="arrow"></span></a>
                    </div>
                    <div className="right">
                        <img src={AgencyImg1} />
                    </div>
                </div>
                <div className="caseStudyItem blue">
                    <div className="left">
                        <span className="number">06</span>
                        <h3>Ce a decis Dr. Mihai-Ștefan Mureșan pe parcursul colaborării cu RUMO?</h3>
                        <a href="" className="arrowCTA"><span className="arrow"></span></a>
                    </div>
                    <div className="right">
                        <img src={AgencyImg1} />
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default CaseStudiesSlider;
