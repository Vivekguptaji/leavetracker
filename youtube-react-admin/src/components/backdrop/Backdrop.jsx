import React from 'react'
import './Backdrop.css'
export default class Backdrop extends React.Component {
    render() {
        debugger;
    return(
      <div
        className="backdrop"
        onClick={this.props.showMenuHandler}
      />
    )
  }
}