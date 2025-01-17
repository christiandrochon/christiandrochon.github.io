import React, {Component} from 'react';
import SkillForm from "./SkillForm";

class Skill extends Component {


    /**
     * Sert à passer des param entre composant
     * 'contact' et 'skills sont des objets
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                name: 'Kiki', email: 'kiki@kiki.fr', picture: './images/sleepy-cat.jpg'
            },
            skills: [
                {id: 1, title: 'java'},
                {id: 2, title: 'react'},
                {id: 3, title: 'angular'},
                {id: 4, title: 'flutter'}
            ],
            skillValue: ''
        };
    }


    /**
     * Construction d'un objet 'skill' et à la liste des skills existantes
     * Prise en charge d'une liste de competences vide
     *
     * !!! La notation 'skills:[...this.state.skills]' correspond à la copie d'un tableau de les elements/objets existant. A ce tableau, j'insere à la fin un nouvel ig grace à
     * 'id', et dont la valeur est egale à 'title'
     */
    onAddNewSkill = (event) => {
        this.setState((prevState) => {
            let newSkill = {
                id: prevState.skills.length > 0 ? prevState.skills[prevState.skills.length - 1].id + 1 : 0,
                title: event
            };
            return {skills: [...prevState.skills, newSkill]};
        });
    };
    // onAddNewSkill = (event) => {
    // 	if (this.state.skills.length === 0) {
    // 		this.state.skills = [];
    // 		let skill = {
    // 			id: 0,
    // 			title: event
    // 		};
    // 		this.setState({
    // 			skills: [...this.state.skills, skill]
    // 		})
    // 	}
    // 	else {
    // 		let skill = {
    // 			id: [...this.state.skills].pop().id + 1,
    // 			title: event
    // 		};
    // 		this.setState({
    // 			skills: [...this.state.skills, skill]
    // 		})
    // 	}
    // };

    /**
     * Supression dune competence de la liste
     *
     * En param, on doit mettre la competence à supprimer et non pas l'index. C'est la competence ('skill') envoyé depuis le DOM qui sera utilisé par indexOf()
     * La methode 'slice()' supprime la skill voulue
     **/
    onDeleteSkill(skill) {
        let index = this.state.skills.indexOf(skill);
        let skills = [...this.state.skills];
        skills.splice(index, 1);
        this.setState({
            skills: skills
        })
    }

    /*componentDidCatch(error, errorInfo) { console.log("")
    }
    componentDidMount() {console.log("About did mount")
    }
    componentDidUpdate(prevProps, prevState, snapshot) { console.log("About did update")
    }
    componentWillUnmount() { console.log("About will unmount")
    }*/


    render() {
        return (
            <div className="card ">
                <div className="card-header">
                    <label><b>{this.props.inputMessage} </b></label>
                </div>
                <div className="row p-2">
                    <div className="col col-auto">
                        <img width={120} src="./images/sleepy-cat.jpg" className="profile img-thumbnail" alt="Profil"/>
                    </div>
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item"><b>Nom : </b>{this.state.contact.name}</li>
                            <li className="list-group-item"><b>Email : </b>{this.state.contact.email}</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-header">Skills</div>
                        <div className="card-body">
                            <div>
                                <SkillForm onAddNewSkill={this.onAddNewSkill}/>
                            </div>
                            {/*		<form onSubmit={this.addSkill}>
							 <div>
							 <input type="text" name="skill"/>
							 <button className="btn btn-primary">Add</button>
							 </div>
							 </form>*/}

                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.skills.map((skill, index) =>
                                    <tr key={skill.id}>
                                        <td>{skill.id}</td>
                                        <td>{skill.title}</td>
                                        <td>
                                            <button key={skill.id} className="btn btn-danger text-white" onClick={() => this.onDeleteSkill(skill)}>X</button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Skill;
