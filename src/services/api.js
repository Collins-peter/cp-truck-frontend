import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Enable sending cookies with requests
});

// API SERVICE FUNCTION
export const authService = {
    // NEW USER REGISTRATION
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return {
                success: true,
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed',
                status: error.response?.status || 500
            };
        }
    },

    // LOGIN USER
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            return {
                success: true,
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed',
                status: error.response?.status || 500
            };
        }
    },

    // Logout user (placeholder for future implementation)
    logout: async () => {
        try {
            const response = await api.post('/logout');
            return {
                success: true,
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: 'Logout failed',
                status: 500
            };
        }
    },

    // Call protected route to verify authentication
    checkAuth: async () => {
        try {
            const response = await api.get('/protected');
            return {
                success: true,
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Unauthorized',
                status: error.response?.status || 401
            };
        }
    },

    // Upload image
    uploadImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await api.post('/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return {
                success: true,
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Upload failed',
                status: error.response?.status || 500
            };
        }
    },

    trackingPackage: async(trackingNumber) => {
        try{
            const response = await api.get(`/api/track-package/${trackingNumber}`);
            return {
                success: true,
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return{
                success: false,
                error: error.response?.data?.message || 'Fetching data failed!',
                status: error.response?.status || 500
            }
        }
    },

    //***************GENERATING TRACKING ID*************************
    createPackage: async(packageInfo) => {
        try {
            const response = await api.post("/admin/create-tracker", packageInfo);
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500
            }
        }
    },

    trackPackage: async(trackId) => {
        try {
            const response = await api.get(`/admin/track-package/${trackId}`);
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "error occurred",
                status: error.response?.status || 500
            }
        }
    },

    updateStatus: async(trackingId, status) => {
        try {
            const response = await api.put("/admin/update-status", { trackingId, status });
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500
            }
        }
    }
};

// Export the axios instance for direct use if needed
export default api;
