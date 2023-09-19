import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiMiniPlus } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { useActions } from '../../../../hooks/useActions'
import { boardsSlice } from '../../../store/board/board.slice'

const CreateBoardModal = ({ type, closeModal }) => {
  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(true)

  const [newColumns, setNewColumns] = useState([
    { name: 'Todo', tasks: [], id: v4() },
    { name: 'Doing', tasks: [], id: v4() },
  ])
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const { boards } = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive)

  const dispatch = useDispatch()
  const { addBoard, editBoard } = useActions()

  const handlerColumn = (id, newValue) => {
    setNewColumns((state) =>
      state.map((column) => (column.id === id ? { ...column, name: newValue } : column)),
    )
  }

  if (type === 'edit' && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: v4() }
      }),
    )
    setName(board.name)
    setIsFirstLoad(false)
  }

  const validateColumn = () => {
    const isValid = !!(name.trim() && newColumns.every((col) => col.name.trim()))
    setIsValid(isValid)
    return isValid
  }

  const onSubmit = (type) => {
    if (type === 'add') {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }))
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }))
    }
  }

  const deleteColumn = (id) => {
    setNewColumns((state) => state.filter((elem) => elem.id !== id))
  }

  return (
    <div>
      <div className="mb-9">
        <h2 className="text-white mb-7 text-xl"> {type === 'edit' ? 'Edit' : 'Add New'} Board</h2>
        <h2 className="text-white my-2">Board name</h2>
        <input
          placeholder="e. g. Web Design"
          className="bg-primaryLight p-2 border border-primary rounded-xl text-white w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-white my-2">Board Columns</h2>
        {newColumns.map((column, index) => (
          <div key={column.id} className="flex items-center mb-3 gap-5 mx-4">
            <input
              placeholder=""
              className="bg-primaryLight p-2 border border-primary rounded-xl  text-white w-full"
              value={column.name}
              onChange={(e) => handlerColumn(column.id, e.target.value)}
            />
            <span onClick={() => deleteColumn(column.id)}>
              <AiOutlineClose color="white" size={20} />
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center text-lg mt-4">
        <button
          className="flex gap-2 font-semibold items-center bg-white shadow shadow-white justify-center w-full py-2 rounded-2xl"
          onClick={() => setNewColumns((state) => [...state, { name: '', tasks: [], id: v4() }])}
        >
          <HiMiniPlus size={20} /> Add New Column
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center text-lg mt-6">
        <button
          onClick={() => {
            const isValid = validateColumn()
            if (isValid === true) onSubmit(type)
            closeModal()
          }}
          className="flex gap-2 font-semibold items-center text-white bg-secondary shadow shadow-secondary justify-center w-full py-2 rounded-2xl"
        >
          {type === 'add' ? 'Create New Board' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default CreateBoardModal
