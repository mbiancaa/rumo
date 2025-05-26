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
        name: "Mihai Sîrbu",
        title: "CEO & Founder, DentalCare Sîrbu",
        content: [
            "Am avut o colaborare cu adevărat revelatoare cu agenția RUMO. Eu, ca medic dar și ca antreprenor, apreciez, în mod deosebit, dedicarea managerului Monica Rusu, care ne-a implementat de-a lungul a 4 ani un plan strategic de creștere foarte eficient. Această colaborare ne-a deschis noi căi și ne-a lărgit orizontul ajutându-ne să ne transformăm dintr-un cabinet stomatologic micuț  într-o clinică cu renume în Cluj-Napoca. Sunt foarte mulțumit de implicarea dedicată a echipei, de accesul la servicii complete și de rezultatele excelente obținute."
        ]
    },
    {
        name: "Florin M. Pop",
        title: "Antreprenor și consultant de afaceri",
        content: [
            "Colaborarea cu RUMO Digital Path a fost o experiență extraordinară. Pentru mine, RUMO înseamnă în mod special Monica Rusu – managerul agenției, un om empatic, vertical și, totodată, o adevărată profesionistă. Am fost foarte mulțumit de aportul ei și de felul în care am construit împreună o relație bazată pe încredere – atât profesională, cât și umană, ceea ce, pentru mine, ca antreprenor, este esențial. Echipa RUMO m-a ajutat să înțeleg mai bine importanța leadership-ului în mediul online. Mi-am extins plaja de urmăritori, am creat o comunitate loială și mi-am conturat un brand autentic. Această experiență m-a ajutat să îmi definesc mai clar stilul de comunicare, să fiu mai coerent și prezent în online și să-mi îmbunătățesc strategia de brand personal."
        ]
    },
    {
        name: "Stor Raul Bogdan",
        title: "CEO & Founder, Men's Club",
        content: [
            "Experiența cu RUMO Digital Path a fost excelentă. Sub îndrumarea Monicăi Rusu, echipa RUMO a reușit să ne extindă și să diversifice profilul urmăritorilor, ceea ce a avut un impact major asupra vizibilității Men’s Club. Ei ne-au pus brandul într-o lumină și mai favorabilă știind cum să evidențieze punctele noastre forte. Profesionalismul și dedicarea lor au fost foarte mulțumitoare în tot procesul."
        ]
    },
    {
        name: "Dr. Radu Drasovean",
        title: "Medic primar chirurgie generală specializat în chirurgia minim-invazivă (laparoscopică și robotică)",
        content: [
            "Ca medic, am nevoie de un brand ce reflectă profesionalism și încredere. Echipa RUMO Digital Path mi-a oferit asta și, ca urmare am creat în timp o comunitate de urmaritori loială și în continuă creștere. Apreciez disponibilitatea echipei de a filma în blocul operator, un detaliu crucial pentru imaginea unui medic. Strategia de marketing complexă mi-a sporit vizibilitatea și autoritatea în online, iar pentru mine dedicarea managerului Monica Rusu este absolut fundamentală în colaborarea noastră. Văd constant evoluția brandului meu în cifre concrete. Această colaborare a transformat major strategia mea profesională. Mulțumesc echipei RUMO!"
        ]
    },
    {
        name: "Dr. Chirila Marius",
        title: "Medic specialist chirurgie plastică, estetică și microchirurgie reconstructivă",
        content: [
            "Sunt foarte multumit de cum decurge colaborarea cu echipa RUMO, deja de peste 3 ani. Ma bucur ca m-au ajutat sa imi extind si sa-mi diversifica audienta. Cresterea organica, pe care o obtin cu ajutorul lor, este esentiala pentru activitatea mea profesionala. M-au ajutat sa imi construiesc un brand solid, atragand mai mulți urmaritori si clienți. Apreciez de asemenea disponibilitatea echipei de a se deplasa la locul unde imi desfasor activitatea pentru a filma si a poza procedurile in timp real."
        ]
    },
    {
        name: "Diana Adam",
        title: "CEO & Founder COD Protect Medical, Serviciu de ambulanță privată",
        content: [
            "Profesionalismul RUMO s-a remarcat prin interesul autentic în creșterea brandului nostru. Echipa este dinamică și  mereu promptă; au intervenit chiar și pe teren, venind să ne filmeze ambulanțele. Mi-au gestionat eficient profilurile de social media și le mulțumesc, în general, pentru toată implicarea."
        ]
    },
    {
        name: "Dr. Mihai-Ștefan Muresan",
        title: "Medic primar chirurgie generală și oncologică",
        content: [
            "Echipa RUMO m-a ajutat să-mi creez un brand autentic și o comunitate loială de urmăritori, pe care o extindem în permanență. De peste 2 ani colaborăm și am o evoluție solidă și constantă. Recent au completat strategia de marketing și acum implementăm noi tactici pentru o creștere mai accelerată a vizibilității în online, în care am mare încredere. Fiecare etapă a procesului a fost abordată cu profesionalism. Mulțumesc pentru suportul constant și empatia pusă în acest proiect."
        ]
    },
    {
        name: "Dr. Calin Todoran",
        title: "Medic primar ginecologie",
        content: [
            "Colaborarea cu RUMO a fost esențială în dezvoltarea unui brand personal autentic și în construirea unei comunități solide de urmăritori. Expertiza în branding și social media management a fost bine implementată și adaptată cerințelor mele și ale publicului meu. Această colaborare a stimulat semnificativ creșterea imaginii mele."
        ]
    },
    {
        name: "Alex Păcurar",
        title: "CEO & Founder Innosphere Hub",
        content: [
            "Noi, cei de la Innosphere Hub am fost impresionați de modul profesionist în care RUMO își face treaba. Echipa lor de experți în creare de conținut și branding a contribuind semnificativ la înțelegerea importanței de a fi prezent pe toate canalele de social media. Implicarea lor dedicată ne-a făcut să simțim că lucrăm sub aceeași umbrelă. Impactul serviciilor lor se reflectă clar în creșterea unei afaceri. Experiența a fost cu adevărat valoroasă. 👍"
        ]
    },
    {
        name: "Petruț Simianu",
        title: "CEO & Founder TEGRA (servicii complete de arhitectură, design interior și management de proiect)",
        content: [
            "RUMO a creat pentru TEGRA un website profesionist care ne evidențiază proiectele și oferă informații valoroase. Ce îi definește? Profesionalismul și structura clară a procesului de lucru, promptitudinea și flexibilitatea echipei dar și faptul că oferă răspunsuri precise la orice întrebare. Mi-a creat bucurie colaborarea cu voi. Mulțumesc RUMO!"
        ]
    }
];


export default ClientTestimonialSlider;
