import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditUser.css";
import Select from "react-select";

export default function EditUser() {
  const location = useLocation();
  const nav = useNavigate();
  const [name1, setName] = useState(location.state.name);
  const [email1, setEmail] = useState(location.state.email);
  const [gender1, setGender] = useState({value:location.state.gender,label:location.state.gender});
  const [status1, setStatus] = useState({value:location.state.status,label:location.state.status});
  const [error,setError] = useState()
  const save = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(process.env.REACT_APP_URL + "update-user", {
            method: "PUT",
            body:JSON.stringify({
                id:location.state.id,
                name:name1,
                email:email1,
                gender:gender1.value,
                status:status1.value,
                updated_at:Date.now().toString()
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
          });
          const data = await res.json
          if(data.status===-1){
              setError("Unable to update User")
          }else{
              setError("User details updated. You will be redirected to the main page")
              setTimeout(() => {
                  nav('/',{replace:true})
              }, 2000);
          }
    } catch (error) {
        
    }

  };

  const customStyles = {
    control: (base) => ({
      ...base,
      width: 326.38,
      borderRadius:0,
      border:" 2px solid rgb(197, 197, 197)"

    }),
  };

  return (
    <form className="form">
      <span>Edit User</span>
      <div>
        <p>Name</p>
        <input type="text" value={name1} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div>
        <p>Email</p>
        <input type="text" value={email1} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <Select
        placeholder="Gender"
        styles={customStyles}
        value={gender1}
        onChange={(e)=>setGender(e)}
        options={[
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
        ]}
      />
      <Select
        styles={customStyles}
        value={status1}
        onChange={(e)=>setStatus(e)}

        placeholder="Status"
        options={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
      />

      <div className="btns">
        <button onClick={() => nav("/", { replace: true })}>Cancel</button>
        <button onClick={save} >Save</button>
      </div>

      <div>
          
            <p>{error}</p>
          
      </div>

      
    </form>
  );
}
