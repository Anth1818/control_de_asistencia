const configApi = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', // Fallback value
    endpoints: {
        searchWorkerById: '/attendance',
        getAttendance: '/attendance',
        getAttendanceByfilter: '/attendance/filter/pag/',
        login: '/auth/login',
    }}

export default configApi;