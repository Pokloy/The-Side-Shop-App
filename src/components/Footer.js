
import footerCss from './Footer.module.css';



export default function Footer(){


	return(
	<div className={footerCss.bg1}>
{/*		<div className="d-flex justify-content-center align-items-center py-4">
			<div className="mx-5"><p className={footerCss.font}>HOME</p></div>
			<div className="mx-5"><p className={footerCss.font}>PRODUCTS</p></div>
			<div className="mx-5"><p className={footerCss.font}>LOGIN</p></div>
			<div className="mx-5"><p className={footerCss.font}>REGISTER</p></div>
		</div>

		<hr></hr>*/}

		<div className="d-flex justify-content-center align-items-center py-2 pt-5">
			<div className="mx-5"><p className={footerCss.font}>SOCIAL MEDIA</p></div>
		</div>
		<div className="d-flex justify-content-center align-items-center py-2">
			<div className={footerCss.modifyIcons}><p class="mb-0 d-inline mx-5">
            	<span class="fa fa-facebook-official mr-2"></span> </p>
         	</div>
			<div className={footerCss.modifyIcons}><p class="mb-0 d-inline mx-5">
            	<span class="fa fa-twitter-square mr-2"></span> </p>
         	</div>
			<div className={footerCss.modifyIcons}><p class="mb-0 d-inline mx-5">
            	<span class="fa fa-instagram mr-2"></span>  </p>
         	</div>
		</div>

		<hr></hr>


		<div className="d-flex justify-content-center align-items-center py-2">
			 <div className="mx-5"><p className={footerCss.font2}>© 2023 ALIER E TORRENUEVA, All Rights Reserved</p></div>
		</div>
	</div>
	)
}