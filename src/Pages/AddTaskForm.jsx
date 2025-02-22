import { useContext, useState } from "react";
import { AuthContext } from "../AuthPovider/AuthPovider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddTaskForm() {
   const {user}=useContext(AuthContext) 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [error, setError] = useState("");
  const navigate =useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (title.trim() === "") {
      setError("Title is required");
      return;
    }
    if (title.length > 50) {
        setError("Title must be at most 50 characters");
        return;
      }
      if (description.length > 200) {
        setError("Description must be at most 200 characters");
        return;
      }
      setError("");


    const newTask = {
      title,
      description,
      category,
      userEmail:user?.email,
      userName:user?.displayName
    };
    const {data}=await axios.post('http://localhost:5000/tasks',newTask)
    console.log(data);
    if(data.insertedId){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Task Added Successfully',
    })
    }

    console.log("Task Added:", newTask);
    setTitle("");
    setDescription("");
    setCategory("To-Do");
    setError("");
    navigate('/manage-task')

  };

  return (
    <div className="  flex justify-center items-center min-h-[calc(100vh-65px)] bg-gray-100 p-4"  style={{
        backgroundImage: "url(https://i.ibb.co.com/9HjBPD0z/34544.jpg)",backgroundPosition: "center",backgroundSize: "cover",
      }}>
       <div className="w-full max-w-md shadow-lg p-6 bg-white rounded-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 50))} maxLength={50} placeholder="Enter task title" className="mt-1 w-full p-2 border rounded" />
            <p className="text-sm text-gray-500">{title.length}/50</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, 200))} maxLength={200} placeholder="Enter task description (optional)" className="mt-1 w-full p-2 border rounded" />
            <p className="text-sm text-gray-500">{description.length}/200</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full p-2 border rounded">
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">Add Task</button>
        </form>
      </div>
    </div>
  );
}
