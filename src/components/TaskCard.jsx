const TaskCard = ({
  task,
  deleteSelection,
  deleteTaskList,
  addTaskDeleteList,
  onClick,
}) => {
  return (
    <div
      className="bg-slate-600 p-4 rounded-lg text-white shadow-md cursor-pointer hover:scale-105 transition delay-50 duration-300 ease-in-out relative"
      onClick={onClick}
    >
      {/* Checkbox fijo arriba derecha */}
      {deleteSelection && (
        <input
          type="checkbox"
          checked={deleteTaskList.includes(task.title)}
          onChange={() => addTaskDeleteList(task.title)}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 left-2"
        />
      )}

      {/* Contenido en columna con prioridad al fondo */}
      <div className="flex flex-col h-full">
        <h1 className="text-bold text-2xl max-w-full truncate">{task.title}</h1>

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

        {/* Span con prioridad al fondo */}
        <span
          className={`inline-block mt-auto px-3 py-1 rounded-full text-sm font-semibold w-1/2
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
