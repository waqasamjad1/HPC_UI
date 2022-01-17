import React, { useState, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const AddShip = () => {
  const [obj, setObj] = useState({});
  const { addShip } = useContext(GlobalContext);
  const history = useHistory();

  
  const onSubmit = (e) => {
   
    e.preventDefault();
    const newShip = {
      id: uuid(),
      ...obj
    }
    addShip(newShip);
    history.push("/");
  }

  const onChange = (e) => {

    setObj({
      ...obj,
      [e.target.name]: e.target.value
    })
  }
  const onChangeNumber = (e) => {
      setObj({
        ...obj,
        [e.target.name]: parseFloat(e.target.value)
      })
    }
  

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text"  onChange={(e) => onChange(e) }  name="name" placeholder="Enter Ship Name" required></Input>
        <Label>Width</Label>
        
        <Input type="text" onChange={onChangeNumber} name="width" placeholder="Enter Ship Width" required></Input>
        <Label>Length</Label>
        
        <Input type="text"  onChange={onChangeNumber} name="length" placeholder="Enter Ship Length" required></Input>
        <Label>Code</Label>
        
        <Input type="text" onChange={onChange} name="code" pattern="[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{2}"  placeholder="Enter Ship Code: AAAA-1111-A1" required></Input>
        

      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}