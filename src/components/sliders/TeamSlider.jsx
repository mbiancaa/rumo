import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TeamMember from '../../assets/team_members/team2.png';

const TeamSlider = () => {
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
        <div className="teamContainer">
            <Slider {...settings}>
                <div className="teamMemberContainer">
                    <div className="teamMemberImgContainer">
                        <img src={TeamMember} />
                    </div>
                    <span className="role">CEO | Business Developer | Growth marketing strategist</span>
                    <h3 className="teamMemberName">Monica Rusu</h3>
                </div>
                <div className="teamMemberContainer">
                    <div className="teamMemberImgContainer">
                        <img src={TeamMember} />
                    </div>
                    <span className="role">Full-Stack Developer | Web Development</span>
                    <h3 className="teamMemberName">Bianca D.</h3>
                </div>
                <div className="teamMemberContainer">
                    <div className="teamMemberImgContainer">
                        <img src={TeamMember} />
                    </div>
                    <span className="role">SEO Strategist</span>
                    <h3 className="teamMemberName">Nicoleta T.</h3>
                </div>
                <div className="teamMemberContainer">
                    <div className="teamMemberImgContainer">
                        <img src={TeamMember} />
                    </div>
                    <span className="role">PPC Strategist</span>
                    <h3 className="teamMemberName">Bogdan P.</h3>
                </div>
                <div className="teamMemberContainer">
                    <div className="teamMemberImgContainer">
                        <img src={TeamMember} />
                    </div>
                    <span className="role">Social Media Expert</span>
                    <h3 className="teamMemberName">Stefana I.</h3>
                </div>
                <div className="teamMemberContainer">
                    <div className="teamMemberImgContainer">
                        <img src={TeamMember} />
                    </div>
                    <span className="role">Brand Manager</span>
                    <h3 className="teamMemberName">Nicoleta M.</h3>
                </div>
            </Slider>
        </div>
    );
};

export default TeamSlider;
