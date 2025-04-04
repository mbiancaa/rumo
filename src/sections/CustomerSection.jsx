import CustomerSlider from "../components/sliders/CustomerSlider";
import useInView from "../hooks/useInView";
const CustomerSection = () => {
    const [textRef, textInView] = useInView(300);
    const [barRef, barInView] = useInView(10);
    const [textRef2, textInView2] = useInView(10);
    const [textRef3, textInView3] = useInView(400);
    const [boxRef, boxInView] = useInView(100);


    return (
        <section className="whitebg layout">
            <div className="container customers">
                <div className="d-flex" style={{ marginBottom: 50 }}>
                    <div ref={textRef} className={`flexBox slideInTextAnimation ${textInView ? "show" : ""}`}>
                        <h2>Ajutăm afacerile mici și mijlocii dar cu viziune îndrăzneață, să urce pe culmile succesului!</h2>
                    </div>
                    <div className="flexBox d-flex">
                        <div className="flexRow">
                            <span className="highlightText">+15</span>
                            <p>specialiști în toate ramurile marketingului online</p>
                        </div>
                        <div className="flexRow">
                            <span className="highlightText">+150</span>
                            <p>clienți din diverse domenii economice</p>
                        </div>
                    </div>
                </div>
                <CustomerSlider />
            </div>
            <div className="container d-flex">
                <div className="left">
                    <div ref={textRef2} className={`flexBox slideInTextAnimation ${textInView2 ? "show" : ""}`}>
                        <h2>Îți dorești mai mulți clienți pentru afacerea ta?</h2>
                    </div>
                    <div ref={textRef3} className={`flexBox slideInTextAnimation ${textInView3 ? "show" : ""}`}>
                        <p>Transformă obiectivele afacerii tale în realitate colaborând cu noi!</p>
                    </div>
                    <div className="bar">
                        <div className="barText">
                            <span>Planificare și implementare</span>
                            <span>100%</span>
                        </div>
                        <span ref={barRef} className={`barContainer ${barInView ? "show" : ""}`}></span>
                    </div>
                </div>
                <div className="right boxContainer">
                    <div ref={boxRef} className={`box slideInTextAnimation ${boxInView ? "show" : ""}`}>
                        <span className="number">01</span>
                        <h3>Peste 150 de clienți din diverse domenii</h3>
                        <p>Creăm strategii personalizate de marketing digital care asigură performanța campaniilor.</p>
                    </div>
                    <div ref={boxRef} className={`box slideInTextAnimation ${boxInView ? "show" : ""}`}>
                        <span className="number">02</span>
                        <h3>Specialiști în toate ramurile marketingului online</h3>
                        <p>Lucrăm cu o echipă de peste 15 specialiști antrenați pentru performanțe.</p>
                    </div>
                    <div ref={boxRef} className={`box slideInTextAnimation ${boxInView ? "show" : ""}`}>
                        <span className="number">03</span>
                        <h3>Peste 20 clienți din diverse ramuri medicale</h3>
                        <p>Avem expertiză relevantă în domeniul medical. </p>
                    </div>
                    <div ref={boxRef} className={`box slideInTextAnimation ${boxInView ? "show" : ""}`}>
                        <span className="number">04</span>
                        <h3>Campanii cu ROAS de peste 15.000%</h3>
                        <p>Campaniile noastre cele mai mari reușite și diversificate sunt în domeniul medical.</p>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default CustomerSection;