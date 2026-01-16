import React, { useState, useEffect } from "react";
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { BASE_URL } from "../utils/config";
import AdminLayout from "../components/Admin/AdminLayout";
import "./admin.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/users`, {
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        setUsers(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open edit modal
  const toggleEdit = (user) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "user",
      });
    }
    setEditModal(!editModal);
  };

  // Open delete confirmation modal
  const toggleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModal(!deleteModal);
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("User updated successfully!");
        toggleEdit(null);
        fetchUsers();
      } else {
        alert(result.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${selectedUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (result.success) {
        alert("User deleted successfully!");
        toggleDelete(null);
        fetchUsers();
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <AdminLayout>
      <Container fluid>
        <h1>Users Management</h1>

        {loading ? (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="admin-table-container">
            {users.length === 0 ? (
              <div className="text-center p-5">
                <p>No users found.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: user.role === "admin" ? "#4c5ab7" : "#6c757d",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          {user.role?.toUpperCase() || "USER"}
                        </span>
                      </td>
                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button color="success" size="sm" onClick={() => toggleEdit(user)}>
                            Edit
                          </Button>
                          <Button color="danger" size="sm" onClick={() => toggleDelete(user)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Edit Modal */}
        <Modal isOpen={editModal} toggle={() => toggleEdit(null)}>
          <ModalHeader toggle={() => toggleEdit(null)}>Edit User</ModalHeader>
          <Form onSubmit={handleUpdate}>
            <ModalBody>
              <FormGroup>
                <Label>Username *</Label>
                <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Email *</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Role *</Label>
                <Input type="select" name="role" value={formData.role} onChange={handleChange} required>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Input>
              </FormGroup>
              <div className="alert alert-info mt-3">
                <small>Note: Password cannot be changed through this form. User must reset their password through the profile page.</small>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => toggleEdit(null)}>
                Cancel
              </Button>
              <Button className="primary__btn" type="submit" style={{ background: 'var(--secondary-color)', border: 'none', color: '#fff' }}>
                Update User
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModal} toggle={() => toggleDelete(null)}>
          <ModalHeader toggle={() => toggleDelete(null)}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the user "{selectedUser?.username}" ({selectedUser?.email})? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggleDelete(null)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </AdminLayout>
  );
};

export default AdminUsers;

