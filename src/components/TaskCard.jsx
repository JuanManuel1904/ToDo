const TaskCard = ({
  task,
  deleteSelection,
  deleteTaskList,
  addTaskDeleteList,
  onClick,
}) => {
  return (
    <div
      className="bg-slate-600 p-4 rounded-lg text-white shadow-md cursor-pointer 
                 hover:scale-105 transition duration-300 ease-in-out 
                 relative w-full min-h-[8rem] flex flex-col"
      onClick={onClick}
    >
      {deleteSelection && (
        <input
          type="checkbox"
          checked={deleteTaskList.includes(task.title)}
          onChange={() => addTaskDeleteList(task.title)}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 left-3 w-4 h-4 sm:w-5 sm:h-5"
        />
      )}

      <div
        className={`flex flex-col h-full gap-2 ${
          deleteSelection ? 'pl-6 sm:pl-8' : ''
        }`}
      >
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl truncate">
          {task.title}
        </h1>
        <p className="break-words line-clamp-2 text-sm sm:text-base">
          {task.description}
        </p>
        <span
          className={`mt-auto self-end px-3 py-1 rounded-full text-xs sm:text-sm font-semibold 
                      w-full sm:w-1/2 text-center
                      ${
                        task.priority === 'Urgente'
                          ? 'bg-rose-500/90'
                          : task.priority === 'Importante'
                            ? 'bg-orange-500/90'
                            : 'bg-green-500/90'
                      }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
