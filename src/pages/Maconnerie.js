import React, {Component} from 'react';
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import {Typography} from "@mui/material";
import HeaderContext from "./../components/HeaderContext";

class Maconnerie extends Component {

    static contextType = HeaderContext;

    componentDidMount() {
        const {updateHeaderDetails} = this.context;
        updateHeaderDetails('Maçonnerie', 'Travaux de construction et de démolition');
    }

    render() {
        const {titre, sousTitre} = this.context;
        return (
            <section className="page-section bg-light">
                <div className="container ">
                    <div className="text-center">
                        <div className="masthead-heading text-uppercase">{titre}</div>
                        <div className="masthead-subheading">{sousTitre}</div>
                        {/*<h2 className="section-heading text-uppercase ">Maçonnerie</h2>*/}
                        {/*<h3 className="section-subheading text-muted">Travaux de construction et de démolition.</h3>*/}

                        <div className="container-marges-texte">
                            <Typography variant="h5" className="pb-5">L'entreprise effectue des travaux de maçonnerie générale, de gros œuvre et de
                                second
                                œuvre.
                            </Typography>
                            <p className="fs-5">L'entreprise intervient dans les domaines de la <strong>construction</strong> et de
                                la <strong>démolition</strong>.<br/> Concernant la
                                construction, elle se spécialise dans <strong>l'agrandissement</strong> et <strong>l'extension</strong> des
                                habitations et des
                                bâtiments. Les travaux de démolition
                                incluent le <strong>dallage</strong>, les <strong>fondations</strong> et <strong>l'élévation des murs</strong>.</p>
                            <p className="fs-5">Elle intervient dans la construction de maisons individuelles, de bâtiments industriels, de
                                bâtiments
                                commerciaux, de bâtiments publics, de bâtiments agricoles et autres.</p>
                            <p className="fs-5">Les travaux de maçonnerie sont réalisés par des maçons professionnels possédant une connaissance
                                approfondie des
                                matériaux et des techniques de construction.</p>
                        </div>
                        <svg className="w-100 my-5"><DashboardRoundedIcon/></svg>
                        <img src="/template/assets/img/60728329_l.jpg" alt="chantier" className="img-fluid logo-img-fluid"/>
                    </div>
                </div>
            </section>
        );
    }
}

export default Maconnerie;
