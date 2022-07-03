import React from 'react';
import AddNote from './AddNote';
import Note from './Note';

function Home() {

  return (

    <div className="container my-3">
      <AddNote/>
      <Note />
    </div>
  )
}

export default Home
