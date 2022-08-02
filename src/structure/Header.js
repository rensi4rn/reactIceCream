import React from 'react'; 
import iceCream from '../assets/img/ultimate-ice-cream.svg'; 
import FocusLink from './FocusLink';
const Header = () => (
  <header>
    <h1>
      <img src={iceCream} alt="" />
      Ultimate Ice Cream
    </h1>
    <nav> 

      <FocusLink to="/" activeClassName="active" >
        Menu
      </FocusLink>
      <FocusLink to="/ice-creams" activeClassName="active" >
        Add Ice Cream
      </FocusLink>
    </nav>
  
  </header>
);

export default Header;
