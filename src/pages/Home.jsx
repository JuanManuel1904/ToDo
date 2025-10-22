import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import Button from '../components/Button';
import TaskCard from '../components/TaskCard';
import TaskInformation from '../components/TaskInformation';
const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [deleteSelection, setDeleteSelection] = useState(false);
  const [deleteTaskList, setDeleteTaskList] = useState([]);

  const [storageLoaded, setStorageLoaded] = useState(false);

  const [popUp, setPopUp] = useState(false);
  const [infoModal, setInfoModal] = useState(null);

  const toggleForm = () => setShowForm(!showForm);
  const toggleDeleteSelection = () => setDeleteSelection(!deleteSelection);

  const addTaskDeleteList = (title) => {
    if (deleteTaskList.includes(title)) {
      setDeleteTaskList(deleteTaskList.filter((task) => task !== title));
    } else {
      setDeleteTaskList([...deleteTaskList, title]);
    }
  };

  const individualDelete = () => {
    setTaskList(taskList.filter((task) => task.id !== infoModal.id));
    setInfoModal(null);
    setPopUp(false);
  };

  const multipleDelete = () => {
    setTaskList(taskList.filter((task) => !deleteTaskList.includes(task.id)));
    setDeleteTaskList([]);
    toggleDeleteSelection();
  };

  const addTask = (newtask) => {
    setTaskList([...taskList, newtask]);
  };

  const updateTask = (updated) => {
    setTaskList(
      taskList.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTaskList(parsedTasks);
        }
      }
    } catch (error) {
      console.error('Error', error);
      localStorage.removeItem('tasks');
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!storageLoaded) return;
    try {
      localStorage.setItem('tasks', JSON.stringify(taskList));
    } catch (error) {
      console.error('Error', error);
    }
  }, [taskList, storageLoaded]);

  return (
    <div className="main-container bg-slate-800 min-h-screen flex flex-col px-4 sm:px-8 lg:px-12">
      {popUp && (
        <TaskInformation
          task={infoModal}
          onDelete={individualDelete}
          onClose={() => {
            setPopUp(false);
            setInfoModal(null);
          }}
          onSave={updateTask}
        />
      )}

      <header className="text-center mt-8">
        <h1 className="text-gray-400 text-4xl sm:text-6xl lg:text-8xl font-semibold font-sans text-shadow-lg text-shadow-gray-800">
          Do It
        </h1>
        <h2 className="text-gray-200 text-base sm:text-lg">
          We remember for you
        </h2>
      </header>

      <div
        className={`${popUp ? 'blur-lg opacity-50' : ''} flex flex-col flex-grow`}
      >
        {/* Botones */}
        <div className="gap-4 min-h-16 my-4">
          {!showForm &&
            (deleteSelection ? (
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 text-2xl font-bold text-white">
                <Button
                  color="blue"
                  className="w-full sm:w-32"
                  text="Completar"
                  onClick={multipleDelete}
                />
                <Button
                  color="rose"
                  className="w-full sm:w-auto"
                  text="Cancelar"
                  onClick={() => {
                    toggleDeleteSelection();
                    setDeleteTaskList([]);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 text-2xl font-bold text-white">
                <Button
                  color="green"
                  className="w-full sm:w-auto"
                  text="Agregar"
                  onClick={toggleForm}
                />
                <Button
                  color="blue"
                  className="w-full sm:w-auto"
                  text="Completar"
                  onClick={() => {
                    toggleDeleteSelection();
                    setDeleteTaskList([]);
                  }}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col lg:flex-row flex-grow gap-4">
          <main className="w-full mx-auto space-y-6 py-4">
            <section className="bg-slate-700 p-4 sm:p-6 rounded-lg shadow-md h-full w-full">
              {taskList.length === 0 ? (
                <p className="text-center text-gray-400">
                  No tienes tareas aún
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 text-white">
                  {taskList.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      deleteSelection={deleteSelection}
                      deleteTaskList={deleteTaskList}
                      addTaskDeleteList={addTaskDeleteList}
                      onSave={() => updateTask(updated)}
                      onClick={() => {
                        setInfoModal(task);
                        setPopUp(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>

          {showForm && (
            <>
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 lg:hidden">
                <div className="bg-slate-800 rounded-lg p-4 w-full max-w-md">
                  <TaskForm toggleForm={toggleForm} addTask={addTask} />
                </div>
              </div>

              <div className="hidden lg:block w-full lg:w-1/3 py-4">
                <TaskForm toggleForm={toggleForm} addTask={addTask} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
