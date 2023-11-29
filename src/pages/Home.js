import HomeCss from './Home.module.css';
import moduleCSS from './Product.module.css';
import Banner from '../components/Banner';
import NicotineLevel from '../components/NicotineLevel'
import Container from 'react-bootstrap/Container';
import FeaturedProduct from '../components/FeaturedProducts'
import { Link } from 'react-router-dom';
import {useEffect} from 'react';


export default function Home(){

	const landingFontButton = "Smoke with us"

	useEffect(() => {
		document.title = "TheSideSpot | Home";
	})


	return(
		<>
		<div className={HomeCss.landingSection}>
			<Container>
			<div className="text-center pt-4">
				<p className={HomeCss.landingFont}>
					Streets echo stories, footsteps, dreams, life.
				Vaping clouds: choice, controversy, health haze.
				</p>
				<Link to="/login" type="submit" id="submitBtn" className={`${moduleCSS.btnLogin} ${moduleCSS.glitchWrapper} pt-2`}>
				  <span className={moduleCSS.glitch} data-glitch={landingFontButton}>
				    {landingFontButton}
				  </span>
				</Link>
			</div>
			</Container>
		</div>
			<Banner />
			<NicotineLevel />
			<FeaturedProduct />
		</>
		
	)
}