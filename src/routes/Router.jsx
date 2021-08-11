import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PlantsView } from '../modules/plants/PlantsView';

export const Router = () => (
	<Switch>
		<Route exact path="/plants" component={PlantsView} />
        <Redirect to="/plants" />
	</ Switch>
);
