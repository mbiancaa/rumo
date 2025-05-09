import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Logo1 from '../../assets/customers_logos/1_logo_DCS.png';
import Logo2 from '../../assets/customers_logos/2_logo_FLORIN_M_POP.bmp';
import Logo3 from '../../assets/customers_logos/3_logo_Primainvest-Florin _M_Pop.jpg';
import Logo4 from '../../assets/customers_logos/4_logo_TCF.png';
import Logo6 from '../../assets/customers_logos/6_logo_dr_Chirila_Marius-fund-transp.png';
import Logo7 from '../../assets/customers_logos/7_logo_COD_Protect_Medical.png';
import Logo8 from '../../assets/customers_logos/8_logo_Dr_Mihai-Stefan_Muresan.png';
import Logo9 from '../../assets/customers_logos/9.1_logo_Principal_CT.svg';
import Logo10 from '../../assets/customers_logos/10_logo_RAD_Principal.png';
import Logo11 from '../../assets/customers_logos/11_logo_Innosphere_Hub_Blue.png';
import Logo12 from '../../assets/customers_logos/12_logo_BCR-Industries.png';
import Logo13 from '../../assets/customers_logos/13_logo_TEGRA.png';

const CustomerSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        variableWidth: true,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        arrows: false,
        autoplaySpeed: 0,
        pauseOnHover: false,
        pauseOnFocus: false,
        cssEase: "linear"
    };


    return (
        <Slider {...settings}>
            <div>
                <img className="customer_logo" src={Logo1} alt="Logo client 1" />
            </div>
            <div>
                <img className="customer_logo" src={Logo2} alt="Logo client 2" />
            </div>
            <div>
                <img className="customer_logo" src={Logo3} alt="Logo client 3" />
            </div>
            <div>
                <img className="customer_logo" src={Logo4} alt="Logo client 4" />
            </div>
            <div>
                <img className="customer_logo" src={Logo6} alt="Logo client 6" />
            </div>
            <div>
                <img className="customer_logo" src={Logo7} alt="Logo client 7" />
            </div>
            <div>
                <img className="customer_logo" src={Logo8} alt="Logo client 8" />
            </div>
            <div>
                <img className="customer_logo" src={Logo9} alt="Logo client 9" />
            </div>
            <div>
                <img className="customer_logo" src={Logo10} alt="Logo client 10" />
            </div>
            <div>
                <img className="customer_logo" src={Logo11} alt="Logo client 11" />
            </div>
            <div>
                <img className="customer_logo" src={Logo12} alt="Logo client 12" />
            </div>
            <div>
                <img className="customer_logo" src={Logo13} alt="Logo client 13" />
            </div>
        </Slider>
    );
}

export default CustomerSlider;