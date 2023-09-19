'use client'

const Menu = ({ type, setOpenEditModal, setOpenDeleteModal }) => {
  return (
    <div className=" absolute  bottom-40  left-9">
      <div className=" w-40 text-sm z-50 font-medium shadow-md bg-primaryLight space-y-4 py-5 px-4 rounded-lg h-auto">
        <p
          onClick={() => {
            setOpenEditModal()
          }}
          className=" cursor-pointer dark:text-gray-400 text-white"
        >
          Edit {type}
        </p>

        <p onClick={() => setOpenDeleteModal()} className=" cursor-pointer text-red-500">
          Delete {type}
        </p>
      </div>
    </div>
  )
}

export default Menu
