import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ReactComponent as QuoteIcon } from '../../assets/quote-icon2.svg';
import { useRef, useState } from "react";

const CEOTestimonialSlider = () => {
    const sliderRef = useRef(null);
    const [blink, setBlink] = useState(true);

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false
    };

    const goToPrevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
            setBlink(false);
        }
    };

    return (
        <div className="testimonialBoxContainer ceoTestimonial">
            <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                {testimonials.map((testimonial, index) => (
                    <div className="testimonialItem" key={index}>
                        <QuoteIcon width="54" height="42" loading="lazy" />
                        <div>
                            <h4>{testimonial.title}</h4>
                            {testimonial.content.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="testimonialNavigation">
                <button className="testimonial_button_prev" onClick={goToPrevSlide}>
                    <span className="arrow"></span>
                </button>
                <button
                    className={`testimonial_button_next ${blink ? "blinking" : ""}`}
                    onClick={goToNextSlide}
                >
                    <span className="arrow"></span>
                </button>
            </div>
        </div>
    );
};

const testimonials = [
    {
        title: "Mă definesc integritatea, evoluția și pasiunea.",
        content: [
            "Valorile mele organizationale mai includ: o viziune strategică, comunicare eficientă, orientare spre rezultate și, mai presus de orice, focus pe oameni."
        ]
    },
    {
        title: "Parcursul meu profesional",
        content: [
            "Pe parcursul ultimului deceniu, cariera mea s-a dezvoltat constant în sfera antreprenoriatului.",
            "Experiența antreprenorială m-a ajutat să înțeleg în profunzime atât oportunitățile, cât și obstacolele cu care se confruntă afacerile mici și mijlocii."
        ]
    },
    {
        title: "Parteneriat potențial profitabil",
        content: [
            "Un parteneriat bazat pe integritate și implicare din ambele părți are potențialul de a fi profitabil și durabil."
        ]
    },
    {
        title: "Cum a luat RUMO naștere?",
        content: [
            "RUMO a luat naștere în mod firesc, pe parcursul dezvoltării mele în antreprenoriat."
        ]
    },
    {
        title: "Viziunea RUMO",
        content: [
            "În următorii cinci ani, ne dorim să devenim un partener esențial pentru companiile mici și mijlocii, contribuind semnificativ la creșterea acestora.",
            "Astăzi, în calitate de CEO al RUMO, mă concentrez pe menținerea și dezvoltarea unei echipe de profesioniști dedicată performanței."
        ]
    }
];

export default CEOTestimonialSlider;
