'use client'
import { useState } from 'react'
import Header from '../header/Header.jsx'
import Main from '../main/Main.jsx'
import Navbar from '../navbar/Navbar'

const HomePage = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
  return (
    <div>
      <Navbar setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
      <Header />
      <div className="ml-32">
        <Main setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
      </div>
    </div>
  )
}

export default HomePage
