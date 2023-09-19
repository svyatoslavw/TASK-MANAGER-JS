'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Column from '../column/Column'
import EmptyBoardPage from '../empty-board/EmptyBoardPage'
import CreateBoardModal from '../ui/create-board-modal/CreateBoardModal'
import Modal from '../ui/modal/Modal'

const Main = () => {
  const [isModal, setIsModal] = useState(false)

  const { boards } = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)
  const columns = board.columns

  return (
    <div className=" h-screen flex gap-6 ">
      {columns.length ? (
        <>
          <p className="text-white flex">{board.name}</p>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            onClick={() => {
              setIsModal(true)
            }}
            className=" h-screen flex justify-center items-center font-bold text-2xl hover:text-secondary duration-200 cursor-pointer bg-primaryLight scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#7f8185] mt-[135px] rounded-2xl"
          >
            + New Column
          </div>
        </>
      ) : (
        <>
          <EmptyBoardPage type="edit" />
        </>
      )}

      <Modal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <CreateBoardModal type="edit" closeModal={() => setIsModal(false)} />
      </Modal>
    </div>
  )
}

export default Main
