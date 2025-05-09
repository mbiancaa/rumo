import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ReactComponent as QuoteIcon } from '../../assets/quote-icon2.svg';
import { useRef } from "react";

const ClientTestimonialSlider = () => {
    const sliderRef = useRef(null);

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 2000,
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
        }
    };

    return (
        <>
            <h2 className="testimonialSliderTitle">
                Ce spun clienții noștri
            </h2>
            <div className="testimonialBoxContainer clientTestimonial">
                <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div className="testimonialItem" key={index}>
                            <QuoteIcon width="54" height="42" loading="lazy" />
                            <div>
                                {testimonial.content.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            <div style={{
                                paddingTop: 30,
                                borderTop: '1px solid #c3c3c3'
                            }}>
                                <b style={{ display: 'block', fontSize: 20, fontWeight: 500 }}>{testimonial.name}</b>
                                <b style={{ color: 'var(--light-grey)', fontFamily: 'Kanit', fontSize: 16, fontWeight: 500 }}>{testimonial.title}</b>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="testimonialNavigation">
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
            </div>
        </>
    );
};

const testimonials = [
    {
        name: "Alexandru Popescu",
        title: "Director, XYZ Solutions",
        content: [
            "Colaborarea cu RUMO a fost o experiență excepțională! Profesionalismul, creativitatea și strategia lor bine pusă la punct ne-au ajutat să ne creștem vizibilitatea și să atragem mai mulți clienți. Recomand cu încredere!"
        ]
    },
    {
        name: "Ioana Marinescu",
        title: "CEO, Digital Vision",
        content: [
            "Echipa RUMO ne-a oferit soluții inovatoare și personalizate care au dus la o creștere semnificativă a conversiilor noastre online. Colaborarea a fost fluidă și eficientă, iar rezultatele au fost peste așteptări!"
        ]
    },
    {
        name: "Mihai Dumitrescu",
        title: "Fondator, StartUp Hub",
        content: [
            "Serviciile oferite de RUMO ne-au ajutat să ne conturăm brandul și să ne poziționăm mai bine pe piață. Expertiza lor în marketing digital a făcut o diferență majoră în evoluția afacerii noastre."
        ]
    },
    {
        name: "Andreea Ionescu",
        title: "Manager Marketing, Elegant Home",
        content: [
            "Am fost impresionați de profesionalismul și dedicarea echipei RUMO. Campaniile lor au avut un impact real asupra vânzărilor noastre, iar suportul oferit pe parcursul colaborării a fost excepțional."
        ]
    }
];


export default ClientTestimonialSlider;
