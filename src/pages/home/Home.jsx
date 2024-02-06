import "./Home.css";
import { useState, useEffect } from 'react';
import { MdOutlineDescription } from "react-icons/md";
import { FaPencil, FaXmark  } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


function Home() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("Abdulaziz");
  const [desc, setDesc] = useState("nand'wddawd");
  const [location, setLocation] = useState("fergana");
  const [age, setAge] = useState("nand'wddawd");
  const [id, setId] = useState("");
  const [input, setInput]=useState("")
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async (api) => {
    try {
      const req = await fetch(api);
      const jsonData = await req.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Error 404")
    }
  };

  const getOneData = async (api) => {
    try {
      const req = await fetch(api);
      const data = await req.json();
      console.log(data);
      setName(data.name);
      setDesc(data.desc);
      setLocation(data.location);
      setAge(data.age);
    } 
    catch (error) {
      console.error('Error fetching one data:', error);
      
    }
    
  };

  const updateData = async (api, config) => {
    try {
      await fetch(api, config);
      getData("http://localhost:3000/people");
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  useEffect(() => {
    getData("http://localhost:3000/people");
  }, []);


  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="container">
        <form onSubmit={(e)=>{
          e.preventDefault
        }} action="">
            <input onChange={(e)=>{
              setInput(e.target.value)
              setSearchTerm(e.target.value)
            }} type="text" placeholder="Live search users"/>
            <button className="refresh"><img src="./images/" alt=""/><i className="fa-solid fa-rotate-right"></i> Refresh</button>
            <button onClick={()=>{
              setData([])
              toast("Deleted")
            }} className="clear" type="button"><i className="fa-solid fa-paintbrush"></i>Clear</button>
        </form>
    </div>
      
        <div className="create">
          <NavLink to={"/create"}>
          <button className="create_btn">Create</button>
          </NavLink>
          <NavLink to={"/slider"}>
          <button className="create_btn">Slider</button>
          </NavLink>
        </div>
      
      <div className="boxes">
        {filteredData.map((item) => (
          <div className="box" key={item.id}>
            <div className="trash" onClick={() => {
              getOneData(`http://localhost:3000/people/${item.id}`);
              setId(item.id);
              setModalVisible(true);
            }}>
              <i><FaPencil /></i>
            </div>
            <p className="name">
              <i className="fa-solid fa-address-card"></i> - {item.name}
            </p>
            <p>
              <i className="fa-solid fa-cake-candles"></i> - {item.age}
            </p>
            <p>
              <i className="fa-solid fa-location-dot"></i> - {item.location}
            </p>
            <p>
              <i><MdOutlineDescription /></i> - {item.desc}
            </p>
            <NavLink to={`/cart-info/${item.id}`}><h3>Read More...</h3></NavLink>
          </div>
        ))}
      </div>
      {modalVisible && (
        <div className="modal" >
          <div className="create create2">
            <form className="modal_form" onSubmit={(e) => {
              e.preventDefault();
              updateData(`http://localhost:3000/people/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id,
                  name,
                  desc,
                  location,
                  age
                }),
              });
            }}>
              <span className="x-mark" onClick={() => {
                setModalVisible(false);
              }}><FaXmark /></span>
              <label htmlFor="name">Name:</label>
              <input onChange={(e) => {
                setName(e.target.value);
              }} value={name} placeholder="Name..." type="text" />
              <label htmlFor="description">Description:</label>
              <input onChange={(e) => {
                setDesc(e.target.value);
              }} value={desc} placeholder="Description..." type="text" />
              <label htmlFor="description">Location:</label>
              <input onChange={(e) => {
                setLocation(e.target.value);
              }} value={location} placeholder="Location..." type="text" />
              <label htmlFor="description">Age:</label>
              <input onChange={(e) => {
                setAge(e.target.value);
              }} value={age} placeholder="Age..." type="text" />
              <button onClick={()=>{
                toast("Data Changed")
              }} type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
