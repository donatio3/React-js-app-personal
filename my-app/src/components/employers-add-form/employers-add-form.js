import './employers-add-form.css'
import { Component } from 'react';

class EmployersAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            salary: ''
        }
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value // e.target в []
        })
    }


    render() {
        const {name, salary} = this.state
        const {onAddPerson} = this.props




        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        onAddPerson(name, salary)
                        
                        this.setState({
                            name: '',
                            salary: ''
                        })
                    }}

                    className="add-form d-flex">
                    <input required type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" 
                        name="name"
                        onChange={this.onValueChange}
                        value={name}
                        />
                    
                    <input required type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        onChange={this.onValueChange}
                        value={salary}
                        />
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
    
}

export default EmployersAddForm;