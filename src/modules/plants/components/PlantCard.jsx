import React from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import moment from 'moment';

export const PlantCard = ({ data }) => {
	return (
		<Card>

			<Card.Body>
				<img 
					className="d-block m-auto mb-2"
					width="100px" 
					height="100px" 
					src={data.plant.iconUrl}
					alt="plant icon"
				/>
		  </Card.Body>
		  <ListGroup className="list-group-flush">
		    <ListGroupItem>
		    	<Row>
		    		<Col>
		    			ID: <b>
				    	<span className="text-success">
				    		{data.plantId}
				    	</span>
				    	</b>
		    		</Col>
		    		<Col className="text-end">
						Coordenadas: {' '}
						<b>{data.land.x} , {data.land.y}</b>
		    		</Col>
		    	</Row>
		    </ListGroupItem>
		    <ListGroupItem>
		    	<Row>
		    		<Col xs={12} className="mb-2">
		    			Tiempo de reinincio
		    		</Col>
		    		<Col xs={12} xl={7}>
		    			Mi zona: {' '}
		    			<b className="text-primary">
		    			 	{moment(data.startTime).format('hh:mm:ss a')}
		    			 </b>
		    		</Col>
		    		<Col 
		    			xs={12} xl={5} 
		    			className="text-xl-end mt-2 mt-xl-0">
		    			UTC: {' '}
		    			<b className="text-red">
		    			 	{moment(data.startTime).utc().format('HH:mm:ss')}
		    			 </b>
		    		</Col>
		    	</Row>
		    	
		    </ListGroupItem>
		  </ListGroup>
		</Card>
	)
};