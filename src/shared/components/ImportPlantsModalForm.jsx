import React, { useState, useEffect, useCallback } from 'react';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Api } from '../services/api';
import { createPlantData, validAndParsedDataJSON } from '../utils';
import { NavTabsWithContent } from './NavTabsWithContent';

const drapzoneStyles = {
    cursor: 'pointer',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    minHeight: 134
};

export const ImportPlantsModalForm = ({
    open,
    onClose,
}) => {
    const [activeTab, setActiveTab] = useState('json');
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);
    const [inputText, setInputText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [hasErrors, setHasErrors] = useState([]);
    const [hasSucess, setHasSuccess] = useState(false);

    const resetAlerts = useCallback(() => {
        setHasErrors([])
        setHasSuccess(false);
    }, []);

    const resetData = useCallback(() => {
        setFiles([]);
        setData([]);
        setInputText('');
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        multiple: true,
        accept: 'application/json',
        onDrop: newAcceptedFiles => {
            if(newAcceptedFiles.length) {
                setHasSuccess(false);

                const newData = []
                const newFiles = []
                const newErrors = [];

                const loadFiles = (index = 0) => {
                    const file = newAcceptedFiles[index];
                    const fileReader = new FileReader();
                    fileReader.onload = e => {
                      try {
                        const result = validAndParsedDataJSON(e.target.result);
                        newData.push(...result);
                        newFiles.push(file);
                      } catch(err) {
                        err.message = `${file.name} ${err.message}`;
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
            const plants = data.map(createPlantData);
            
            setUploading(true);
            resetAlerts()
            Api.post('/plants', { plants })
                .then(() => {
                    setHasSuccess(true);
                    resetData()
                })
                .catch((err) => setHasErrors([err]))
                .finally(() => setUploading(false)) 
        }
    };

    const handleOnBlurInputText = () => {
        if(Boolean(inputText)) {
            try {
                const result = validAndParsedDataJSON(inputText);
                setData(result);
            } catch(err) {
                setHasErrors([err]);
            }
        }
    }

    const handleOnChangeTab = (v) => {
        resetAlerts();
        resetData();
        setActiveTab(v)
    };

    useEffect(() => {
        if(!open) {   
            resetData();
            resetAlerts() 
        }
    }, [open, resetData, resetAlerts]);

    useEffect(() => {
        if(activeTab === 'text') {
            navigator.clipboard.readText()
                .then((clipboard) => {
                    const result = validAndParsedDataJSON(clipboard);
                    setData(result);
                    setInputText(JSON.stringify(result));
                })
                .catch((err) => console.log('error get clipboard data', err))
        }   
        
    }, [activeTab])


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

    const navItems = [
        {
            key: 'json',
            title: 'Archivo JSON',
            content: (
                <div {...getRootProps({ style: drapzoneStyles })}>
                    <input {...getInputProps()} />
                    <p>Selecciona o Arrastra un Archivo JSON</p>
                    {filesPreview}
                </div>
            )
        },
        {
            key: 'text',
            title: 'Texto',
            content: (
                <Form.Control
                    style={{ resize: 'none' }}
                    placeholder="Inserta data copiada"
                    as="textarea" 
                    rows={5}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onBlur={handleOnBlurInputText}
                />
            )
        }
    ]

    return (
        <Modal centered show={open} backdrop="static">
            <form onSubmit={handleSubmit}>
                <Modal.Header>
                  <Modal.Title>Importar Plantas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NavTabsWithContent 
                        items={navItems}
                        onChange={handleOnChangeTab}
                        value={activeTab}
                    />
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