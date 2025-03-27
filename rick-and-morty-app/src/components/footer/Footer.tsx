import './Footer.css';
import img from '../../assets/img_f.png';
import logo from '../../assets/Rick_and_Morty_Logo.webp';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../../translations/LanguageContext';
import languages from '../../translations/languages';

const Footer = () => {
    const { state } = useLanguage();
    const lang = languages[state.language];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className='footer-center'>
                    <div className="footer-small-logo">
                        <img src={logo} alt="Rick and Morty small logo" />
                    </div>
                    <div className="footer-social">
                        <h3>{lang.footer}</h3>
                        <div className="social-icons">
                            <a href="https://www.linkedin.com/in/arta-p%C3%ABrdibuka-0ba72a266/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/artaperdibuka/Intern-Task"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub">
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-image">
                    <img src={img} alt="Rick and Morty" />
                </div>
            </div>

            <div className="footer-copyright">
                <p>© 2025 {lang.allRightsReserved || "All rights reserved to"} Arta Përdibuka.</p>
            </div>
        </footer>
    );
};

export default Footer;