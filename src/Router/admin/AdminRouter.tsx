import { Route } from "react-router-dom";
import Dashboard from "../../features/admin/pages/Dashboard";

const AdminRouter =(
   < Route path="/admin/dashboard" element={<Dashboard/>} />
)
export default AdminRouter