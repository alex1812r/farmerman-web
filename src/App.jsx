import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { Layout } from './shared/components/Layout'

export const App = () => {
  return (
  	<BrowserRouter>
    	<Layout>
      		<Router />
    	</Layout>
   </ BrowserRouter>
  );
};