import React, {Component} from 'react';

class Like extends Component
{
    state = {

    }

    render()
    {
        let classes = "fa fa-heart"
        if (!this.props.liked) classes += '-o'
        return(<i className={classes} onClick={this.props.clickToggle} style={{cursor: 'pointer'}} aria-hidden="true"></i>);
    }
}

export default Like;