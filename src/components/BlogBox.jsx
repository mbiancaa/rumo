
import BlogImage from '../assets/agency-img1.png';
import { NavLink } from 'react-router-dom';
const BlogBox = () => {

    return (

        <article className="blogBox">
            <NavLink to="/articol">
                <img src={BlogImage} />
                <div className="blogContentWrapper">
                    <span className="blogCategory">SEO Marketing</span>
                    <h3 className="blogTitle"><NavLink to="/articol" >Cum să creezi campanii de succes pe Pinterest Ads pentru a-ți crește afacerea?</NavLink></h3>
                    <p className="blogMeta">Cum să creezi campanii de succes pe Pinterest Ads pentru a-ți crește afacerea? Pinterest nu este doar o platformă…</p>
                    <div className="blogFooter">
                        <span className="blogDate">7 Mar, 2025</span>
                        <span className="blogTime">5 min read</span>
                    </div>
                </div>
            </NavLink>
        </article>


    );
}

export default BlogBox;