import React, { useState, useEffect } from "react";
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";
import { BASE_URL } from "../utils/config";
import AdminLayout from "../components/Admin/AdminLayout";
import "./admin.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/bookings`, {
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        setBookings(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Open delete confirmation modal
  const toggleDelete = (booking) => {
    setSelectedBooking(booking);
    setDeleteModal(!deleteModal);
  };

  // Delete booking
  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${selectedBooking._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking deleted successfully!");
        toggleDelete(null);
        fetchBookings();
      } else {
        alert(result.message || "Failed to delete booking");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking");
    }
  };

  return (
    <AdminLayout>
      <Container fluid>
        <h1>Bookings Management</h1>

        {loading ? (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="admin-table-container">
            {bookings.length === 0 ? (
              <div className="text-center p-5">
                <p>No bookings found.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Email</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th>Trek Name</th>
                      <th>Guests</th>
                      <th>Booking Date</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={booking._id}>
                        <td>{index + 1}</td>
                        <td>{booking.userEmail || "-"}</td>
                        <td>{booking.fullName || "-"}</td>
                        <td>{booking.phone || "-"}</td>
                        <td>{booking.trekName || "-"}</td>
                        <td>{booking.guestSize || "-"}</td>
                        <td>
                          {booking.bookAt
                            ? new Date(booking.bookAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </td>
                        <td>
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </td>
                        <td>
                          <Button color="danger" size="sm" onClick={() => toggleDelete(booking)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModal} toggle={() => toggleDelete(null)}>
          <ModalHeader toggle={() => toggleDelete(null)}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the booking for "{selectedBooking?.trekName}" by {selectedBooking?.fullName}? This action cannot be undone.
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

export default AdminBookings;

