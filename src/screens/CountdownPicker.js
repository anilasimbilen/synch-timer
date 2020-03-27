import React, {Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Redirect } from "react-router-dom";

const Styles = styled.div`

    #middle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    h1 {
        padding: 4vh;
        color: #fff;
        font-size: calc(3vw + 70px);
    }
    .changeButton {
        :hover {
            background-color: #ced4da;
        }
    }
`

export default class CountdownPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialTime: props.initialTime,
            current: Date.now(),
            unit: null,
            title: "Minutes",
            renderingUnitPicker: false,
            duration: [0,0,0],
            redir: ""
        }
    }

    componentDidMount() {
        
    }
    renderTimePicker = () => {
        return(
            <InputGroup size="sm" className="mb-3">
            <FormControl aria-label="Hours" onChange={e => {
                e.preventDefault();
                let mk = e.target.value;
                if(mk.length === 0){ 
                    mk = "0";
                }
                try {
                    let nn = parseInt(mk);
                    if(nn >= 0) {
                        let duration = this.state.duration;
                        duration[0] = nn;
                        this.setState({
                            duration
                        })
                    }
                } catch(err) {
                    
                }
            }} value={this.state.duration[0]} />
            <InputGroup.Append>
            <InputGroup.Text>
                Hours
              </InputGroup.Text>
            </InputGroup.Append>
            <FormControl aria-label="Minutes" onChange={e => {
                e.preventDefault();
                let mk = e.target.value;
                if(mk.length === 0){ 
                    mk = "0";
                }
                try {
                    let nn = parseInt(mk);
                    if(nn >= 0) {
                        let duration = this.state.duration;
                        duration[1] = nn;
                        this.setState({
                            duration
                        })
                    }
                } catch(err) {
                    
                }
            }} value={this.state.duration[1]} />
            <InputGroup.Append>
            <InputGroup.Text>
                Minutes
              </InputGroup.Text>
            </InputGroup.Append>
            <FormControl aria-label="Seconds" onChange={e => {
                e.preventDefault();
                let mk = e.target.value;
                if(mk.length === 0){ 
                    mk = "0";
                }
                try {
                    let nn = parseInt(mk);
                    if(nn >= 0) {
                        let duration = this.state.duration;
                        duration[2] = nn;
                        this.setState({
                            duration
                        })
                    }
                } catch(err) {
                    
                }
            }} value={this.state.duration[2]} />
            <InputGroup.Append>
            <InputGroup.Text>
            Seconds
              </InputGroup.Text>
            </InputGroup.Append>
            
          </InputGroup>
        
        );
    }
    handleDone = () => {
        let {duration} = this.state;
        this.setState({
            redir: `/timer/${duration[0]}/${duration[1]}/${duration[2]}/waiting`
        })
    }
    render() {
        if(this.state.redir !== "") {
            return <Redirect to={this.state.redir} />;
        }
        return(
            <Styles style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(52, 196, 47)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Row style={{margin: 0, justifyContent: "center"}}>
                    <Col id="middle" md={12} xs={10}>
                        <h1>
                            Synch-Time Picker
                        </h1>
                        <Row>
                            {this.renderTimePicker()}
                        </Row>
                        <Row>
                                <Button variant="light" size="lg" onClick={this.handleDone}>
                                    Done
                                </Button>
                        </Row>
                    </Col>
                </Row>
            </Styles>

        );
    }
}