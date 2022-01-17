import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const EditShip = (props) => {
  const { editShip, ships } = useContext(GlobalContext);
  const [selectedShip, setSelectedShip] = useState({
    id: '',
    name: '',
    width: null,
    length:null,
    code: ''
  })
  const history = useHistory();
  const currentShipId = props.match.params.id;

  useEffect(() => {
    const shipId = currentShipId;
    const selectedShip = ships.find(ship => ship.id === shipId);
    setSelectedShip(selectedShip);
  }, [currentShipId, ships])

  const onChange = (e) => {
    setSelectedShip({ ...selectedShip, [e.target.name]: e.target.value })
  }

  const onChangeNumber = (e) => {
    setSelectedShip({
      ...selectedShip,
      [e.target.name]: parseFloat(e.target.value)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editShip(selectedShip);
    history.push("/")
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
      <Label>Name</Label>
        <Input type="text" value={selectedShip.name} onChange={onChange} name="name" placeholder="Enter Ship Name" required></Input>
        <Label>Width</Label>
        
        <Input type="number" value={selectedShip.width} onChange={onChangeNumber} name="width" placeholder="Enter Ship Width" required></Input>
        <Label>Length</Label>
        
        <Input type="number" value={selectedShip.length} onChange={onChangeNumber} name="length" placeholder="Enter Ship Length" required></Input>
        <Label>Code</Label>
        
        <Input type="text" value={selectedShip.code} onChange={onChange} name="code" pattern="[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{2}" placeholder="Enter Ship Code" required></Input>
        
      </FormGroup>
      <Button type="submit">Edit Ship</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
    </Form>
  )
}