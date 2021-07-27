import React, { Component } from 'react';
import TextSpeech from '../Languages';
import '../css/TextReader.css';

class TextReader extends Component {
    constructor(props){
        super(props);
        this.talk = new TextSpeech();
    }

    state = {
        msg: "",
        lang: [],
        voice: "",
        pitch: 50,
        rate: 50
    }

    onClick = (e) => {
        e.preventDefault();
        this.talk = new TextSpeech();
        this.talk.msg = this.state.msg;
        this.talk.setLaguage(this.state.voice);
        this.talk.pitch = this.state.pitch/50;
        this.talk.rate = this.state.rate/50;
        this.talk.speak();
        if(this.state.lang.length === 0)
            this.setState({lang: this.talk.voices});
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="wrap">
                <div className="container">
                <h1>Text to Speech</h1>
                <textarea name="msg" onChange={this.onChange} placeholder="Write your text here..."/>
                <div>
                    <button disabled={this.state.msg === ""} onClick={this.onClick}>Escuchar</button>
                    <select name="voice" onChange={this.onChange}>
                        {
                            this.state.lang.map((e, i) => {
                                return <option key={i}>{e.name}</option>
                            })     
                        }
                    </select>
                    <div className="range-wrap">
                        <label>pitch</label>
                        <input type="range" name="pitch" onChange={this.onChange}/>
                        <label>rate</label>
                        <input type="range" name="rate" onChange={this.onChange}/>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default TextReader;