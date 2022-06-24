import React from "react";
import axios from "axios";
import jQuery from "jquery";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {animationOnScroll} from "./animationOnScroll";
import SuggestionBar from "./suggestionBar";
import {Loading} from "./loading";
import Footer from "./footer";
export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tempname: '',
            email: '',
            message: '',
            product: '',
            issubmitted: false,
            selectedProduct: ''
        }
    }




    componentDidUpdate(prevProps, prevState, snapshot) {
        document.title = 'Kontakt';
        animationOnScroll();

    }

    handleSubmit(e){
        e.preventDefault();
        axios({
            method: "POST",
            url:"https://zchakarov.de/send.php",
            data:  this.state
        }).then((response)=>{
            if (response.data.status === 'success') {
                console.log(this.state)
                this.setState({issubmitted: true});
                this.setState({tempname: this.state.name});
                this.setState({name: "", email: "", message: "", product: ""})
                jQuery('input, textarea').each(function (i) {
                    jQuery(this).removeClass('leer');
                    jQuery(this).parent().prev('label').find('.required-error').remove();

                });
                jQuery('.contact-message').addClass('show-message');

            } else if (response.data.status === 'fail') {
                this.setState({issubmitted: false});
                jQuery('input, textarea').each(function (i) {
                    if(!jQuery(this).val() && !jQuery(this).hasClass('leer')) {
                        jQuery(this).addClass('leer');
                        jQuery(this).parent().prev('label').append('<span class="required-error"> ist erforderlich</span>')}
                    if(jQuery(this).val() && jQuery(this).hasClass('leer')) {
                        jQuery(this).removeClass('leer');
                        jQuery(this).parent().prev('label').find('.required-error').remove();
                    }
                })
            }
        })

    }

    render() {

        return(
            <div>
                <div className="footerBottom">
                    <Container className='contact'>
                        {this.state.issubmitted == false ? <form  id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">

                            <Row className='justify-content-center align-items-center contact-input'>
                                <Col className='contact-col form' lg={4} xs={12}>
                                    <div className="form--group m-2">
                                        <label htmlFor="name">Name</label>
                                        <span className='form--group--span'>
                                            <input type="text" required className="form--control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                                        </span>
                                    </div>
                                    <div className="form--group m-2">
                                        <label htmlFor="email">E-Mail-Adresse</label>
                                        <span className='form--group--span'>
                                            <input type="email" required className="form--control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                                        </span>
                                    </div>
                                    <div className="form--group m-2">
                                        <label htmlFor="product">Produkt</label>
                                        <span className='form--group--span'>
                                            {this.props.children && <SuggestionBar placeholder="test" data={this.props.children} onProductChange={this.onProductChange.bind()}/>}
                                        </span>
                                    </div>
                                    <div className="form--group m-2">
                                        <label htmlFor="message">Nachricht</label>
                                        <span className='form--group--span'>
                                                    <textarea className="form--control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                                                </span>
                                    </div>
                                    <div className="form--group mx-2">
                                        <button type="submit" className="button m-0">Abschicken</button>

                                    </div>

                                </Col>
                            </Row>
                        </form> :
                            <div>
                                <div>
                                    <div className='content-container error'>
                                        <Container fluid="xl" className="animation animation--top answer--container">
                                            <Row>
                                                <Col lg={12}>
                                                    <div className={this.state.issubmitted?'contact-message show-message':'contact-message'}>
                                                        <h3 className="  ">{this.state.tempname}, danke für Ihre Nachricht</h3>
                                                        <Link to="/"><h3 className="link m-0 align-self-center">Startseite</h3></Link>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>

                                    </div>


                                </div>

                            </div>

                        }
                    </Container>
                    <Footer/>

                </div>

            </div>
        );
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }
    onProductChange = (childData) => {
        this.setState({product: childData})
    }
}
