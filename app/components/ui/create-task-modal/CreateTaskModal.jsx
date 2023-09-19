'use client'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiMiniPlus } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { boardsSlice } from '../../../store/board/board.slice'

const CreateTaskModal = ({ type = 'add', prevColIndex = 0, taskIndex }) => {
  const dispatch = useDispatch()
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isValid, setIsValid] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const board = useSelector((state) => state.boards.boards).find((board) => board.isActive)

  const columns = board.columns
  const col = columns.find((col, index) => index === prevColIndex)
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : []
  const [status, setStatus] = useState(columns[prevColIndex].name)
  const [newColIndex, setNewColIndex] = useState(prevColIndex)
  const [subtasks, setSubtasks] = useState([
    { title: '', isCompleted: false, id: v4() },
    { title: '', isCompleted: false, id: v4() },
  ])

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState]
      const subtask = newState.find((subtask) => subtask.id === id)
      subtask.title = newValue
      return newState
    })
  }

  const onChangeStatus = (e) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  const validate = () => {
    setIsValid(false)
    if (!title.trim()) {
      return false
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false
      }
    }
    setIsValid(true)
    return true
  }

  if (type === 'edit' && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: v4() }
      }),
    )
    setTitle(task.title)
    setDescription(task.description)
    setIsFirstLoad(false)
  }

  const onSubmit = (type) => {
    if (type === 'add') {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        }),
      )
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        }),
      )
    }
  }

  const deleteSubtasks = (id) => {
    setSubtasks((state) => state.filter((subtask) => subtask.id !== id))
  }
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-white mb-7 text-xl"> {type === 'edit' ? 'Edit' : 'Add New'} Task</h2>
        <h2 className="text-white my-2">Task name</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e. g. Web Design"
          className="bg-primaryLight p-2 border border-primary rounded-xl text-white w-full"
        />
        <h2 className="text-white my-2">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e. g. its always good to take a break. This 15 minute break will rechange the batteries a little"
          className="bg-primaryLight resize-none h-24 p-2 border border-primary rounded-xl text-white w-full"
        />
      </div>

      <div>
        <h2 className="text-white my-2">Subtasks</h2>
        {subtasks.map((subtask, index) => (
          <div key={subtask.id} className="flex items-center mb-3 gap-5 mx-4">
            <input
              placeholder="e. g. Take a coffee break"
              className="bg-primaryLight p-2 border border-primary rounded-xl  text-white w-full"
              value={subtask.title}
              onChange={(e) => onChangeSubtasks(subtask.id, e.target.value)}
            />
            <span onClick={() => deleteSubtasks(subtask.id)}>
              <AiOutlineClose color="white" size={20} />
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center text-lg mt-4">
        <button
          className="flex gap-2 font-semibold items-center bg-white shadow shadow-white justify-center w-full py-2 rounded-2xl"
          onClick={() =>
            setSubtasks((state) => [...state, { title: '', isCompleted: false, id: v4() }])
          }
        >
          <HiMiniPlus size={20} /> Add New Column
        </button>
      </div>

      <div className="flex flex-col space-y-3 my-4 text-white">
        <label>Current status</label>
        <select
          value={status}
          onChange={onChangeStatus}
          className="bg-primaryLight p-3 border border-primary rounded-xl"
        >
          {columns?.map((column, index) => (
            <option style={{ fontFamily: ' Arial' }} value={column.name} key={index}>
              {column.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center items-center text-lg mt-6">
        <button
          onClick={() => {
            const isValid = validate()
            if (isValid) {
              onSubmit(type)
            }
          }}
          className="flex gap-2 font-semibold items-center text-white bg-secondary shadow shadow-secondary justify-center w-full py-2 rounded-2xl"
        >
          {type === 'edit' ? 'Save Edit' : 'Create Task'}
        </button>
      </div>
    </div>
  )
}

export default CreateTaskModal
