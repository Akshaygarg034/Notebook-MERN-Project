import React from 'react';
import AddNote from './AddNote';
import Note from './Note';

function Home(props) {

  return (

    <div className="container my-3">
      <AddNote showAlert={props.showAlert}/>
      <Note showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
