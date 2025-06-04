import darkBgImg from '../assets/about/pexels-lukas-medvedevas-6228921-6138644.jpg';

const MottoBgImageAnimation = () => {
    return (
        <section
            className="darkbg layout darkbg-sm-img imgEffect"
            style={{ backgroundImage: `url(${darkBgImg})`, backgroundSize: 'cover' }}
            aria-label="Imagine de fundal pentru motto-ul companiei">
            <h2>Lucrăm cu <br />branduri mici și mijlocii <br />care aspiră să fie mari!</h2>
        </section>
    );
}

export default MottoBgImageAnimation;