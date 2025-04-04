const HeroSection = ({ children }) => {

    return (
        <section className="hero whitebg layout">
            <div className="content">
                {children}
            </div>
        </section>
    );

}

export default HeroSection;