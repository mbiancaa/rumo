
import BlogImage from '../assets/team_members/team2.png';
const BlogBox = () => {

    return (
        <article className="blogBox">
            <img src={BlogImage} />
            <div className="blogContentWrapper">
                <span className="blogCategory">SEO Marketing</span>
                <h3 className="blogTitle"><a href="">How to boost your search rankings with keyword optimization</a></h3>
                <div className="blogFooter">
                    <span className="blogDate">7 Mar, 2025</span>
                    <span className="blogTime">5 min read</span>
                </div>
            </div>
        </article>
    );
}

export default BlogBox;