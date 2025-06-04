import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { teamMemberService } from '../../services/api';
import { getImageUrl } from '../../utils/imageHelpers';
import { useRef } from "react";

const TeamSlider = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                setLoading(true);
                const members = await teamMemberService.getAll();
                setTeamMembers(members);
                setError(null);
            } catch (err) {
                console.error('Error fetching team members:', err);
                setError('Eroare la încărcarea membrilor echipei');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

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

    if (loading) {
        return <div>Se încarcă membrii echipei...</div>;
    }

    if (error) {
        return <div>Eroare: {error}</div>;
    }

    if (teamMembers.length === 0) {
        return <div>Nu există membri în echipă</div>;
    }

    return (
        <div className="teamContainer">
            <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                {teamMembers.map((member) => (
                    <div key={member.id} className="teamMemberContainer">
                        <div className="teamMemberImgContainer">
                            <img
                                src={getImageUrl(member.image)}
                                alt={member.name}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <span className="role">{member.title}</span>
                        <h3 className="teamMemberName">{member.name}</h3>
                    </div>
                ))}
            </Slider>
            {teamMembers.length > 2 && (
                <div className="testimonialNavigation" style={{ marginTop: 10 }}>
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

export default TeamSlider;
