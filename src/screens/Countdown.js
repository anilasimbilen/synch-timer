import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const Styles = styled.div 
`
    h1 {
        padding: 4vh;
        color: #fff;
        font-size: calc(3vw + 70px);
    }
    #middle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

export default class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hrs: Number(this.props.hours),
            mins: Number(this.props.minutes),
            secs: Number(this.props.seconds),
            isStarted: this.props.starting !== "waiting",
            startingTime:  this.props.starting === "waiting" ? null : Number(this.props.starting),
            background: [52,196,47],
            inits: {hrs: Number(this.props.hours),
                mins: Number(this.props.minutes),
                secs: Number(this.props.seconds)}
        }
    }
    componentDidMount() {
        console.log(this.state);
        console.log(this.state.background.join(","));
        if(this.state.isStarted) {
            var c = this.durationToMillis(this.state.inits);
            var dif = this.state.startingTime - Date.now();
            console.log(dif);
            this.setState(this.millisToDuration(c + dif));
            this.handleStart(true);
        }
    }
    handleStart = (bypass) => {
        clearInterval(this.timer);
        if(!bypass && this.state.isStarted) {
            return;
        }
        if(!this.state.isStarted) {
            this.setState({
                isStarted: true,
                startingTime: Date.now()
            });
        }
        
        this.timer = setInterval(() => {
            if(this.durationToMillis(this.state) === 0) {
                clearInterval(this.timer);
                return;
            }
            var c = this.durationToMillis(this.state.inits);
            var dif = this.state.startingTime - Date.now();
            this.setState(this.millisToDuration(c + dif));
        }, 100);
    }
    durationToMillis = ({hrs, mins, secs}) => {
        return hrs * 3600000 + mins * 60000 + 1000 * secs;
    }
    millisToDuration = (m) => {
        let k = m;
        let hrs = Math.floor(k / 3600000);
        k %= 3600000;
        let mins = Math.floor((k) / 60000);
        k %= 60000;
        let secs = Math.floor(k / 1000);
        return ({hrs, mins, secs});
    }
    render() {
        return(
            <Styles style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: `rgba(${this.state.background.join(",")})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Row style={{margin: 0, justifyContent: "center"}}>
                    <Col id="middle">
                        <div style={{width: "100%"}}>
                        <h1>
                            {this.state.hrs} : {this.state.mins} : {this.state.secs}
                        </h1>
                        </div>
                    <div style={{width: "100%", justifyContent: "space-around", alignItems: "center", margin: 0, flexDirection: "column", display: "flex"}}>
                             {
                                 !this.state.isStarted ? <Button size="lg" style={{width: "50%", margin: 20}} onClick={e => this.handleStart(false)}>
                                 Start
                             </Button> : 
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Share
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl value={window.location.toString().replace("waiting", this.state.startingTime)}/>
                            </InputGroup>
                             }
                        </div>
                    </Col>
                </Row>
            </Styles>
        );
    }
}