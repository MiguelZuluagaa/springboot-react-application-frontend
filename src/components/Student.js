import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Paper, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Student() {
     const paperStyle = {padding:'50px 20px',margin:'20px auto', width:600}

     const [name,setName] = useState('');
     const [address,setAddress] = useState('');
     const [students,setStudents] = useState([]); 
     const [contador,setContador] = useState('');

     const handleClick = (e)=>{
          e.preventDefault();
          const student = {name,address};
          fetch("http://localhost:8091/student/add",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(student) 
          }).then(()=>{
               console.log("New Student added");
               setContador(contador+1);
          })
     }

     useEffect(()=>{
          fetch("http://localhost:8091/student/getAll")
          .then(rest=>rest.json())
          .then((result)=>{
               setStudents(result)
          })
     },[contador])

     return (
          <Container>
               <Paper elevation={3} style={paperStyle}>
                    <h1>Add Student</h1>
                    <Box component="form" sx={{'& > :not(style)': { m: 1 },}} noValidate autoComplete="off">
                         <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
                         <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Box>
                    <Button variant="outlined" onClick={handleClick}>Create</Button>
               </Paper>
               <Paper elevation={3} style={paperStyle}>
                    <h1>Students</h1>
                    {students.map(student =>(
                         <Paper elevation={3} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}> 
                              Id:{student.id}<br/>
                              Name:{student.name}<br/>
                              Address:{student.address}
                         </Paper>
                    ))}
               </Paper>
          </Container>
     );
}
