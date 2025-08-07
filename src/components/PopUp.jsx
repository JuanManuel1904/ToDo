import Button from './Button';
const PopUp = ({ task, onClose, deleteTask }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-40 flex justify-center items-center z-50">
      <div
        className="bg-slate-800 p-4 rounded-lg shadow-xl shadow-slate-900 z-50 w-1/3 text-white my-10 h-3/5 grid grid-rows-3
      "
      >
        <div>
          <h1 className="text-xl font-bold mb-2">Título</h1>
          <h2 className="text-base font-base mb-2 mx-4 ">{task.title}</h2>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-2">Descripción</h1>
          <p className="text-base mb-2 mx-4 ">{task.description}</p>
        </div>
        <div className="flex justify-center self-end text-2xl font-bold gap-4 h-12 text-white">
          <Button color="blue" text="Cerrar" onClick={onClose} />
          <Button color="green" text="Editar" onClick={onClose} />
          <Button color="rose" text="Eliminar" onClick={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
