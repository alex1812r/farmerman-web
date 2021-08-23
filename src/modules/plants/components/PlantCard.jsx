import React from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { truncateText } from '../../../shared/utils';

const PLANTS_VS_UNDEAD_URL = 'https://marketplace.plantvsundead.com';

export const PlantCard = ({ data }) => {
	const toolWater = data.activeTools.find((tool) => tool.type === 'WATER');
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
		    		<Col xs={5}>
		    			ID: <b>
				    	<a
								className="text-success"
								href={`${PLANTS_VS_UNDEAD_URL}/#/farm/${data._id}`} 
								target="_blank"
								rel="noreferrer">
								{data.plantId}
				    	</a>
				    	</b>
		    		</Col>
		    		<Col xs={7} className="text-end">
						Coordenadas: {' '}
						<b>{data.land.x} , {data.land.y}</b>
		    		</Col>
		    	</Row>
		    </ListGroupItem>
		    <ListGroupItem>
		    	<Row>
		    		<Col xs={12} className="mb-2">
		    			<h6>Tiempo de reinincio de agua</h6>
		    		</Col>
		    		<Col xs={12} xl={7}>
		    			<h6 className="mb-2">Mi zona</h6>
							Inicio: {' '}
		    			<b className="text-primary">
		    			 	{moment(toolWater.endTime).format('hh:mm:ss a')}
		    			 </b>
							 <br />
							Fin: {' '}
							<b className="text-primary">
		    			 	{moment(toolWater.startTime).format('hh:mm:ss a')}
							</b>
		    		</Col>
		    		<Col 
		    			xs={12} xl={5} 
		    			className="text-xl-end mt-2 mt-xl-0">
		    			<h6 className="mb-2">UTC</h6>
							Inicio: {' '}
		    			<b>
		    			 	{moment(toolWater.endTime).utc().format('HH:mm:ss')}
		    			 </b>
							 <br />
							Fin: {' '}
							<b>
		    			 	{moment(toolWater.startTime).utc().format('HH:mm:ss')}
							</b>
		    		</Col>
		    	</Row>
		    </ListGroupItem>
					<ListGroupItem>
						Granja:{' '} 
						<a 
							className="text-primary" 
							href={`${PLANTS_VS_UNDEAD_URL}/#/farm/other/${data.ownerId}`} 
							target="_blank"
							rel="noreferrer">
							<small><b>{truncateText(data.ownerId, 20)}</b></small>
						</a>
						<br />
					</ListGroupItem>
		  </ListGroup>
		</Card>
	)
};
