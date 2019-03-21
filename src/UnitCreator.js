import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Control } from "./Interface"
import { Unit } from "./unit"

library.add(faPlus)

const Plus = <FontAwesomeIcon icon="plus" size="2x"/>
const MaxLength = 8

export class UnitCreator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playerSquad: [],
            enemySquad: [],
        }
    }

    render() {
        return (
            <div className="main">
                <h2>Player Squad</h2>
                <div className="squad view">
                    {this.renderSquad(this.state.playerSquad, this.addPlayerUnit)}
                </div>
                <h2>Enemy Squad</h2>
                <div className="squad view">
                    {this.renderSquad(this.state.enemySquad, this.addEnemyUnit)}
                </div>
            </div>
        )
    }

    renderContext(squad) {
    }

    renderSquad = (squad, mutator) => {
        const view = squad.map((value, i) => { 
            return (
                <div className="focus grey clickable tile" key={i}>
                    <span className="label"> { value.name } </span>
                </div>
        )})
        const len = view.length
        if (len < MaxLength) {
            for (let i=1; i<(MaxLength - len); i++) {
                view.push(<div className="tile" key={len + i}/>)
            }
            view.push(<Control 
                key={MaxLength + 1}
                className="red" 
                text={Plus} 
                onClick={() => mutator()}
            />)
        }
        return view
    }

    addPlayerUnit = () => {
        const squad = this.state.playerSquad.slice()
        squad.push(Unit())
        this.setState({
            playerSquad: squad
        })
    }

    addEnemyUnit = () => {
        const squad = this.state.enemySquad.slice()
        squad.push(Unit())
        this.setState({
            enemySquad: squad
        })
    }
}
