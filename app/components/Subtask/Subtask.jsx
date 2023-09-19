'use client'
import { useDispatch, useSelector } from 'react-redux'
import { boardsSlice } from '../../store/board/board.slice'

const Subtask = ({ index, taskIndex, colIndex }) => {
  const dispatch = useDispatch()
  const { boards } = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)
  const col = board.columns.find((col, i) => i === colIndex)
  const task = col.tasks.find((task, i) => i === taskIndex)
  const subtask = task.subtasks.find((subtask, i) => i === index)
  const checked = subtask.isCompleted

  const onChange = (e) => {
    dispatch(boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex }))
  }

  return (
    <div
      onClick={onChange}
      className="w-full text-sm flex rounded-xl items-center justify-start p-2.5 gap-4  bg-primary hover:bg-[#2e2e2e] duration-200"
    >
      <input
        className=" w-4 outline-none focus:outline-none border-none h-5 accent-[#444444] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={() => onChange}
      />
      <p className={checked && ' line-through opacity-30 '}>{subtask.title}</p>
    </div>
  )
}

export default Subtask
