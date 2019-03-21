import React from 'react'

import { createBackground } from './helpers'

function Tile(props) {
    return ( 
        <div
            key={props.id}
            className="green tile"
            style={createBackground(props.level2, props.level1)}
        ></div>
    )
}

function MutableTile(props) {
    return ( 
        <div
            key = {props.id}
            className="green clickable tile"
            style={createBackground(props.level2, props.level1)}
            onClick={props.onClick}
        ></div>
    )
}

export class Battlefield extends React.Component {

    renderContext() {
        const table = this.props.grid
        if (this.props.callback) {
            return table.map((value, i) => 
                <MutableTile
                    key={i}
                    level1={value.level1}
                    level2={value.level2}
                    level3={value.level3}
                    onClick={() => this.props.callback(i)}
                />
            )
        } else {
            return table.map((value, i) => 
                <Tile
                    key={i}
                    level1={value.level1}
                    level2={value.level2}
                    level3={value.level3}
                />
            )
        }
    }

    render() {
        return (
            <div className="battlefield view">
                {this.renderContext()}
            </div>
        )
    }
}
