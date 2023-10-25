



import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Trash2 } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from 'axios';
import { Firstorage } from '../../products/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom';



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for update form
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: "",
    name: "",
    price: "",
    description: "",
  });
  const [imageUpload, setImageUpload] = useState(null)

  const [imageUrl, setImageURL] = useState('');
  const navigate = useNavigate();


  

  // useEffect(() => {
  //   // Fetch products data when the component mounts
  //   axios.get('http://localhost:8000/products')
  //     .then((response) => {
  //       setProducts(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    // Fetch products data when the component mounts
    axios.get('https://reactbackendadmin-fgilqk35i-anurenjatbusiness-gmailcom.vercel.app/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  


  // Function to show/hide the update form
  const toggleUpdateForm = (product) => {
    setUpdatedProduct(product);
    setUpdateFormVisible(!isUpdateFormVisible);
  
    // Navigate to the UpdateForm route with the product name as a parameter
    navigate(`/products/physical/updateForm?name=${product.name}`);
  };
  
  
  const handleDelete = (productId) => {
    console.log('Deleting product with _id:', productId);

    // Send a delete request to delete the product
    axios.delete(`http://localhost:8000/products/${productId}`)
      .then(() => {
        // Product deleted successfully, update the state
        console.log('Product deleted successfully');
        const updatedProducts = products.filter((product) => product._id !== productId);
        console.log('Updated products:', updatedProducts);
        setProducts(updatedProducts);
      })
      .catch((err) => {
        // Handle delete error
        console.error('Error deleting product:', err.response); // Log the error response
        alert('Failed to delete product: ' + err.message); // Display a user-friendly error message
      });
  };

  const handleUpdate = () => {
    // Check if the image is uploaded
    if (!imageUploaded) {
      alert("Upload the image first.");
      return;
    }

    // Prepare the updated product data to send to the server
    const updatedData = {
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      imageUrl: updatedProduct.imageUrl, // Set the image URL in the product data
    };

    // Send a PUT request to update the product data
    axios
      .put(`http://localhost:8000/products/${updatedProduct._id}`, updatedData)
      .then((response) => {
        // Check if the update was successful (you can adjust the condition based on your API response)
        if (response.status === 200) {
          // Close the update form
          setUpdateFormVisible(false);

          // Refresh the product list by fetching the updated data from the server
          axios.get('http://localhost:8000/products')
            .then((response) => {
              setProducts(response.data);
            })
            .catch((err) => {
              console.error('Error fetching updated product list:', err);
            });

          // Optionally, you can display a success message to the user
          alert('Product updated successfully');
        } else {
          // Handle the case where the update was not successful (e.g., show an error message)
          console.error('Error updating product. Status code:', response.status);
          alert('Failed to update product. Please try again later.');
        }
      })
      .catch((err) => {
        // Handle update error (e.g., show an error message)
        console.error('Error updating product:', err);
        alert('Failed to update product: ' + err.message);
      });
  };
  const [imageUploaded, setImageUploaded] = useState(false);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(Firstorage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then(async () => {
      const imageUrl = await getDownloadURL(imageRef); // Fetch the image URL
      setImageURL(imageUrl); // Set the image URL in state
      setImageUploaded(true); // Set the flag to indicate that the image is uploaded
      alert("Image Uploaded");
      console.log('Image URL:', imageUrl);
    });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      <Breadcrumb title="Product List" parent="Physical" />
      <Container fluid={true}>
        <Row className="products-admin ratio_asos">
          {products.map((product, i) => {
            return (
              <Col xl="3" sm="6" key={i}>
                <Card>
                  <div className="products-admin">
                    <CardBody className="product-box">

                      <div className="product-detail">
                        <CardTitle>{product.name}</CardTitle>


                        {product.imageUrls && (
                          <div>
                            <img
                              src={product.imageUrls[0]} // Access the first image URL using index 0
                              alt={`Image of ${product.name}`}
                              style={{ maxWidth: "100%", maxHeight: "150px" }}
                            />
                          </div>
                        )}


                        <CardText>Price: {product.price}</CardText>
                        <CardText>{product.description}</CardText>


                        {/* Add the "Update" and "Delete" buttons */}
                        <div>
                          <Button
                            color="danger"
                            type="button"
                            onClick={() => toggleUpdateForm(product)}
                            style={{ fontSize: "12px", padding: "5px 10px", marginRight: "10px" }}
                          >
                            Update
                          </Button>
                          <Button
                            color="danger"
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            style={{ fontSize: "12px", padding: "5px 10px" }}
                          >
                            Delete
                          </Button>


                        </div>

                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {isUpdateFormVisible && (
        <div className="update-form">
          <h3>Update Product</h3>
          <Form>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <Button
                color="primary"
                type="button"
                onClick={uploadImage}
                style={{ marginTop: "10px" }}
              >
                Upload Image
              </Button>
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, description: e.target.value })
                }
              />
            </FormGroup>

            <Button color="primary" onClick={handleUpdate}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={() => setUpdateFormVisible(false)}>
              Cancel
            </Button>
          </Form>
        </div>
      )}


    </Fragment>
  );
};

export default ProductList;



