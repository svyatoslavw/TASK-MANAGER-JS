'use client'

const DeleteModal = ({ type, title, onDelete, closeModal }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setIsDeleteModalOpen(false)
      }}
      className="overflow-scroll scrollbar-hide justify-center items-center flex dropdown"
    >
      <div className=" scrollbar-hide overflow-y-scroll my-auto text-white">
        <h3 className=" font-bold text-red-500 text-xl  ">Delete this {type}?</h3>
        {type === 'task' ? (
          <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the{' '}
            <span className="font-bold text-base text-red-400">"{title}"</span> task and its
            subtasks? This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 font-normal tracking-wide text-sm my-6">
            Are you sure you want to delete the{' '}
            <span className="font-bold text-base text-red-400">"{title}"</span> board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
          <button
            onClick={onDelete}
            className="w-full items-center text-white hover:opacity-75 bg-red-500 hover:bg-red-400 duration-200 py-2 rounded-full"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="w-full items-center text-white hover:bg-secondaryLight bg-secondary py-2 rounded-full duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
