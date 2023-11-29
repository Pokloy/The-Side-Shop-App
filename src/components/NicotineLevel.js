import { Container, Row, Col } from 'react-bootstrap';
import ProductCardCss from './ProductCard.module.css';
import { Link } from 'react-router-dom';



export default function NicotineLevel(){
	return(
	<div className={`${ProductCardCss.nicotineLevelSection} mb-5 `}>		
		<Container>
			<div className="pt-4"><h1 className={`${ProductCardCss.xoverflow} text-left`}>NICOTINE LEVEL</h1> </div>
			<Row className='pb-sm-5'>
				<Col>
					<div className="d-lg-flex d-sm-block ">
						<div className={`${ProductCardCss.lowButton1} ${ProductCardCss.lowButton} pt-5 mt-5`}><Link to="/products" className={ProductCardCss.linkCustom}>LOW</Link></div>
						<div className={`${ProductCardCss.mediumButton1} ${ProductCardCss.mediumButton} pt-5 mt-5`}><Link to="/products" className={ProductCardCss.linkCustom}>MEDIUM</Link></div>
						<div className={`${ProductCardCss.highButton1} ${ProductCardCss.highButton} pt-5 mt-5`}><Link to="/products" className={ProductCardCss.linkCustom}>HIGH</Link></div>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
	)
}

