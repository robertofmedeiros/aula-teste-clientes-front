import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './style.css';
import api from './services/utils/RestClient';
import { Button, Dialog } from '@mui/material';

function App() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    api.get("clientes/").then((response) => {
      if (response.status === 200) {
        setClientes(JSON.parse(response.data));
        console.log(">>>", JSON.parse(response.data))
      }
    })
      .catch(error => {
        alert(`Erro não mapeado; ${error.message}`);
      });
  }, []);

  return (
    <div >
      <table style={{ border: "5px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ?
            clientes?.map((row) => (
              <>
                <tr>
                  <th>{row.id}</th>
                  <th>{row.nome}</th>
                  <th>{row.sobreNome}</th>
                  <th>
                    <Button variant="text">Editar</Button>
                    <Button variant="text">Remover</Button>
                  </th>
                </tr>
              </>
            ))
            : <></>}
        </tbody>
      </table>

      <Dialog
        open={openModal}
        onClose={handleClose}>

      </Dialog>
    </div>
  );
}

export default App;
