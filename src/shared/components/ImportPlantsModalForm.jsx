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
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [hasErrors, setHasErrors] = useState([]);
    const [hasSucess, setHasSuccess] = useState(false);

    const {getRootProps, getInputProps} = useDropzone({
        multiple: true,
        accept: 'application/json',
        onDrop: newAcceptedFiles => {
            if(newAcceptedFiles.length) {
                const newData = []
                const newFiles = []
                const newErrors = [];

                const loadFiles = (index = 0) => {
                    const file = newAcceptedFiles[index];
                    const fileReader = new FileReader();
                    fileReader.onload = e => {
                      try {
                        const result = JSON.parse(e.target.result);
                        if(!Array.isArray(result)) {
                            throw new Error(`${file.name} Data invalida`)
                        }

                        newData.push(...result);
                        newFiles.push(file);
                      } catch(err) {
                        newErrors.push(err)
                      }

                      if(index + 1 === newAcceptedFiles.length) {
                        setData(newData);
                        setFiles(newFiles);
                        setHasErrors(newErrors);
                      } else loadFiles(index + 1);

                    };
                    fileReader.readAsText(file, "UTF-8");

                }
                loadFiles();
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
            setHasErrors([])
            setHasSuccess(false);
            Api.post('/plants', { plants })
                .then(() => {
                    setHasSuccess(true);
                    setData([]);
                })
                .catch((err) => setHasErrors([err]))
                .finally(() => setUploading(false)) 
        }
    };

    useEffect(() => {
        if(!open) {
            setData([]);
            setFiles([]);
            setHasErrors([])
            setHasSuccess(false); 
        }
    }, [open]);

    const filesPreview = files.map((file, i) => (
        <p key={`file-${i+1}`} className="text-success mt-2">{file.name}</p>
    ))

    const alertErrors = hasErrors.map((e, i) =>  (
        <Alert   
            key={`error-${i+1}`}
            className="mt-3"
            variant="danger" 
            onClose={() => {
                const auxErrors = [...hasErrors];
                auxErrors.splice(i, 1);
                setHasErrors(auxErrors)
            }} 
            dismissible>
            {e.message}
        </Alert>
    ));

    const alertSucess = hasSucess ? (
        <Alert   
            className="mt-3"
            variant="success" 
            onClose={() => {
                setHasSuccess(false)
            }} 
            dismissible>
            Plantas Importadas Exitosamente!
        </Alert>
    ) : null;

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
                        {filesPreview}
                    </div>
                    {alertErrors}
                    {alertSucess}
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