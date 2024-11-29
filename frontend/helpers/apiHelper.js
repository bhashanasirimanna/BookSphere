import axios from "axios";

class ApiHelper {
  constructor() {
    this.baseUrl = "http://localhost:5000";
  }

  // General GET request
  async get(endpoint, queryParams = {}) {
    try {
      // Remove the need for token; allow cookies to handle authentication
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        params: queryParams,
        withCredentials: true, // Ensures cookies are sent with the request
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // General POST request
  async post(endpoint, data) {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data, {
        withCredentials: true, // Include cookies in the request
      });

      // If the response contains userID, store it in localStorage
      if (response.data.userID) {
        localStorage.setItem("userId", response.data.userID);
      }

      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // General PUT request
  async put(endpoint, data, token) {
    try {
      const headers = this._getHeaders(token);
      const response = await axios.put(`${this.baseUrl}/${endpoint}`, data, {
        headers,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // General DELETE request
  async delete(endpoint, token) {
    try {
      const headers = this._getHeaders(token);
      const response = await axios.delete(`${this.baseUrl}/${endpoint}`, {
        headers,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // Private method to get headers
  _getHeaders(token) {
    const headers = {
      "Content-Type": "application/json",
      // Add other default headers if necessary
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  // Error handling
  handleAxiosError(error) {
    let errorMessage;

    if (error.response) {
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        errorMessage = error.response.data.errors.map((e) => e.msg).join(", ");
      } else {
        errorMessage = error.response.data.message || "An error occurred";
      }
      throw new Error(`${errorMessage}`);
    } else if (error.request) {
      errorMessage = "No response received from the server";
      throw new Error(errorMessage);
    } else {
      errorMessage = `Error setting up the request: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
}

export default ApiHelper;
