/* eslint-disable react/jsx-pascal-case */
import { useMemo, useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import Swal from 'sweetalert2'
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const MainPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleRemove = (item, quantityToRemove) => {
    const updatedItems = selectedItems.map(selectedItem => {
      if (selectedItem === item) {
        const updatedQuantity = selectedItem.quantity - quantityToRemove;
        
        if (updatedQuantity <= 0) {
          return null;
        } else {
          return {
            ...selectedItem,
            quantity: updatedQuantity,
            totalPrice: selectedItem.price * updatedQuantity
          };
        }
      } else {
        return selectedItem;
      }
    }).filter(Boolean);
    setSelectedItems(updatedItems);
  };
  
  const handleConfirmation = (item, value) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.id === item.id);    
    if (existingItem !== undefined) {
      const newItems = selectedItems.map((item) => {
        if (item === existingItem) {
          console.log(item);
          item.quantity = Number(item.quantity) + Number(value);
          item.totalPrice = item.totalPrice + (Number(item.price) * Number(value));
        }
        return item;
      })
        setSelectedItems(newItems);
      } else {
      setSelectedItems([
        ...selectedItems,
        {
          id: item.id,
          description: item.description,
          quantity: value,
          price: item.price,
          totalPrice: item.price * value,
        }
      ])    
    }
    Swal.fire('Item adicionado ao carrinho', "", "success");
  };

  const handleFinalizeBuying = () => {
    const complitedOrders = JSON.parse(localStorage.getItem("comprinhas"));
    complitedOrders.push(selectedItems);
    localStorage.setItem("comprinhas", JSON.stringify(complitedOrders));
    Swal.fire('Compra finalizada com sucesso', "", "success");
    setSelectedItems([]);
  };

  const removeItems = (item) => {
    Swal.fire({
      text: `Deseja remover o item '${item.description}' do carrinho?`,
      confirmButtonText: 'Remover',
      showCancelButton: true,
      input: 'number',
      inputAttributes: {
        min: 1,
        max: 500,
      },
      inputValue: 1,
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed) {
        handleRemove(item, value);
      }
    });
  };
  const openConfirmationModal = (item) => {
    Swal.fire({
      text: `Deseja adicionar o item '${item.description}' ao carrinho?`,
      confirmButtonText: 'Adicionar',
      showCancelButton: true,
      input: 'number',
      inputAttributes: {
        min: 1,
        max: 500,
      },
      inputValue: 1,
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed) {
        handleConfirmation(item, value);
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "code",
        header: "Code",
        Header: <i>Código</i>
      },
      {
        accessorFn: (row) => row.description,
        id: "description",
        header: "Description",
        Header: <i>Descrição</i>
      },
      {
        accessorFn: (row) => `R$ ${row.price}`,
        id: "price",
        header: "Price",
        Header: <i>Preço</i>
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    data: JSON.parse(localStorage.getItem("products")) ?? [],
    columns,
    enableCellActions: true,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableProps: {
      sx: {
        caption: {
          captionSide: 'top',
        },
      },
    },
    renderCaption: () => 'Produtos',
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        openConfirmationModal(row.original);
      },
    }),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <Sidebar rootStyles={{
          [`.${sidebarClasses.container}`]: {
            marginLeft: '20px',
            height: '40vw',
            backgroundColor: 'MidnightBlue', 
            width: '300px',
                    
          },
        }}
        >
          <Menu
              menuItemStyles={{
                button: {             
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'MidnightBlue',
                  },
                },
              }}
          >
            <MenuItem>Meu Carrinho</MenuItem>
            {
              
              selectedItems.map((item, index) => (
                <div key={index}>
                  <MenuItem> {` ${item.quantity}x - ${item.description}, total - ${item.totalPrice}`} </MenuItem>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="secondary" size="large" style={{ width: '100px', height: '3vw' }} onClick={() => removeItems(item)} startIcon={<DeleteIcon sx={{ mr: 1.5, ml: 3 }} />}></Button>
                  </div>
                </div>
              ))
            }

            {selectedItems?.length > 0 && (
              <MenuItem> {`valor: R$ ${selectedItems.reduce((acc, item) => acc + item.totalPrice, 0)}`} </MenuItem>
            )}
            <MenuItem
              style={{ width: '93%', marginLeft: '10px'}}
              component={ <Button disabled={selectedItems?.length === 0 ? true : false} variant="contained" color="primary" onClick={handleFinalizeBuying}></Button>}
            >
              Finalizar compra
            </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default MainPage;