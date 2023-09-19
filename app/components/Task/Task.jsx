'use client'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { boardsSlice } from '../../store/board/board.slice'
import Subtask from '../Subtask/Subtask'
import DeleteModal from '../ui/delete-modal/DeleteModal'
import Modal from '../ui/modal/Modal'
const Task = ({ colIndex, taskIndex }) => {
  const { boards } = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)
  const columns = board.columns

  const dispatch = useDispatch()

  const col = columns.find((col, i) => i === colIndex)
  const task = col.tasks.find((task, i) => i === taskIndex)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  let completed = 0
  let subtasks = task.subtasks
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++
    }
  })

  const handleOnDrag = (e) => {
    e.dataTransfer.setData('text', JSON.stringify({ taskIndex, prevColIndex: colIndex }))
  }

  const onDelete = () => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }))
    setIsOpenMenu(false)
    setIsTaskModalOpen(false)
  }

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true)
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-xl bg-primaryLight py-5 px-4 shadow-lg text-white cursor-pointer "
      >
        <div onClick={() => setIsOpenMenu(true)} className="absolute ml-60 -mt-4">
          <BsThreeDots color="white" size={18} />
        </div>

        <Modal isOpen={isOpenMenu} closeModal={() => setIsOpenMenu(false)}>
          <DeleteModal
            closeModal={() => setIsOpenMenu(false)}
            type="task"
            title={task.title}
            onDelete={onDelete}
          />
        </Modal>

        <p className=" font-bold tracking-wide hover:text-secondary duration-300">{task.title}</p>
        <p className=" font-semibold text-xs tracking-tight mt-2 text-gray-500 hover:text-secondary duration-200">
          {completed} of {subtasks.length} completed
        </p>
        <div className=" mt-2 space-y-1.5 ">
          {subtasks.map((subt, index) => (
            <Subtask index={index} taskIndex={taskIndex} colIndex={colIndex} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
