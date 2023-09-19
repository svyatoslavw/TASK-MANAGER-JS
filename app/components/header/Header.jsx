'use client'
import { useState } from 'react'
//import { BiBell, BiSearch } from 'react-icons/bi'
import { BsLightningChargeFill } from 'react-icons/bs'
import { HiMiniPlus } from 'react-icons/hi2'
import { useSelector } from 'react-redux'
import CreateBoardModal from '../ui/create-board-modal/CreateBoardModal'
import CreateTaskModal from '../ui/create-task-modal/CreateTaskModal'
import Modal from '../ui/modal/Modal'

const Header = () => {
  const [isModalTask, setIsModalTask] = useState(false)
  const [isModalBoard, setIsModalBoard] = useState(false)
  const [boardType, setBoardType] = useState('add')

  const { boards } = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive)

  const closeModalTask = () => {
    setIsModalTask(false)
  }

  const closeModalBoard = () => {
    setIsModalBoard(false)
  }
  return (
    <>
      <section className="p-4 fixed left-0 z-20 bg-primary h-18 right-0 border border-b border-black">
        <div className="justify-between flex items-center">
          <div className="justify-between flex items-center gap-2">
            <BsLightningChargeFill
              size={40}
              className="bg-secondary p-2 rounded-xl hover:scale-110 duration-200"
              color="white"
            />
            <h1 className="text-2xl font-bold text-white hover:text-secondary duration-200 cursor-pointer">
              Taskanban
            </h1>
          </div>

          <h3 className="text-xl font-bold text-secondary bg-secondaryLight py-2 px-4 rounded-xl bg-opacity-20">
            {board.name}
          </h3>

          <div>
            {board.columns.length ? (
              <button
                onClick={() => setIsModalTask(true)}
                className="px-6 py-2 text-white font-bold bg-secondary rounded-xl flex items-center gap-2 shadow-md  text-center"
              >
                New Task <HiMiniPlus size={25} color="white" />
              </button>
            ) : (
              <button
                onClick={() => setIsModalBoard(true)}
                className="px-6 py-2 text-white font-bold bg-secondary rounded-xl flex items-center gap-2 shadow-md  text-center"
              >
                Add Column <HiMiniPlus size={25} color="white" />
              </button>
            )}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalTask} closeModal={() => setIsModalTask(false)}>
        <CreateTaskModal type={boardType} />
      </Modal>

      <Modal isOpen={isModalBoard} closeModal={() => setIsModalBoard(false)}>
        <CreateBoardModal closeModal={() => setIsModalBoard(false)} type="edit" />
      </Modal>
    </>
  )
}

export default Header
