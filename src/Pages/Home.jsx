import { useContext } from 'react';
import Banner from '../components/Banner';
import { AuthContext } from '../AuthPovider/AuthPovider';
import SecondBanner from '../components/SecondBanner';

const Home = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>
            {
                user?<SecondBanner/>:<Banner/>
          
            }

            
            
        </div>
    );
};

export default Home;