import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import TrekCard from "../shared/TrekCard";
import { AuthContext } from "../Context/AuthContext";
import { BASE_URL } from "../utils/config";
import CommonSection from "../shared/CommonSection";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchWishlist = async () => {
        try {
          const res = await fetch(`${BASE_URL}/wishlist`, {
            headers: {
              "Authorization": `Bearer ${user.token || ""}`
            },
            credentials: "include"
          });
          const result = await res.json();
          if (result.success) {
            setWishlist(result.data.map(item => item.tourId)); // Assuming tourId is populated
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <section>
        <Container>
          <h4 className="text-center">Please login to view your wishlist.</h4>
        </Container>
      </section>
    );
  }

  return (
    <>
      <CommonSection title={"My Wishlist"} />
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {!loading && wishlist.length === 0 && (
            <h4 className="text-center pt-5">You haven't saved any treks yet.</h4>
          )}
          {!loading && wishlist.length > 0 && (
            <Row>
              {wishlist.map((trek) => (
                <Col lg="3" md="4" sm="6" xs="12" className="mb-4" key={trek._id}>
                  <TrekCard trek={trek} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default MyWishlist;
