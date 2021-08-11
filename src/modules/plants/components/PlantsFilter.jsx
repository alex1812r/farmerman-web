import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const PlantsFilter = ({ data, onChange, onReset }) => {
	return (
		<Form>
			<Row className="justify-content-end align-items-end">
				<Col xs={3} md={3} lg={1}>
					<Form.Label>X</Form.Label>
					 <Form.Control
					 	type="number"
					 	value={data.x}
					 	onChange={
					 		(e) => onChange({ x: e.target.value })
					 	}
					 	maxLength="2"
					 />
				</Col>
				<Col xs={3} md={2} lg={1}>
					<Form.Label>Y</Form.Label>
					 <Form.Control
					 	type="number"
					 	value={data.y}
					 	onChange={
					 		(e) => onChange({ y: e.target.value })
					 	} 
					 	maxLength="2" 
					 />
				</Col>
				<Col xs={6} md={3} lg={2}>
					<Form.Label>Reinincio desde</Form.Label>
					 <Form.Control
					 	type="time"
					 	value={data.from}
					 	onChange={
					 		(e) => onChange({ from: e.target.value })
					 	}
					 />
				</Col>
				<Col xs={6} md={3} lg={2}>
					<Form.Label>Reinincio Hasta</Form.Label>
					 <Form.Control 
					 	type="time"
					 	value={data.to}
					 	onChange={
					 		(e) => onChange({ to: e.target.value })
					 	}
					 />
				</Col>
				<Col xs={3} md={2} lg={1}>
					<div className="text-end">
						<Button onClick={onReset} variant="secondary">
							Limpiar
						</Button>
					</div>
				</Col>
			</Row>
		</Form>
	);
};