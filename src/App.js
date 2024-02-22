
import './App.css';
import React, { useEffect } from "react";
import MainPage from './pages/MainPage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HistoryPage from './pages/HistoryPage';
import { Menu, MenuItem, Sidebar, SubMenu, menuClasses, sidebarClasses } from 'react-pro-sidebar';
import { Grid, Container, menuItemClasses, Button } from '@mui/material';

export default function App() {

  const seedDatabase = () => {
    const products = [
      {
        id: 1,
        description: "teclado mecânico",
        price: 135.90,
      },
      {
        id: 2,
        description: "mouse razer",
        price: 189.90,
      },
      {
        id: 3,
        description: "placa mãe tipo H",
        price: 799.90,
      }
    ];
    // TODO: INCLUIR NO STORAGE OS DADOS DO USUARIO TAMBEM
    localStorage.setItem("products",JSON.stringify(products));

    const userData =[
      {
        profile: "João Amorim",
        age: 26,
        workWith: "Desenvolvedor",
      }
    ];
    localStorage.setItem("userData",JSON.stringify(userData));
  }

  useEffect(() => {
    seedDatabase();
  },[])

 
    
  const userData = JSON.parse(localStorage.getItem("userData"));
  
const PageLayout = ({ children }) => (
  // TODO: BUSCAR OS DADOS DO USUARIO DO LOCAL STORAGE, PQ AGORA TA HARDCODED

  <Container maxWidth={false} style={{ display: 'flex' }}>
    <Grid item md={3}>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            marginRight: '20px',
            height: '40vw',
            backgroundColor: 'MidnightBlue',           
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {             
              color: 'white',
              '&:hover': {
                backgroundColor: 'LightSkyBlue',
              },
            },
          }}
        >
            <MenuItem component={<Link to="/"></Link>}> Home</MenuItem>
            <MenuItem> {userData[0].profile} </MenuItem>
            <SubMenu label="Meus dados">
              <MenuItem
                rootStyles={{
                  ['.' + menuClasses.button]: {
                    backgroundColor: 'MidnightBlue',
                  },
                }}
              > 
                Idade: {userData[0].age} anos
              </MenuItem>
              <MenuItem
                rootStyles={{
                  ['.' + menuClasses.button]: {
                    backgroundColor: 'MidnightBlue',
                  },
                }}
              > 
                {userData[0].workWith}
              </MenuItem>
            </SubMenu>
              <MenuItem
                component={<Link to="/history"></Link>}
              > 
                Meus pedidos
              </MenuItem>
            
        </Menu>
      </Sidebar>
    </Grid>    
    <Grid item md={9} style={{ display: 'flex' }}>
      {children}  
    </Grid>     
  </Container>
)

return (
  <BrowserRouter>
    <PageLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </PageLayout>
  </BrowserRouter>
)
}