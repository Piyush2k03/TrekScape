import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { BASE_URL } from "../utils/config";
import AdminLayout from "../components/Admin/AdminLayout";
import "./admin.css";

const AdminTours = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    state: "",
    address: "",
    DifLevel: "Easy",
    category: "Regular Trek",
    photo: "",
    desc: "",
    price: "",
    featured: false,
    mapLink: "",
  });

  // Fetch all treks (fetch all pages)
  const fetchTreks = async () => {
    try {
      setLoading(true);
      const allTreks = [];
      let page = 0;
      const limit = 100; // Fetch 100 at a time
      let hasMore = true;

      // Fetch all pages until we get all treks
      while (hasMore) {
        const res = await fetch(`${BASE_URL}/tours?page=${page}&limit=${limit}`, {
          credentials: "include",
        });
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          allTreks.push(...result.data);
          // If we got fewer items than the limit, we've reached the end
          if (result.data.length < limit) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }

      setTreks(allTreks);
    } catch (err) {
      console.error("Error fetching treks:", err);
      alert("Failed to load treks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Open create modal
  const toggleCreate = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        title: "",
        state: "",
        address: "",
        DifLevel: "Easy",
        category: "Regular Trek",
        photo: "",
        desc: "",
        price: "",
        featured: false,
        mapLink: "",
      });
    }
  };

  // Open edit modal
  const toggleEdit = (trek) => {
    if (trek) {
      setSelectedTrek(trek);
      setFormData({
        title: trek.title || "",
        state: trek.state || "",
        address: trek.address || "",
        DifLevel: trek.DifLevel || "Easy",
        category: trek.category || "Regular Trek",
        photo: trek.photo || "",
        desc: trek.desc || "",
        price: trek.price || "",
        featured: trek.featured || false,
        mapLink: trek.mapLink || "",
      });
    }
    setEditModal(!editModal);
  };

  // Open delete confirmation modal
  const toggleDelete = (trek) => {
    setSelectedTrek(trek);
    setDeleteModal(!deleteModal);
  };

  // Create new trek
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Trek created successfully!");
        toggleCreate();
        fetchTreks();
      } else {
        alert(result.message || "Failed to create trek");
      }
    } catch (err) {
      console.error("Error creating trek:", err);
      alert("Failed to create trek");
    }
  };

  // Update trek
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours/${selectedTrek._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Trek updated successfully!");
        toggleEdit(null);
        fetchTreks();
      } else {
        alert(result.message || "Failed to update trek");
      }
    } catch (err) {
      console.error("Error updating trek:", err);
      alert("Failed to update trek");
    }
  };

  // Delete trek
  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${selectedTrek._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (result.success) {
        alert("Trek deleted successfully!");
        toggleDelete(null);
        fetchTreks();
      } else {
        alert(result.message || "Failed to delete trek");
      }
    } catch (err) {
      console.error("Error deleting trek:", err);
      alert("Failed to delete trek");
    }
  };

  return (
    <AdminLayout>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Treks Management</h1>
          <Button className="primary__btn" onClick={toggleCreate} style={{ background: 'var(--secondary-color)', border: 'none', color: '#fff' }}>
            + Add New Trek
          </Button>
        </div>

        {loading ? (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
            <Spinner size="lg" />
          </div>
        ) : (
          <Row>
            {treks.length === 0 ? (
              <Col>
                <div className="text-center p-5">
                  <p>No treks found. Create your first trek!</p>
                </div>
              </Col>
            ) : (
              treks.map((trek) => (
                <Col key={trek._id} lg="4" md="6" className="mb-4">
                  <Card className="admin-trek-card">
                    <div className="admin-trek-image">
                      <img src={trek.photo} alt={trek.title} />
                    </div>
                    <CardBody>
                      <h5>{trek.title}</h5>
                      <p className="text-muted mb-2">
                        <strong>Location:</strong> {trek.state}, {trek.address}
                      </p>
                      <p className="text-muted mb-2">
                        <strong>Category:</strong> {trek.category} | <strong>Difficulty:</strong> {trek.DifLevel}
                      </p>
                      <p className="text-muted mb-2">
                        <strong>Price:</strong> ₹{trek.price}
                      </p>
                      <p className="text-muted mb-3">
                        <strong>Featured:</strong> {trek.featured ? "Yes" : "No"}
                      </p>
                      <div className="d-flex gap-2">
                        <Button color="success" size="sm" onClick={() => toggleEdit(trek)}>
                          Edit
                        </Button>
                        <Button color="danger" size="sm" onClick={() => toggleDelete(trek)}>
                          Delete
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}

        {/* Create Modal */}
        <Modal isOpen={modal} toggle={toggleCreate} size="lg">
          <ModalHeader toggle={toggleCreate}>Create New Trek</ModalHeader>
          <Form onSubmit={handleCreate}>
            <ModalBody>
              <FormGroup>
                <Label>Title *</Label>
                <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>State *</Label>
                    <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Address *</Label>
                    <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Category *</Label>
                    <Input type="select" name="category" value={formData.category} onChange={handleChange} required>
                      <option>Regular Trek</option>
                      <option>Fort Trek</option>
                      <option>Jungle Trek</option>
                      <option>Nature Trail</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Difficulty Level *</Label>
                    <Input type="select" name="DifLevel" value={formData.DifLevel} onChange={handleChange} required>
                      <option>Easy</option>
                      <option>Moderate</option>
                      <option>Hard</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Photo URL *</Label>
                <Input type="url" name="photo" value={formData.photo} onChange={handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Description *</Label>
                <Input type="textarea" name="desc" value={formData.desc} onChange={handleChange} rows="4" required />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Price (₹) *</Label>
                    <Input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Map Link</Label>
                    <Input type="url" name="mapLink" value={formData.mapLink} onChange={handleChange} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} /> Featured Trek
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleCreate}>
                Cancel
              </Button>
              <Button className="primary__btn" type="submit" style={{ background: 'var(--secondary-color)', border: 'none', color: '#fff' }}>
                Create Trek
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={editModal} toggle={() => toggleEdit(null)} size="lg">
          <ModalHeader toggle={() => toggleEdit(null)}>Edit Trek</ModalHeader>
          <Form onSubmit={handleUpdate}>
            <ModalBody>
              <FormGroup>
                <Label>Title *</Label>
                <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>State *</Label>
                    <Input type="text" name="state" value={formData.state} onChange={handleChange} required />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Address *</Label>
                    <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Category *</Label>
                    <Input type="select" name="category" value={formData.category} onChange={handleChange} required>
                      <option>Regular Trek</option>
                      <option>Fort Trek</option>
                      <option>Jungle Trek</option>
                      <option>Nature Trail</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Difficulty Level *</Label>
                    <Input type="select" name="DifLevel" value={formData.DifLevel} onChange={handleChange} required>
                      <option>Easy</option>
                      <option>Moderate</option>
                      <option>Hard</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Photo URL *</Label>
                <Input type="url" name="photo" value={formData.photo} onChange={handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Description *</Label>
                <Input type="textarea" name="desc" value={formData.desc} onChange={handleChange} rows="4" required />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Price (₹) *</Label>
                    <Input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Map Link</Label>
                    <Input type="url" name="mapLink" value={formData.mapLink} onChange={handleChange} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} /> Featured Trek
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => toggleEdit(null)}>
                Cancel
              </Button>
              <Button className="primary__btn" type="submit" style={{ background: 'var(--secondary-color)', border: 'none', color: '#fff' }}>
                Update Trek
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModal} toggle={() => toggleDelete(null)}>
          <ModalHeader toggle={() => toggleDelete(null)}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the trek "{selectedTrek?.title}"? This action cannot be undone.
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

export default AdminTours;

