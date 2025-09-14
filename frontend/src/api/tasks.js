import apiClient from "./client";

/**
 * Get today's tasks
 */
export const fetchTodayTasks = async () => {
  const response = await apiClient.get("/tasks/today/");
  return response.data;
};

/**
 * Get this week's tasks
 */
export const fetchWeeklyTasks = async () => {
  const response = await apiClient.get("/tasks/weekly/");
  return response.data;
};

/**
 * Add a new task
 */
export const addTask = async (taskData) => {
  const response = await apiClient.post("/tasks/", taskData);
  return response.data;
};

/**
 * Update an existing task
 */
export const updateTask = async (id, updates) => {
  const response = await apiClient.put(`/tasks/${id}/`, updates);
  return response.data;
};

/**
 * Delete a task
 */
export const deleteTask = async (id) => {
  const response = await apiClient.delete(`/tasks/${id}/`);
  return response.data;
};
