import { useState } from 'react'
import './App.css'
import EditorComponent from './components/EditorComponent'

function App() {


  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center border-2 border-r-blue-300 p-4'>
        <div className='w-full h-full border border-blue-500 '>
        <EditorComponent/>
        </div>
        
      </div>
        
    </>
  )
}

export default App
