import CustomerSlider from "../components/sliders/CustomerSlider";
import useInView from "../hooks/useInView";
const CustomerSection = () => {
    const [barRef, barInView] = useInView(10);
    return (
        <section className="whitebg layout">
            <div className="container customers">
                <div className="d-flex" style={{ marginBottom: 50 }}>
                    <div className="flexBox">
                        <h2>Ajutăm afacerile mici dar cu viziune îndrăzneață, sa urce pe culmile succesului!</h2>
                    </div>
                    <div className="flexBox d-flex">
                        <div className="flexRow">
                            <span className="highlightText">+15</span>
                            <p>specialiști în toate ramurile marketingului online</p>
                        </div>
                        <div className="flexRow">
                            <span className="highlightText">+50</span>
                            <p>clienți din diverse domenii economice</p>
                        </div>
                    </div>
                </div>
                <CustomerSlider />
            </div>
            <div className="container d-flex">
                <div className="left">
                    <h2>Îți dorești mai mulți clienți pentru afacerea ta?</h2>
                    <p>Contactează-ne și vei vedea cum transformăm obiectivele afacerii tale în realitate.</p>
                    <div className="bar">
                        <div className="barText">
                            <span>Planificare și implementare</span>
                            <span>100%</span>
                        </div>
                        <span ref={barRef} className={`barContainer ${barInView ? "show" : ""}`}></span>
                    </div>
                </div>
                <div className="right boxContainer">
                    <div className="box">
                        <span className="number">01</span>
                        <h3>Peste 50 de clienți din diverse domenii</h3>
                        <p>Creăm strategii personalizate de marketing digital care asigură performanța campaniilor.</p>
                    </div>
                    <div className="box">
                        <span className="number">02</span>
                        <h3>Specialiști în toate ramurile marketingului online</h3>
                        <p>Lucrăm cu o echipă de peste 15 specialiști antrenați pentru performanțe.</p>
                    </div>
                    <div className="box">
                        <span className="number">03</span>
                        <h3>Peste 20 clienți din diverse ramuri medical</h3>
                        <p>Avem expertiză relevantă în domeniul medical. </p>
                    </div>
                    <div className="box">
                        <span className="number">04</span>
                        <h3>Campanii cu ROAS de peste 15.000%</h3>
                        <p>Cele mai mari reușite ale noastre sunt în domeniul medical.</p>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default CustomerSection;