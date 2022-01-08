import React from 'react';
import Navigation from "../../components/Navigation/Navigation";
import {LoadUser, ReloadUser} from "../../api/SignUp";
import './Settings.css';
import Footer from "../../components/Footer";
import Button from "../../elements/Button/Button";
import axios from "axios";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableEdit: false,
            value: this.props.value,
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.inputRef = React.createRef();

        this.cursor = null;
    }

    handleEdit() {
        this.setState({enableEdit: !this.state.enableEdit})
    }
    _setCursorPositions = () => {
        //reset the cursor position for input
        this.inputRef.current.selectionStart = this.cursor;
        this.inputRef.current.selectionEnd = this.cursor;
    };

    handleChange(e) {
        this.cursor = e.target.selectionEnd;
        this.setState({value: e.target.value});

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.enableEdit && this._setCursorPositions();
    }

    handleSubmit(e) {
        this.handleEdit();

        return axios.post( "https://journal-flask-server.herokuapp.com/api/settings", {key: [this.props.id, this.state.value]}, {withCredentials: true}
        ).then(r => {
            console.log("sett's", r.data);
            if (r.data) {
                ReloadUser();
                window.location.reload();
            }
        } )
    }

    render(props) {
        const Photo = () => {
            return (
                <>
                    <div className="form-element">
                        <div className="form-element-header">
                            <h3 className="element-title">
                                {this.props.name}
                            </h3>

                        </div>
                        <div className="form-element-content">
                            <div className="left-col">
                                { this.props.description.map(p => <p>{p}</p>) }
                            </div>
                            {
                                this.props.image && <>
                                    <div className="right-col">
                                        <img src={this.props.image} alt={"image:" + this.props.name}/>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            )
        }
        const Setting = () => {
            return (
                <>
                    <div className="form-element">
                        <div className="form-element-header">
                            <h3 className="element-title">
                                {this.props.name}
                            </h3>
                            {this.state.enableEdit ? <div className={"inline-flex"}><Button buttonStyle={"btn-o btn-o-rnd"} onClick={this.handleSubmit}>Save</Button>
                                    <Button buttonStyle={"btn-o btn-o-rnd editB"} onClick={this.handleEdit}>Cancel</Button>
                                </div>
                                :
                                <Button for={this.props.id} buttonStyle={"btn-o btn-o-rnd"} onClick={this.handleEdit}>Edit</Button>
                            }
                        </div>
                        <div className="form-element-content">
                            <div className="left-col">
                                <div className="inline-flex">
                                    { this.props.label && <label>{this.props.label}</label> }
                                    <input ref={this.inputRef} id={this.props.id} name={this.props.name} type="text" placeholder={"Add your " + this.props.name}
                                           value={this.state.value}
                                           onChange={this.handleChange}
                                           disabled={!this.state.enableEdit}
                                           autoFocus={this.state.enableEdit}
                                    />
                                </div>
                                { this.props.description.map(p => <p>{p}</p>) }
                            </div>
                            {
                                this.props.image && <>
                                    <div className="right-col">
                                        <img src={this.props.image} alt={"image:" + this.props.name}/>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            )
        }
        return (
            this.props.image ? <Photo/> : <Setting/>
        )
    }

}

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: LoadUser(),
            settings:  LoadUser()
        }

        //this.handleChange = this.handleChange.bind(this);
    }
/*
    handleChange(e) {
        console.log(this.state.settings);
        this.setState(state => {state.settings[e.target.id] = e.target.value});
    }
*/
    render() {

        return (
            <>
                <Navigation parentState={this.state} />
                <div className="container">
                    <div className="settingAccord">
                        <h2>Settings</h2>
                    </div>
                    <div className="setting-container">
                        <h2>About</h2>
                        <Setting name={"Name"}
                                 id={"name"}
                                 value={this.state.settings.name}
                                 description={["Your name appears on your Profile page, as your byline, and in your responses. It is a required field."]}/>
                        <Setting name={"Bio"}
                                 id={"bio"}
                                 value={""}
                                 description={["Your bio appears on your Profile and next to your stories. Max 160 characters."]}/>
                        <Setting name={"Photo"}
                                 id={"image_url"}
                                 image={this.state.settings.image_url}
                                 description={["Your photo appears on your Profile page and with your stories across Medium.", "Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF."]}/>
                        <Setting name={"Username & URL"}
                                 id={"username"}
                                 value={this.state.settings.username} label={"Username: "}
                                 description={[`URL: https://medium.com/${this.state.settings.username}`]}/>
                        <Setting name={"Email"}
                                 id={"email"}
                                 value={this.state.settings.email}
                                 label={"Your Email: "}
                                 description={["Your email address to contact you, announcements and stuff!"]}/>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Settings;