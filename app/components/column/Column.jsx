import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardsSlice } from '../../store/board/board.slice'
import Task from '../Task/Task'
const Column = ({ colIndex }) => {
  const colors = [
    'bg-[#9b60f7]',
    'bg-[#7e4ccf]',
    'bg-[#905fdf]',
    'bg-[#8649e7]',
    'bg-[#7137cf]',
    'bg-[#865dc7]',
  ]

  const dispatch = useDispatch()
  const [color, setColor] = useState(null)
  const { boards } = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)

  const col = board.columns.find((col, i) => i === colIndex)
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch])

  const handleDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData('text'))

    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }))
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
  }

  return (
    <div onDrop={handleDrop} onDragOver={handleDrag} className="mx-5 pt-[120px] min-w-[280px] ">
      <div className=" font-semibold flex items-center  gap-2 text-white">
        <div className={`rounded-full w-4 h-4 ${color} `} />
        {col.name} [{col.tasks.length}]
      </div>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  )
}

export default Column
