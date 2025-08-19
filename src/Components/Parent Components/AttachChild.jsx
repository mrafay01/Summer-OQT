import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AttachChild = () => {
    const [studentUserName, setStudentUserName] = useState("");

    useEffect(() => {
        axios
        .get(`http://localhost/OnlineQuranServer/api/tutor/AttachParentToStudent?studentUserName=${studentUserName}&parent_id=${localStorage.getItem("id")}`)
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default AttachChild
