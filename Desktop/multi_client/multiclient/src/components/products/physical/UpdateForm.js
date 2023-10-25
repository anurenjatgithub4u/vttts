// import React, { Fragment, useState, useEffect } from "react";
// import Breadcrumb from "../../common/breadcrumb";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Row,
//   Button,
// } from "reactstrap";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import one from "../../../assets/images/pro3/1.jpg";
// import { useLocation } from 'react-router-dom';

// const UpdateForm = ({ product }) => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrls, setImageUrls] = useState([]);
//   const [type, setType] = useState("");
//   const [brand, setBrand] = useState("");
//   const [productCollection, setProductCollection] = useState("");
//   const [category, setCategory] = useState("");
//   const [sale, setSale] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [stock, setStock] = useState("");
//   const [isNew, setIsNew] = useState(false);
//   const [tags, setTags] = useState("");
//   const [variants, setVariants] = useState([]);
//   const [selectedVariant, setSelectedVariant] = useState("");
//   const [categories, setCategories] = useState([]);
//   const location = useLocation();

//   const productName = new URLSearchParams(location.search).get('name');

//   // Populate the 'name' input field with the product name
//   useEffect(() => {
//     if (productName) {
//       setName(productName);
//     }
//   }, [productName]);

//   useEffect(() => {
//     // Fetch categories data and other dependencies if needed
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare updated product data
//     // const updatedProduct = {
//     //   name,
//     //   price,
//     //   description,
//     //   imageUrls,
//     //   type,
//     //   brand,
//     //   productCollection,
//     //   category,
//     //   sale,
//     //   discount,
//     //   stock,
//     //   isNew,
//     //   tags,
//     //   variants,
//     // };

//     // Implement your update logic to send the updatedProduct to the server

//     // Reset the form or handle any other actions after the update

//     alert("Product Updated"); // Show a success message or navigate back
//   };

//   const handleFileChange = (e) => {
//     // Handle file selection and image preview if needed
//   };

//   const handleUploadMoreImages = () => {
//     // Allow uploading more images, you may implement this if needed
//   };

//   return (
//     <Fragment>
//       <Breadcrumb title="Update Product" parent="Physical" />
//       <Container fluid={true}>
//         <Row>
//           <Col sm="12">
//             <Card>
//               <CardHeader>
//                 <h5>Update Product</h5>
//               </CardHeader>
//               <CardBody>
//                 <Row className="product-adding">
//                   {/* <Col xl="5">
//                     {imageUrls.length > 0 ? (
//                       <Carousel
//                         showArrows={true}
//                         showStatus={false}
//                         showIndicators={false}
//                       >
//                         {imageUrls.map((url, index) => (
//                           <div key={index}>
//                             <img
//                               src={url}
//                               alt={`Product Image ${index}`}
//                               className="img-fluid image_zoom_1 blur-up lazyloaded"
//                             />
//                           </div>
//                         ))}
//                       </Carousel>
//                     ) : (
//                       <div className="add-product">
//                         <Row>
//                           <Col xl="9 xl-50" sm="6 col-9">
//                             <img
//                               src={one}
//                               alt=""
//                               className="img-fluid image_zoom_1 blur-up lazyloaded"
//                             />
//                           </Col>
//                         </Row>
//                       </div>
//                     )}
//                   </Col> */}
//                   <Col xl="7">
//                     <Form className="needs-validation add-product-form" onSubmit={handleSubmit}>
//                       <div className="form form-label-center">
//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Product Name:</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="product_name"
//                               id="name"
//                               type="text"
//                               required
//                               value={name}
//                               onChange={(e) => setName(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Product Price:</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="product_price"
//                               id="price"
//                               type="text"
//                               required
//                               value={price}
//                               onChange={(e) => setPrice(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Product Description:</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="product_description"
//                               id="description"
//                               type="text"
//                               required
//                               value={description}
//                               onChange={(e) => setDescription(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         {/* New Fields */}
//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Type:</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="type"
//                               type="text"
//                               value={type}
//                               onChange={(e) => setType(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         {/* ... (other fields for brand, collection, category, etc.) */}
                        
//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Variants:</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="variants"
//                               type="select"
//                               value={selectedVariant}
//                               onChange={(e) => setSelectedVariant(e.target.value)}
//                             >
//                               <option value="">Select a variant</option>
//                               {variants.map((variant, index) => (
//                                 <option key={index} value={variant}>
//                                   {variant}
//                                 </option>
//                               ))}
//                             </Input>
//                           </div>
//                         </FormGroup>
//                       </div>
//                       <div className="form">
//                         {/* ... (Other form fields for type, brand, collection, category, etc.) */}
//                       </div>
//                       <div className="offset-xl-3 offset-sm-4">
//                         <Button type="submit" color="primary">
//                           Update
//                         </Button>
//                         <Button type="button" color="light">
//                           Cancel
//                         </Button>
//                       </div>
//                     </Form>
//                   </Col>
//                 </Row>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </Fragment>
//   );
// };

// export default UpdateForm;



import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import one from "../../../assets/images/pro3/1.jpg";
import { useLocation } from 'react-router-dom';

const UpdateForm = ({ product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [productCollection, setProductCollection] = useState("");
  const [category, setCategory] = useState("");
  const [sale, setSale] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [tags, setTags] = useState("");
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const productName = new URLSearchParams(location.search).get('name');

  // Populate the 'name' input field with the product name
  useEffect(() => {
    if (productName) {
      setName(productName);
    }
  }, [productName]);

  useEffect(() => {
    // Fetch categories data and other dependencies if needed
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated product data
    const updatedProduct = {
      name,
      price,
      description,
      imageUrls,
      type,
      brand,
      productCollection,
      category,
      sale,
      discount,
      stock,
      isNew,
      tags,
      variants,
    };

    // Implement your update logic to send the updatedProduct to the server

    // Reset the form or handle any other actions after the update

    alert("Product Updated"); // Show a success message or navigate back
  };

  const handleFileChange = (e) => {
    // Handle file selection and image preview if needed
  };

  const handleUploadMoreImages = () => {
    // Allow uploading more images, you may implement this if needed
  };

  return (
    <Fragment>
      <Breadcrumb title="Update Product" parent="Physical" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Update Product</h5>
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  {/* Add image carousel or other image display logic here */}
                  <Col xl="7">
                    <Form className="needs-validation add-product-form" onSubmit={handleSubmit}>
                      <div className="form form-label-center">
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product Name:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_name"
                              id="name"
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product Price:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_price"
                              id="price"
                              type="text"
                              required
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product Description:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_description"
                              id="description"
                              type="text"
                              required
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Type:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="type"
                              type="text"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Brand:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="brand"
                              type="text"
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product Collection:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_collection"
                              type="text"
                              value={productCollection}
                              onChange={(e) => setProductCollection(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Category:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="category"
                              type="text"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Sale:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="sale"
                              type="text"
                              value={sale}
                              onChange={(e) => setSale(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Discount:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="discount"
                              type="text"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Stock:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="stock"
                              type="text"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Is New:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="is_new"
                              type="checkbox"
                              checked={isNew}
                              onChange={() => setIsNew(!isNew)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Tags:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="tags"
                              type="text"
                              value={tags}
                              onChange={(e) => setTags(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Variants:</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="variants"
                              type="select"
                              value={selectedVariant}
                              onChange={(e) => setSelectedVariant(e.target.value)}
                            >
                              <option value="">Select a variant</option>
                              {variants.map((variant, index) => (
                                <option key={index} value={variant}>
                                  {variant}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </FormGroup>
                      </div>
                      <div className="form">
                        {/* Additional form fields go here... */}
                      </div>
                      <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                          Update
                        </Button>
                        <Button type="button" color="light">
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UpdateForm;
