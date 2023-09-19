'use client'
import { useState } from 'react'
import CreateBoardModal from '../ui/create-board-modal/CreateBoardModal'
import Modal from '../ui/modal/Modal'

const EmptyBoardPage = ({ type }) => {
  const [isModal, setIsModal] = useState(false)
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h3 className=" text-white font-bold">
        {type === 'edit'
          ? 'This board is empty. Create a new column to get started.'
          : 'There are no boards available. Create a new board to get started'}
      </h3>
      <button
        onClick={() => {
          setIsModal(true)
        }}
        className="w-full items-center max-w-xs font-semibold hover:opacity-70 mt-8 relative text-white bg-secondary py-2 rounded-full"
      >
        {type === 'edit' ? '+ Add New Column' : '+ Add New Board'}
      </button>
      <Modal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <CreateBoardModal closeModal={() => setIsModal(false)} />
      </Modal>
    </div>
  )
}

export default EmptyBoardPage
