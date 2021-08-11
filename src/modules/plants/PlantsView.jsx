import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import moment from 'moment';
import { Api } from '../../shared/services/api';
import { PlantCard } from './components/PlantCard';
import { PlantsFilter } from './components/PlantsFilter';
import { objectToUrlParams, timeToUtcNumber } from '../../shared/utils'

const initialFilter = {
	x: null,
	y: null,
	from: moment().subtract(30, 'minutes').format('HH:mm'),
	to: moment().add(30, 'minutes').format('HH:mm')
}

export const PlantsView = () => {
	const [plants, setPlants] = useState([]);
	const [filter, setFilter] = useState({ ...initialFilter });
	const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

	const fetchPlants = useCallback(() => {
		setIsLoading(true);
        setHasError(null);
        const url = `/plants?${objectToUrlParams({
            ...filter,
            from: timeToUtcNumber(filter.from),
            to: timeToUtcNumber(filter.to)
        })}`
		Api.get(url)
			.then((res) => setPlants(res.data.plants))
			.catch(err => setHasError(err))
			.finally(() => setIsLoading(false));
	}, [filter]);

	const handleOnChangeFilter = (newValues) => {
		setFilter({
			...filter,
			...newValues
		});
	};

	useEffect(() => {
		fetchPlants()
	}, [fetchPlants]);

    const content = !isLoading 
        ? (
            <Row>
                {plants.map(plant => 
                    <Col className="mb-4" xs={12} md={4} key={plant._id}>
                        <PlantCard data={plant} />
                    </Col>
                )}
            </Row>
        )
        : <>Cargando...</>

    const errorAlert = hasError && (
        <>
            <Alert variant="danger" onClose={() => setHasError(null)} dismissible>
                {hasError.message}
            </Alert>
            <br />
        </>
    );


	return (
		<>
			<PlantsFilter 
				data={filter}
				onChange={handleOnChangeFilter}
				onReset={() => setFilter({ ...initialFilter })}
			/>
			<br />
           {errorAlert}
	       {content}
		</>
	);
};