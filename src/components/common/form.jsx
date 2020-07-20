import React, {Component} from 'react';
import Joi from 'joi-browser'
import Input from './input'

class Form extends Component
{
    state = {
        data: {},
        errors: {},
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        console.log('submitted');
    }

    validateProperty = ({name, value}) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name] };
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly: false})
        
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    handleChange = e => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) errors[e.currentTarget.name]= errorMessage;
        else delete errors[e.currentTarget.name];

        const data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;

        this.setState({data, errors});
    }

    renderButton(label) 
    {
        return <button 
            disabled={this.validate()}
            className="btn btn-primary">
            {label}
        </button>
    }

    renderInput(name, label, type='text')
    {
        return <Input
            name={name}
            label={label}
            value={this.state.data[name]}
            error={this.state.errors[name]}
            onChange={this.handleChange}
            type={type} 
        />
    }
}

export default Form;