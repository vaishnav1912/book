import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Add from '../Components/Add'
import BookCard from '../Components/BookCard'
import View from '../Components/View'

const Home = () => {
 
    const[uploadResposeFromHome,setUploadResposeFromHome]=useState("")
    const[deleteBookFromBookCrd,setDeleteBookFromBookCrd]=useState("")

  return (
    <>
     <Header/>
    <h1 className='text-center' >BOOK MANAGEMENT</h1>
    <div className='container '>
        <Add  setUploadResposeFromHome={setUploadResposeFromHome}/>
        <div className='mt-5 ' >
            <BookCard uploadResposeFromHome={uploadResposeFromHome} setDeleteBookFromBookCrd={setDeleteBookFromBookCrd} deleteBookFromBookCrd={deleteBookFromBookCrd} />
        </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default Home