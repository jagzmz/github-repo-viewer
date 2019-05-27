import React, { Component } from 'react'
import axios from 'axios'


export class UserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            result: []
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)


    }

    handleChange(e) {
        this.setState({
            userInput: e.target.value
        })

    }

    handleClick() {
        const url = `https://api.github.com/users/${this.state.userInput}/repos`

        axios.get(url).then(
            (res) => {
                const unForked=res.data.filter(uf=>!uf.fork)
                console.log(unForked)
                const repos = <div className="result">{unForked.map(id => <li key={id.name.toString()}>{id.name}</li>)}</div>
                
                this.setState({
                    result: repos
                })
                // console.log(this.state.result)
            }
        )
            .catch(err => {
                this.setState({
                    result: <h2 className="result">No data found for user "{this.state.userInput}"</h2>
                })
            })
    }



    render() {
        return (
            <div className="user-form">
                <input onChange={this.handleChange} placeholder="enter a username..." />
                <button onClick={this.handleClick}>Find Users</button>
                {this.state.result}
            </div>
        )
    }
}

export default UserForm
