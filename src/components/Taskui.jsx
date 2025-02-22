import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthPovider/AuthPovider";
import Loading from "./Loader";
import { Delete, Edit } from "lucide-react";
import Swal from "sweetalert2";
import moment from "moment"; 
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Dialog } from "@headlessui/react"; // Headless UI modal

const Taskui = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { data: fetchedTasks, isLoading, refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios.get(`https://task-mate-server-alpha.vercel.app/tasks?email=${user.email}`);
      setTasks(data);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`https://task-mate-server-alpha.vercel.app/tasks/${id}`);
    if (data.deletedCount > 0) {
      Swal.fire("Deleted!", "Your task has been deleted.");
      refetch();
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const destinationCategory = result.destination.droppableId;
    const movedTask = tasks.find((task) => task._id === result.draggableId);

    if (movedTask) {
      movedTask.category = destinationCategory;
      setTasks([...tasks]);

      try {
        await axios.patch(`https://task-mate-server-alpha.vercel.app/tasks/${movedTask._id}`, {
          category: destinationCategory,
        });
        refetch();
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const updatedTitle = e.target.title.value;
    const updatedDescription = e.target.description.value;
    const updatedCategory = e.target.category.value; // Get selected category

    try {
      await axios.put(`https://task-mate-server-alpha.vercel.app/tasks/${selectedTask._id}`, {
        title: updatedTitle,
        description: updatedDescription,
        category: updatedCategory, // Send new category to backend
      });
     

      setIsOpen(false);
      refetch();
      Swal.fire("Updated!", "Your task has been updated.", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire("Error", "Failed to update task.", "error");
    }
  };

  const columns = ["To-Do", "In Progress", "Done"];

  return (
    <div className="container mx-auto min-h-[calc(100vh-65px)]">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {columns.map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold mb-4">{column}</h2>
                  <div className="space-y-2">
                    {tasks
                      .filter((task) => task.category === column)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-3 bg-white rounded-lg shadow-sm border border-gray-300 space-y-2"
        >
          {/* Task Title & Actions */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{task.title}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => openEditModal(task)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-2 py-1 bg-red-300 text-white rounded hover:bg-red-400 hover:text-red-700"
              >
                <Delete className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>

          {/* Task Description */}
          <p className="text-gray-600">{task.description || "No description provided."}</p>

          {/* Category & Timestamp */}
          <div className="flex justify-between text-sm text-gray-500">
            <span className="bg-gray-200 px-2 py-1 rounded">{task.category}</span>
            <span>{moment(task.timestamp).format("MMM D, YYYY h:mm A")}</span>
          </div>
        </div>
      )}
    </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Edit Task Modal */}
      {isOpen && selectedTask && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleUpdateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedTask.title}
                  maxLength={50}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedTask.description}
                  maxLength={200}
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  defaultValue={selectedTask.category}
                  className="w-full p-2 border rounded"
                >
                  {columns.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Taskui;
