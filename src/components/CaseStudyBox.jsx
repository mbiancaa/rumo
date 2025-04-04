
import CaseStudyImage from '../assets/agency-img1.png';
const CaseStudyBox = () => {

    return (
        <article className="caseStudy-box">
            <img src={CaseStudyImage} />
            <div className="caseStudyContentWrapper">
                <h3 className="caseStudyTitle">De la cabinet stomatologic mic la clinică de top - stomatologie</h3>
                <p className="caseStudyMeta">Cele mai bune formate de Instagram Ads pentru creșterea vânzărilor în 2025 Într-o lume în continuă transformare digitală, Instagram rămâne…</p>
                <div className="caseStudyFooter">
                    <span className="caseStudyDate">7 Mar, 2025</span>
                    <span className="caseStudyTime">5 min read</span>
                </div>
            </div>
        </article>
    );
}

export default CaseStudyBox;