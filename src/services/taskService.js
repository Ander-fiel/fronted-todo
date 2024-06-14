import api from "../config";

class TaskService {
  addTask = async (data) => {
    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const response = await api.post("/task", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  updateTask = async (data, id) => {
    try {
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const response = await api.put(`/task/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  getTask = async (id) => {
    try {
      const response = await api.get(`/task/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  fetchTasks = async () => {
    try {
      const response = await api.get("/task");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  deleteTask = async (id) => {
    try {
      const response = await api.delete(`/task/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };
}

export default new TaskService();
