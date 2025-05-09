import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { teamMemberService } from '../../services/api';

const TeamSlider = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                setLoading(true);
                const members = await teamMemberService.getAll();
                setTeamMembers(members);
                setError(null);
            } catch (err) {
                console.error('Error fetching team members:', err);
                setError('Failed to load team members');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);

    // Helper function to get the full image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
            return imagePath;
        }
        return `${process.env.REACT_APP_URL || 'http://localhost:5002'}${imagePath}`;
    };

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

    if (loading) {
        return <div>Loading team members...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (teamMembers.length === 0) {
        return <div>No team members found</div>;
    }

    return (
        <div className="teamContainer">
            <Slider {...settings}>
                {teamMembers.map((member) => (
                    <div key={member._id} className="teamMemberContainer">
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
        </div>
    );
};

export default TeamSlider;
