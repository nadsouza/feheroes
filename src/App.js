import React from 'react'
import './index.css'

import { Battlefield } from './Battlefield'
import { UnitCreator } from './UnitCreator'
import { Interface } from './Interface'
import { terrain, unit } from './helpers'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: Array(48).fill(null),
            mode: null,
        }
        for (let i=0; i<48; i++) {
            this.state.grid[i] = {
                level1: terrain.regTerrain,
                level2: "",
                level3: "",
            }
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderContext()}
                <Interface callBack={this.toggleEditMode}/>
            </div>
        )
    }

    renderContext = () => {
        if (this.state.mode in unit) {
            return <UnitCreator />
        }
        if (this.state.mode in terrain) {
            return <Battlefield 
                grid={this.state.grid}
                callback={this.handleClick}
            />
        } else {
            return <Battlefield 
                grid={this.state.grid} 
            />
        }
    }

    toggleEditMode = setting => {
        if (setting) {
            this.setState({
                mode: setting,
            })
        } else {
            this.setState({
                mode: null,
            })
        }
    }

    handleClick = i => {
        const grid = this.state.grid.slice()

        switch(this.state.mode) {
            case terrain.regTerrain: 
            case terrain.defTerrain:
            case terrain.flyTerrain:
            case terrain.wall:  
                grid[i].level1 = this.state.mode
                break
            case terrain.trench:
            case terrain.forest:
            case terrain.breakable:
            case terrain.damageable:
                if (grid[i].level2 === this.state.mode) {
                    grid[i].level2 = null
                } else {
                    grid[i].level2 = this.state.mode
                }
                break
            default:
                console.log('unexpected behaviour')
                break
        }

        this.setState({
            grid: grid
        })
    }
}
