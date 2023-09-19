'use client'

const MenuTask = ({ type, setOpenDeleteModal }) => {
  return (
    <div className=" absolute z-10 left-[460px]">
      <div className="text-sm font-medium shadow bg-primary py-3 px-4 rounded-lg flex justify-center">
        <p
          onClick={() => setOpenDeleteModal()}
          className=" cursor-pointer text-red-500 hover:text-red-300 duration-200"
        >
          Delete {type}
        </p>
      </div>
    </div>
  )
}

export default MenuTask
