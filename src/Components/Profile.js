import React,{useContext,useEffect,useState} from 'react';
import {UserContext} from '../App';
import {Link} from 'react-router-dom';
import styles from './Profile.module.css'

function Profile(props) {
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]) 
    const [id,setid] = useState('')
    useEffect(()=>{
        let state = "SKV Nehru Vihar, Central Delhi, Delhi, 110054**BALAK RAM HOSPITAL TIMAR PUR DELHI 110054, Central Delhi, Delhi, 110054**BALAK RAM HOSPITAL TIMAR PUR DELHI 110054, Central Delhi, Delhi, 110054**ARUNA NAGAR MAJNU KA TILA, Central Delhi, Delhi, 110054**Timarpur Delhi Adm. Flat Complex Timarpur Delhi-110054, Central Delhi, Delhi, 110054**Majnu Ka Tilla, Central Delhi, Delhi, 110054**ARUNA NAGAR MAJNU KA TILA, Central Delhi, Delhi, 110054**BALAK RAM HOSPITAL TIMAR PUR DELHI 110054, Central Delhi, Delhi, 110054**2A R.B.L Isher Das Sawhney Marg, Rajpiu Road, Delhi 110054, Central Delhi, Delhi, 110054**2A R.B.L Isher Das Sawhney Marg, Rajpiu Road, Delhi 110054, Central Delhi, Delhi, 110054**2A R.B.L Isher Das Sawhney Marg, Rajpiu Road, Delhi 110054, Central Delhi, Delhi, 110054**2A R.B.L Isher Das Sawhney Marg, Rajpiu Road, Delhi 110054, Central Delhi, Delhi, 110054**2A R.B.L Isher Das Sawhney Marg, Rajpiu Road, Delhi 110054, Central Delhi, Delhi, 110054**BALAK RAM HOSPITAL TIMAR PUR DELHI 110054, Central Delhi, Delhi, 110054**5-Rajpur Road Delhi-110054, Central Delhi, Delhi, 110054**BALAK RAM HOSPITAL TIMAR PUR DELHI 110054, Central Delhi, Delhi, 110054**DGD Majnu Ka Tilla, Central Delhi, Delhi, 110054"
       let arr = state.split("**")
        setData([...arr]);
        const {age,pin} = props.location.state;
        const email = state.email;
    },[])
    const handleClick = () => {
        console.log("clicked")
        clearInterval(id);  
    }
    return (
        <>
        {console.log(data)}
        {console.log(typeof data)}
        <div className={styles.nav}>
            <Link to="/"><p>COWIN NOTIFIER</p></Link>  
            <button onClick={() => dispatch({type:"CLEAR"})}>Logout</button>
        </div>
        
        <div className={styles.results}>
            {
                (data.length==0 || (data.length==1 && data[0]==""))?<h4>Loading...</h4>: 
                <div >
                    <button className={`btn waves-effect waves-light ${styles.stop}`} onClick={handleClick}>Stop checking</button>
                    <h6>Avalaible Centres</h6>
                    <ol className={styles.list}>
                    {
                        data.map((obj,idx)=>(
                            <li className={styles.item}>{idx+1} {obj}</li>
                        )) 
                    }    
                    </ol>
                </div>
            }
        </div>
        </> 
    )   
}

export default Profile