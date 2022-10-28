import React from "react";
import classes from './MyButton.module.css'

const MyButton = ({children, current, ...props}) => {
    const rootClasses = [classes.myBtn];
    if (current) {
        rootClasses.push(classes.active);
    }
    return (
        <button {...props} className={rootClasses.join(' ')}>
            {children}
        </button>
    )
}

export default MyButton;