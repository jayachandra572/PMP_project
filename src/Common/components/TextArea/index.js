import React,{Component} from "react";

class TextArea extends Component{
    static defaultProps = {
        cols:"50",
        rows:"4"
    }
    render(){
        const {value,onChange,cols,rows} = this.props;
        return(
         <textarea value = {value} onChange = {onChange} cols = {cols}  rows = {rows}/>)
    }
}

export default TextArea