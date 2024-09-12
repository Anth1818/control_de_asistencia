const configApi = {
    apiBaseUrl: 'http://localhost:3000',
    endpoints: {
        searchWorkerById: '/attendance',
        getAttendance: '/attendance',
        getAttendanceByfilter: '/attendance/filter/pag/',
        login: '/auth/login',
    }}

export default configApi;