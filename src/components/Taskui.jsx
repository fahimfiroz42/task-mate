

const Taskui = () => {
    const tasks = [
        { id: 1, title: "Learn React", status: "To-Do" },
        { id: 2, title: "Build a project", status: "In Progress" },
        { id: 3, title: "Deploy the app", status: "Done" },
        { id: 4, title: "Learn Node.js", status: "To-Do" },
        { id: 5, title: "Connect database", status: "In Progress" },
        { id: 6, title: "Write documentation", status: "Done" },
      ];
    
      const columns = ["To-Do", "In Progress", "Done"];

    return  (
        <div className="grid grid-cols-3 gap-4 p-4">
          {columns.map((column) => (
            <div key={column} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{column}</h2>
              <div className="space-y-2">
                {tasks
                  .filter((task) => task.status === column)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-2 bg-white rounded-lg shadow-sm border flex justify-between items-center"
                    >
                      <span>{task.title}</span>
                      <div className="space-x-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      );
};

export default Taskui;