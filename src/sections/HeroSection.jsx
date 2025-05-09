import useInView from '../hooks/useInView';

// import pattern from '../assets/pattern.jpg';

const HeroSection = ({ children }) => {
    const [ref, isInView] = useInView(0, true);

    return (
        <section ref={ref} className="hero whitebg layout" >
            <div className="content"
                style={{ display: isInView ? 'block' : 'none' }}>
                {children}
            </div>
        </section>
    );

}

export default HeroSection;