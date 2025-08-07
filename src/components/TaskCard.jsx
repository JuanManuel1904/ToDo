const TaskCard = ({
  task,
  deleteSelection,
  deleteTaskList,
  addTaskDeleteList,
  onClick,
}) => {
  return (
    <div
      className="bg-slate-600 p-4 rounded-lg text-white shadow-md cursor-pointer hover:scale-105 transition delay-50 duration-300 ease-in-out"
      onClick={onClick}
    >
      {deleteSelection && (
        <input
          type="checkbox"
          checked={deleteTaskList.includes(task.title)}
          onChange={() => addTaskDeleteList(task.title)}
        />
      )}
      <h1 className="text-bold text-2xl max-w-full truncate cursor-pointer">
        {task.title}
      </h1>
      <p
        className="break-words"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {task.description}
      </p>
      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
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
  );
};

export default TaskCard;
