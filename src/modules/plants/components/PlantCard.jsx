import React from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { truncateText } from '../../../shared/utils';

const PLANTS_VS_UNDEAD_URL = 'https://marketplace.plantvsundead.com';

export const PlantCard = ({ data }) => {
	return (
		<Card>
		<Card.Body>
            <a
                style={{ right: 0, top: 0 }}
                className="btn btn-success position-absolute " 
                href={`${PLANTS_VS_UNDEAD_URL}/#/farm/${data._id}`} 
                target="_blank"
                rel="noreferrer">
                Ir
            </a>
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
				    	<span className="text-success">
				    		{data.plantId}
				    	</span>
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
