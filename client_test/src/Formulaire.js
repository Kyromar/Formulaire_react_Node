import React from "react";
import API from "./API";

import './form.css';

export default class Formulaire extends React.Component {
  constructor() {
    super();
    this.state = {
      testFile: null,
      textfield1: "",
      numberfield1: "",
      datefield1: "",
      Error: ""
    };
  }

  handleChange = (name) => (e) => {
    const d=e.target.value
    this.setState({
      [name]: d+""
    });
    console.log(this.state)
  };

  sendD =async () =>{
  
    const {textfield1,numberfield1,datefield1,testFile}=this.state;
   const data ={textfield1,numberfield1,datefield1}
    if((numberfield1.trim()==="") && (datefield1.trim()==="")){
      
      this.setState({Error:"You must fill the fields "})
    }
    else{
    await API.sendData(data)
    .then((res)=>{
            if(res.status===201) {
              this.setState({Error:res.data.Error})
              }else{
              console.log(res.data);
               window.location.href = testFile.redirection;
            }
    
    })}
    

  
  };

  Button = (name, text) => {
    return (
      <div>
        <button className="button" name={name} onClick={this.sendD}>
          {text}
        </button>
      </div>
    );
  };

  Field = ({ name, xtype, mandatory, maxvalue }) => {
    const { textfield1, numberfield1, datefield1 } = this.state;
    const value =
      name === "textfield1"
        ? textfield1
        : name === "numberfield1"
        ? numberfield1
        : datefield1;
    return (
      <div>
        <input
          name={name}
          type={xtype}
          value={value}
          required={mandatory}
          maxvalue={maxvalue}
          onChange={this.handleChange(name)}
        />
      </div>
    );
  };

  async componentDidMount() {

    await API.getTestFile()
      .then(res => this.setState({ testFile: res.data}))
      .catch(err => console.log(err));
  }


  render() {
    const { testFile,Error } = this.state;
    return (
      <div>
        
        {testFile &&<div>
          <h2>{testFile.formname}</h2>
          
        <div style={{ color: "red" }}>{Error}</div>
          {testFile.fieldsui.map((field, index) => (
            <div key={index}>
              <label className="label" htmlFor={field.name}> {field.label}</label>
              {field.xtype === "button"
                ?  this.Button(field.name,field.text)
                : this.Field(field)}
            </div>
          ))}
        </div>
        }
      </div>
    );
  }
}
