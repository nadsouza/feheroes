import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { terrain, unit } from './helpers'

library.add(faQuestion, faArrowLeft)

const arrow = <FontAwesomeIcon icon="arrow-left"/>
const question = <FontAwesomeIcon icon="question"/>

export function Control(props) {
    return (
        <div className={props.className + " control"} onClick={props.onClick}>
            <span className="text">{props.text}</span>
        </div>
    )
}

function ImgControl(props) {
    return (
        <div className={props.className + " control"} onClick={props.onClick}>
        </div>
    )
}

export class Interface extends React.Component {
    constructor(props) {
        super(props)
        this.setMode = props.callBack
        this.state = {
            controls: this.homeControls()
        }
    }

    switchTo(callable) {
        this.setMode(false)
        this.setState({
            controls: callable.call()
        })
    }

    homeControls = () => {
        const controls = [
            <Control key={1}
                text="Change Map" 
                onClick={() => this.switchTo(this.mapControls)} />,
            <Control key={2} text="Change Positions"/>,
            <Control key={3}
                text="Change Teams / Skills"
                onClick={() => this.setMode(unit.create)}
            />,
            <div key={4} className="seperator"></div>,
            <div key={5} className="seperator"></div>,
            <Control key={'help'} text={question} />,
        ]
        return controls
    }

    mapControls = () => {
        return [
            <Control key={1}
                text={arrow}
                onClick={() => this.switchTo(this.homeControls)} />,
            <Control key={2}
                text="Change Terrain Type"
                onClick={() => this.switchTo(this.level1Controls)} />,
            <Control key={3}
                text="Add Obstacles"
                onClick={() => this.switchTo(this.level2Controls)} />,
            <div key={4} className="seperator"></div>,
            <div key={5} className="seperator"></div>,
            <Control key={'help'}text={question} />,
        ]
    }

    level1Controls = () => {
        return [
            <Control key={1}
                text={arrow}
                onClick={() => this.switchTo(this.mapControls)} />,
            <Control key={2} className="green"
                text="Add Regular Terrain"
                onClick={() => this.setMode(terrain.regTerrain)}/>,
            <Control key={3} className="grey mountain"
                onClick={() => this.setMode(terrain.flyTerrain)}/>,
            <Control key={4} className="grey defensive"
                onClick={() => this.setMode(terrain.defTerrain)}/>,
            <Control key={5} className="grey stop"
                onClick={() => this.setMode(terrain.wall)}/>,
            <Control key={'help'} text={question} />,
        ]
    }

    level2Controls = () => {
        return [
            <Control key={1} 
                text={arrow}
                onClick={() => this.switchTo(this.mapControls)} />,
            <ImgControl key={2} className="grey forest"
                onClick={() => this.setMode(terrain.forest)} />,
            <ImgControl key={3} className="grey trench" 
                onClick={() => this.setMode(terrain.trench)} />,
            <ImgControl key={4} className="wall-broken" 
                onClick={() => this.setMode(terrain.breakable)} />,
            <ImgControl key={5} className="wall" 
                onClick={() => this.setMode(terrain.damageable)} />,
            <Control key={'help'} text={question} />,
        ]
    }

    render() {
        return (
            <div className="interface">
                {this.state.controls}
            </div>
        )
    }
}
