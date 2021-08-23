import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ImportPlantsModalForm } from './ImportPlantsModalForm';
import logo from '../assets/logo.png'

export const Layout = ({ children }) => {
    const [openImportModal, setOpenImportModal] = useState(false);

	return (
		<>
			<header>
    		<Navbar variant="dark" bg="dark" expand="lg" fixed="top">
    			<Container>
    			    <Navbar.Brand>
    			    	<img src={logo} height="35px" width="70px" alt="logo" />
    			    </Navbar.Brand>
    			    <Navbar.Toggle	/>
                    <Navbar.Collapse>
                      <Nav className="ms-auto">
                        <Nav.Link href="#" onClick={() => setOpenImportModal(true)}>
                            Importar Plantas
                        </Nav.Link>
                      </Nav>
                    </Navbar.Collapse>
    		    </ Container>
    		</Navbar>
			</header>
				<main>
					<div style={{ height: 62 }}></div>
					<Container className="pt-4">
						{children}
					</Container>
				</main>
				<ImportPlantsModalForm 
						open={openImportModal}
						onClose={() => setOpenImportModal(false)}
				/>
		</>
	);
};