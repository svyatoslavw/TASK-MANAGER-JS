'use client'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { HiMiniPlus } from 'react-icons/hi2'
import { RiMenu2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { boardsSlice } from '../../store/board/board.slice'
import Menu from '../menu/Menu'
import CreateBoardModal from '../ui/create-board-modal/CreateBoardModal'
import DeleteBoardModal from '../ui/delete-modal/DeleteModal'
import Modal from '../ui/modal/Modal'

const Navbar = ({ setIsBoardModalOpen, isBoardModalOpen }) => {
  const dispatch = useDispatch()
  const { boards } = useSelector((state) => state.boards)
  const [isModalAdd, setIsModalAdd] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const board = boards.find((board) => board.isActive)

  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const setOpenEditModal = () => {
    setIsModalEdit(true)
    setIsOpenMenu(false)
  }
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsOpenMenu(false)
  }

  const onDelete = (e) => {
    if (e.target.textContent === 'Delete') {
      dispatch(boardsSlice.actions.deleteBoard())
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }))
      setIsDeleteModalOpen(false)
    } else {
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <div className="fixed left-0 flex z-10 flex-col items-center top-[75px] px-5 py-8 h-full  border-r border-black">
      <p className="text-white mb-3 font-semibold opacity-70">Boards [{boards.length}]</p>
      {boards.map((board, index) => (
        <div
          key={board.name}
          className={`bg-[#333333] hover:bg-[#414141] duration-300 cursor-pointer py-3 mb-5 px-3.5  rounded-xl ${
            board.isActive && 'bg-secondary hover:bg-secondaryLight'
          }`}
          onClick={() => {
            dispatch(boardsSlice.actions.setBoardActive({ index }))
          }}
        >
          <RiMenu2Line color="white" size={22} />
        </div>
      ))}

      <div
        onClick={() => setIsModalAdd(true)}
        className="bg-[#333333] hover:bg-[#414141]  duration-300 cursor-pointer py-3 px-3.5 rounded-xl"
      >
        <HiMiniPlus color="white" size={22} />
      </div>

      <div
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="bg-[#333333] hover:bg-[#414141] absolute bottom-24  duration-300 cursor-pointer py-3 mt-4 px-3.5 rounded-xl"
      >
        <BsThreeDots color="white" size={22} />
      </div>

      {isOpenMenu && (
        <Menu
          type="Boards"
          setOpenEditModal={setOpenEditModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      <Modal isOpen={isDeleteModalOpen} closeModal={() => setIsDeleteModalOpen(false)}>
        <DeleteBoardModal
          closeModal={() => setIsDeleteModalOpen(false)}
          type="board"
          title={board.name}
          onDelete={onDelete}
        />
      </Modal>

      <Modal isOpen={isModalAdd} closeModal={() => setIsModalAdd(false)}>
        <CreateBoardModal type="add" closeModal={() => setIsModalAdd(false)} />
      </Modal>

      <Modal isOpen={isModalEdit} closeModal={() => setIsModalEdit(false)}>
        <CreateBoardModal type="edit" closeModal={() => setIsModalEdit(false)} />
      </Modal>
    </div>
  )
}

export default Navbar
