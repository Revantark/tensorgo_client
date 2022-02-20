import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";
export default function     Table() {
  const [users, setUsers] = useState([]);
  const nav = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_URL + "get-users", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
      });
      
      setUsers((await res.json()).res)
    };
    fetchData()
  }, []);

  const exportAsCSV = async ()=>{
      try {
        const res = await fetch(process.env.REACT_APP_URL + "get-users-csv", {
            method: "GET",
            
          });
        const data = await res.blob()
        const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "users.csv");
            document.body.appendChild(link);
            link.click();
      } catch (error) {
          
      }
  }

  return (
    <div className="table">
      <div className="nottable" >
      <span>User details</span>
      <button onClick={()=>exportAsCSV()} >Export as CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>SNo</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
        
              {
                  users.map((e,i)=>{
                      return<>
                        <tr>
                       <td>
                          {i+1}
                      </td>
                      <td>
                          {e.id}
                      </td>
                      <td>
                          {e.name}
                      </td>
                      <td>
                          {e.email}
                      </td>
                      <td>
                          {e.gender}
                      </td>
                      <td>
                          {e.status}
                      </td>
                      <td className="lasttd" >
                      <img onClick={()=>{
                          nav("/edit",{state:e})
                      }} alt="" src="https://img.icons8.com/material-rounded/24/000000/edit--v1.png"/>
                      </td>
          </tr>

                      </>
                  })
              }
        </tbody>
      </table>
    </div>
  );
}
