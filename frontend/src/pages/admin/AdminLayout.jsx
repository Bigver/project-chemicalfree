import Sidebar from "../../components/SlidebarAdmin";

const AdminLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default AdminLayout;
