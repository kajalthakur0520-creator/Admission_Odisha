// Central API configuration
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/index.php';
const ASSETS_BASE = API_BASE ? API_BASE.replace('/index.php', '') : '';

export { API_BASE, ASSETS_BASE };
export default API_BASE;
