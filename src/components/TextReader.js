import React, { Component } from "react";
import TextSpeech, { GetVoices } from "../Languages";
import "../css/TextReader.css";

class TextReader extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            msg: "",
            voice: "",
            talk: null,
            pitch: 50,
            rate: 50,
        };
    }


    onClick = (e) => {
        e.preventDefault();
        let {pitch, rate, msg, voice} = this.state;
        this.state.talk.Init(msg, pitch/50, rate/50, voice);
        this.state.talk.Speak();
    };

    componentDidMount() {
        GetVoices().then((res) => this.setState({talk: new TextSpeech(res)}));
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="wrap">
                <div className="container">
                    <h1>Text to Speech</h1>
                    <textarea
                        name="msg"
                        onChange={this.onChange}
                        placeholder="Write your text here..."
                    />
                    <div>
                        <button
                            disabled={this.state.msg === ""}
                            onClick={this.onClick}
                        >
                            <span>Listen</span>
                        </button>
                        <select name="voice" onChange={this.onChange}>
                            {this.state.talk?.voices.map((e, i) => {
                                return <option key={i}>{e.name}</option>;
                            })}
                        </select>
                        <div className="range-wrap">
                            <label>pitch</label>
                            <input
                                type="range"
                                name="pitch"
                                onChange={this.onChange}
                            />
                            <label>rate</label>
                            <input
                                type="range"
                                name="rate"
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextReader;
