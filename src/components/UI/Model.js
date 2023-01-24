import classes from './Model.module.css'
import ReactDOM from 'react-dom'
import { Fragment } from 'react';


const Overlay = (props) =>{
    return (
        <div className= {classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const BackDrop = (props) => {
    return (<div className={classes.backdrop} onClick={props.onClose}></div>)
}

const Model = (props) => {
    const portalElement = document.getElementById('overlays');
    return (
      <Fragment>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,portalElement)}
      </Fragment>
    );
}

export default Model;