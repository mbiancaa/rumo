import CaseStudiesSlider from "../components/sliders/CaseStudiesSlider";

const CaseStudiesSection = () => {

    return (
        <section className="whitebg layout">
            <div className="container caseStudies">
                <span className="smTitle">Studii de caz</span>
                <div className="d-flex" style={{ gap: 60, marginTop: 30, marginBottom: 50 }}>
                    <div style={{
                        flex: 1,
                        width: 'calc(60% - 20px)',
                        maxWidth: 575
                    }}>
                        <h2 style={{ fontSize: 45 }}>Cu RUMO,<br /> afacerile își iau avântul</h2>
                    </div>
                    <div style={{
                        width: 'calc(40% - 20px)',
                        color: 'var(--light-grey)',
                        fontSize: 18,
                        fontFamily: 'Kanit',
                        lineHeight: '28px',
                        maxWidth: 390
                    }}>
                        <p style={{ marginBottom: 20 }}>De la vizibilitate la conversii! Studii de caz care demonstrează impactul strategiilor noastre digitale asupra afacerilor mici și mijlocii!</p>
                        <a href="" className="linkCTA"><span>Vezi aici studiile de caz</span></a>
                    </div>
                </div>
                <CaseStudiesSlider />
            </div>
        </section>
    );

}

export default CaseStudiesSection;