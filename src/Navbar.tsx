import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';


interface NavbarProps {
  backgroundColor?: string;
  color?: string;
}
const NavbarStyled = styled.nav<NavbarProps>(
  {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    padding: '10px 10px',
  },
  props => ({
    backgroundColor: props.backgroundColor || '#333',
    color: props.color || '#fff',
  })
);
interface NavLinksContainerProps {
  
}  

const NavLinksContainer = styled.div<NavLinksContainerProps>(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})); 

interface NavLinkProps {
  color?: string;
  hoverColor?: string;
}

const NavLink = styled(RouterNavLink)<NavLinkProps>(
  {
    textDecoration: 'none',
    margin: '0 10px',
  },
  props => ({
    color: props.color || '#fff',
    '&:hover': {
      color: props.hoverColor || 'green',
    }
  })
);

interface BrandProps {
  color?: string;
  hoverColor?: string;
}

const Brand = styled.a<BrandProps>(
  {
    textDecoration: 'none',
    marginRight: 'auto',
    fontSize: '25px',
    margin: '0 10px',
    fontWeight: 'bold',
  },
  props => ({
    color: props.color || '#fff',
    '&:hover': {
      color: props.hoverColor || 'green',
    }
  })
);

export default function Navbar() {
  return (
    <>
      <NavbarStyled>
          <Brand href="/">JNC</Brand>
          <NavLinksContainer>
            <NavLink to="/">Rick and Morty</NavLink>
            <NavLink to="/listamodificada">Modificar lista</NavLink>
            <NavLink to="/allRickMorty">All Rick and Morty</NavLink>
            <NavLink to="/axiosRickMorty">Rick and Morty Axios</NavLink>
            <NavLink to="/hotels">Hotels</NavLink>
          </NavLinksContainer>
      </NavbarStyled>
    </>
  )
}