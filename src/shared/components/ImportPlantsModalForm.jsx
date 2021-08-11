import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Api } from '../services/api';

const drapzoneStyles = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

export const ImportPlantsModalForm = ({
    open,
    onClose,
}) => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [hasError, setHasError] = useState(null);
    const [hasSucess, setHasSuccess] = useState(false);

    const {getRootProps, getInputProps} = useDropzone({
        multiple: false,
        accept: 'application/json',
        onDrop: acceptedFiles => {
            if(acceptedFiles.length) {
                const fileReader = new FileReader();
                fileReader.onload = e => {
                  try {
                    const result = JSON.parse(e.target.result);
                    if(!Array.isArray(result)) {
                        throw new Error('Data invalida')
                    }

                    setData(result);
                    setFile(acceptedFiles[0]);
                  } catch(err) {
                    setHasError(err);
                  }
                };
                fileReader.readAsText(acceptedFiles[0], "UTF-8");
                
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.length) {
            const plants = data.map((p) => {
                return {
                    _id: p._id,
                    ownerId: p.ownerId,
                    startTime: p.startTime, 
                    plantId: p.plantId, 
                    plantUnitId: p.plantUnitId, 
                    plantElement: p.plantElement, 
                    land: {
                        landId: p.land.landId,
                        x: p.land.x,
                        y: p.land.y
                    },
                    plant: {
                        iconUrl: p.plant.iconUrl
                    },
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                }
            });
            
            console.log(plants);

            setUploading(true);
            setHasError(null)
            setHasSuccess(false);
            Api.post('/plants', { plants })
                .then(() => {
                    setHasSuccess(true);
                    setFile(null);
                    setData([]);
                })
                .catch((err) => setHasError(err))
                .finally(() => setUploading(false)) 
        }
        
    };

    useEffect(() => {
        if(!open) {
            setFile(null);
            setData([]);
            setHasError(null)
            setHasSuccess(false); 
        }
    }, [open]);

    const fileComponent = file 
        ? <p className="text-success">{file.name}</p>
        : null;

    let alertComponent = null;
    if(hasError || hasSucess) {
        const message = hasError?.message || 'Plantas Importadas Exitosamente!';
        const variant = hasError ? 'danger' : 'success';
        alertComponent = (
            <Alert 
                className="mt-3"
                variant={variant} 
                onClose={() => {
                    setHasError(null);
                    setHasSuccess(false);
                }} 
                dismissible>
                {message}
            </Alert>
        )
    }

    return (
        <Modal centered show={open} backdrop="static">
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                  <Modal.Title>Importar Plantas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div {...getRootProps({ style: drapzoneStyles })}>
                        <input {...getInputProps()} />
                        <p>Selecciona o Arrastra un Archivo JSON</p>
                        {fileComponent}
                    </div>
                    {alertComponent}
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                    disabled={uploading}
                    type="button" 
                    variant="secondary" 
                    onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button 
                    disabled={!data.length || uploading}
                    type="submit" 
                    variant="success">
                    {uploading ? 'Importando...' : 'Importar'}
                  </Button>
                </Modal.Footer>
            </form>
      </Modal>
    );
}