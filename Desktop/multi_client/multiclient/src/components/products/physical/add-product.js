





// import React, { Fragment, useState,useEffect } from "react";
// import Breadcrumb from "../../common/breadcrumb";
// import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
// import one from "../../../assets/images/pro3/1.jpg";
// import axios from 'axios'; // Import Axios
// import { Firstorage } from '../../products/config';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { v4 } from "uuid";
// // ... (previous imports and component setup)
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrl, setImageURL] = useState("");
//   const [imageUploaded, setImageUploaded] = useState(false);
//   const [type, setType] = useState("");
//   const [brand, setBrand] = useState("");
//   const [productCollection, setProductCollection] = useState("");
//   const [category, setCategory] = useState(""); // Add state for 'category'
//   const [sale, setSale] = useState(""); // Add state for 'sale'
//   const [discount, setDiscount] = useState(""); // Add state for 'discount'
//   const [stock, setStock] = useState(""); // Add state for 'stock'
//   const [isNew, setIsNew] = useState(false); // Add state for 'isNew'
//   const [tags, setTags] = useState([]); // Add state for 'tags'
//   const [variants, setVariants] = useState([]); // Add state for 'variants'
//   const [productVariants, setProductVariants] = useState([]);
//   const [selectedVariant, setSelectedVariant] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get('/productvariants')
//       .then((response) => {
//         setProductVariants(response.data); // Update the productVariants state
//       })
//       .catch((error) => {
//         console.error('Error fetching product variants:', error);
//       });
//   }, []);
  

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await axios.get('/api/categories');
//         const categoriesData = response.data;
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     }

//     fetchCategories();
//   }, []);
  
//   const uploadImage = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(Firstorage, `images/${imageUpload.name + v4()}`);

//     uploadBytes(imageRef, imageUpload).then(async () => {
//       const imageUrl = await getDownloadURL(imageRef);
//       setImageURL(imageUrl);
//       setImageUploaded(true);
//       alert("Image Uploaded");
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!imageUploaded) {
//         alert('Please upload an image first.');
//         return;
//       }

//       // Prepare product data
//       const productData = {
//         name,
//         price,
//         description,
//         imageUrl,
//         type,
//         brand,
//         productCollection,
//         category, // Include 'category'
//         sale, // Include 'sale'
//         discount, // Include 'discount'
//         stock, // Include 'stock'
//         isNew, // Include 'isNew'
//         tags, // Include 'tags'
//         variants, // Include 'variants'
//       };

//       // Make a POST request to add the product
//       const response = await axios.post('/addProduct', productData);

//       if (response.status === 201) {
//         console.log('Product added successfully');
//         // Reset all form fields
//         setName('');
//         setPrice('');
//         setDescription('');
//         setImageURL('');
//         setImageUploaded(false);
//         setType('');
//         setBrand('');
//         setProductCollection('');
//         setCategory('');
//         setSale('');
//         setDiscount('');
//         setStock('');
//         setIsNew(false);
//         setTags([]);
//         setVariants([]);
//         alert("Product Added");
//       }
//     } catch (error) {
//       console.error('Error adding product:', error.message);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageUpload(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // Handle the image preview if needed
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Fragment>
//       <Breadcrumb title="Add Product" parent="Physical" />
//       <Container fluid={true}>
//         <Row>
//           <Col sm="12">
//             <Card>
//               <CardHeader>
//                 <h5>Add Product</h5>
//               </CardHeader>
//               <CardBody>
//                 <Row className="product-adding">
//                   {/* <Col xl="5">
//                     {imageUrl ? (
//                       <img
//                         src={imageUrl}
//                         alt=""
//                         className="img-fluid image_zoom_1 blur-up lazyloaded"
//                       />
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

// <Col xl="5">
//   {imageUrl ? (
//     <Carousel showArrows={true} showStatus={false} showIndicators={false}>
//       <div>
//         <img src={imageUrl} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
//       </div>
   
//     </Carousel>
//   ) : (
//     <div className="add-product">
//       <Row>
//         <Col xl="9 xl-50" sm="6 col-9">
//           <img src={one} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
//         </Col>
//       </Row>
//     </div>
//   )}
// </Col>

//                   <Col xl="7">
//                     <Form className="needs-validation add-product-form" onSubmit={handleSubmit}>
//                       <div className="form form-label-center">
//                         <Fragment>
//                           <div className="mb-3">
//                             <input type="file" onChange={handleFileChange}></input>
//                           </div>

//                           <div className="mb-3">
//                             <button onClick={uploadImage}>Upload Image</button>
//                           </div>
//                         </Fragment>
//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Product Name :</Label>
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
//                           <div className="valid-feedback">Looks good!</div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Product price :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="product_name"
//                               id="validationCustom01"
//                               type="text"
//                               required
//                               value={price}
//                               onChange={(e) => setPrice(e.target.value)}
//                             />
//                           </div>
//                           <div className="valid-feedback">Looks good!</div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Product description :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="product_name"
//                               id="validationCustom01"
//                               type="text"
//                               required
//                               value={description}
//                               onChange={(e) => setDescription(e.target.value)}
//                             />
//                           </div>
//                           <div className="valid-feedback">Looks good!</div>
//                         </FormGroup>

//                         {/* New Fields */}
//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Type :</Label>
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

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Brand :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="brand"
//                               type="text"
//                               value={brand}
//                               onChange={(e) => setBrand(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Collection :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="collection"
//                               type="text"
//                               value={productCollection}
//                               onChange={(e) => setProductCollection(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//   <Label className="col-xl-3 col-sm-4 mb-0">Category :</Label>
//   <div className="col-xl-8 col-sm-7">
//     <Input
//       className="form-control"
//       name="category"
//       type="select" // Use type="select" for a dropdown
//       value={category}
//       onChange={(e) => setCategory(e.target.value)}
//     >
//       <option value="">Select a parent category</option>
//       {categories.map((cat) => (
//         <option key={cat._id} value={cat.name}>
//           {cat.name}
//         </option>
//       ))}
//     </Input>
//   </div>
// </FormGroup>


//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Sale :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="sale"
//                               type="text"
//                               value={sale}
//                               onChange={(e) => setSale(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Discount :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="discount"
//                               type="text"
//                               value={discount}
//                               onChange={(e) => setDiscount(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Stock :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="stock"
//                               type="text"
//                               value={stock}
//                               onChange={(e) => setStock(e.target.value)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Is New :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="isNew"
//                               type="checkbox"
//                               checked={isNew}
//                               onChange={() => setIsNew(!isNew)}
//                             />
//                           </div>
//                         </FormGroup>

//                         <FormGroup className="form-group mb-3 row">
//                           <Label className="col-xl-3 col-sm-4 mb-0">Tags :</Label>
//                           <div className="col-xl-8 col-sm-7">
//                             <Input
//                               className="form-control"
//                               name="tags"
//                               type="text"
//                               value={tags}
//                               onChange={(e) => setTags(e.target.value.split(','))}
//                             />
//                           </div>
//                         </FormGroup>



//   <FormGroup className="form-group mb-3 row">
//   <Label className="col-xl-3 col-sm-4 mb-0">Variants:</Label>
//   <div className="col-xl-8 col-sm-7">
//     <Input
//       className="form-control"
//       name="variants"
//       type="select"
//       value={selectedVariant}
//       onChange={(e) => setSelectedVariant(e.target.value)}
//     >
//       <option value="">Select a variant</option>
//       {productVariants.map((variant) => (
//         <option key={variant._id} value={variant.name}>
//           {variant.name}
//         </option>
//       ))}
//     </Input>
//     {selectedVariant && (
//       <p>Selected Variant: {selectedVariant}</p>
//     )}
//   </div>
// </FormGroup>





//                       </div>
//                       <div className="form">{/* ... (other JSX) */}</div>
//                       <div className="offset-xl-3 offset-sm-4">
//                         <Button type="submit" color="primary">
//                           Add
//                         </Button>
//                         <Button type="button" color="light">
//                           Discard
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

// export default AddProduct;










import React, { Fragment, useState,useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import one from "../../../assets/images/pro3/1.jpg";
import axios from 'axios'; // Import Axios
import { Firstorage } from '../../products/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
// ... (previous imports and component setup)
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageURL] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [productCollection, setProductCollection] = useState("");
  const [category, setCategory] = useState(""); // Add state for 'category'
  const [sale, setSale] = useState(""); // Add state for 'sale'
  const [discount, setDiscount] = useState(""); // Add state for 'discount'
  const [stock, setStock] = useState(""); // Add state for 'stock'
  const [isNew, setIsNew] = useState(false); // Add state for 'isNew'
  const [tags, setTags] = useState([]); // Add state for 'tags'
  const [variants, setVariants] = useState([]); // Add state for 'variants'
  const [productVariants, setProductVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [allImageUrls, setAllImageUrls] = useState([]);
  useEffect(() => {
    axios
      .get('/productvariants')
      .then((response) => {
        setProductVariants(response.data); // Update the productVariants state
      })
      .catch((error) => {
        console.error('Error fetching product variants:', error);
      });
  }, []);
  
  useEffect(() => {
    console.log("All Uploaded Image URLs:", allImageUrls);
  }, [allImageUrls]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        const categoriesData = response.data;
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);
  
 
  const handleUploadMoreImages = () => {
    // When the "Upload More Images" button is clicked, clear the imageUpload state and allow uploading more images.
    setImageUpload(null);
  };
  // const uploadImage = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(Firstorage, `images/${imageUpload.name + v4()}`);
  
  //   uploadBytes(imageRef, imageUpload)
  //     .then(async () => {
  //       const imageUrl = await getDownloadURL(imageRef);
  //       setImageUrls([...imageUrls, imageUrl]); // Add the uploaded image URL to the array
  //       setImageUpload(null); // Clear the imageUpload state to allow uploading more images
  //       alert("Image Uploaded");
  
  //       // Log the uploaded image URL
  //       console.log("Uploaded Image URL:", imageUrl);
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });
  // };
  

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(Firstorage, `images/${imageUpload.name + v4()}`);
  
    uploadBytes(imageRef, imageUpload)
      .then(async () => {
        const imageUrl = await getDownloadURL(imageRef);
        setImageUrls([...imageUrls, imageUrl]); // Add the uploaded image URL to the array
        setAllImageUrls([...allImageUrls, imageUrl]); 
        setImageUpload(null); // Clear the imageUpload state to allow uploading more images
        setImageUploaded(true); // Set imageUploaded to true after the first image is uploaded
        alert("Image Uploaded");
  
        // Log the uploaded image URL
        console.log("Uploaded Image URL:", imageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!imageUploaded) {
        alert('Please upload an image first.');
        return;
      }

      // Prepare product data
      const productData = {
        name,
        price,
        description,
        imageUrls,
        type,
        brand,
        productCollection,
        category, // Include 'category'
        sale, // Include 'sale'
        discount, // Include 'discount'
        stock, // Include 'stock'
        isNew, // Include 'isNew'
        tags, // Include 'tags'
        variants, // Include 'variants'
      };

      // Make a POST request to add the product
      const response = await axios.post('/addProduct', productData);

      if (response.status === 201) {
        console.log('Product added successfully');
        // Reset all form fields
        setName('');
        setPrice('');
        setDescription('');
        setAllImageUrls([]); 
        setImageUploaded(false);
        setType('');
        setBrand('');
        setProductCollection('');
        setCategory('');
        setSale('');
        setDiscount('');
        setStock('');
        setIsNew(false);
        setTags([]);
        setVariants([]);
        alert("Product Added");
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Handle the image preview if needed
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <Breadcrumb title="Add Product" parent="Physical" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Product</h5>
              </CardHeader>
              <CardBody>
                <Row className="product-adding">
                  {/* <Col xl="5">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        className="img-fluid image_zoom_1 blur-up lazyloaded"
                      />
                    ) : (
                      <div className="add-product">
                        <Row>
                          <Col xl="9 xl-50" sm="6 col-9">
                            <img
                              src={one}
                              alt=""
                              className="img-fluid image_zoom_1 blur-up lazyloaded"
                            />
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Col> */}
<Col xl="5">
  {imageUrls.length > 0 ? (
    <Carousel showArrows={true} showStatus={false} showIndicators={false}>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Product Image ${index}`} className="img-fluid image_zoom_1 blur-up lazyloaded" />
        </div>
      ))}
    </Carousel>
  ) : (
    <div className="add-product">
      <Row>
        <Col xl="9 xl-50" sm="6 col-9">
          <img src={one} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
        </Col>
      </Row>
    </div>
  )}
</Col>


                  <Col xl="7">
                    <Form className="needs-validation add-product-form" onSubmit={handleSubmit}>
                      <div className="form form-label-center">
                        <Fragment>
                          <div className="mb-3">
                            <input type="file" onChange={handleFileChange}></input>
                          </div>

                          <div className="mb-3">
                            <button onClick={uploadImage}>Upload Image</button>
                          </div>
                        </Fragment>
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product Name :</Label>
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
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product price :</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_name"
                              id="validationCustom01"
                              type="text"
                              required
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Product description :</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="product_name"
                              id="validationCustom01"
                              type="text"
                              required
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        {/* New Fields */}
                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Type :</Label>
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
                          <Label className="col-xl-3 col-sm-4 mb-0">Brand :</Label>
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
                          <Label className="col-xl-3 col-sm-4 mb-0">Collection :</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="collection"
                              type="text"
                              value={productCollection}
                              onChange={(e) => setProductCollection(e.target.value)}
                            />
                          </div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
  <Label className="col-xl-3 col-sm-4 mb-0">Category :</Label>
  <div className="col-xl-8 col-sm-7">
    <Input
      className="form-control"
      name="category"
      type="select" // Use type="select" for a dropdown
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">Select a parent category</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.parentCategory
        }>
          {cat.parentCategory
}
        </option>
      ))}
    </Input>
  </div>
</FormGroup>


                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Sale :</Label>
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
                          <Label className="col-xl-3 col-sm-4 mb-0">Discount :</Label>
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
                          <Label className="col-xl-3 col-sm-4 mb-0">Stock :</Label>
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
                          <Label className="col-xl-3 col-sm-4 mb-0">Is New :</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="isNew"
                              type="checkbox"
                              checked={isNew}
                              onChange={() => setIsNew(!isNew)}
                            />
                          </div>
                        </FormGroup>

                        <FormGroup className="form-group mb-3 row">
                          <Label className="col-xl-3 col-sm-4 mb-0">Tags :</Label>
                          <div className="col-xl-8 col-sm-7">
                            <Input
                              className="form-control"
                              name="tags"
                              type="text"
                              value={tags}
                              onChange={(e) => setTags(e.target.value.split(','))}
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
      {productVariants.map((variant) => (
        <option key={variant._id} value={variant.name}>
          {variant.name}
        </option>
      ))}
    </Input>
    {selectedVariant && (
      <p>Selected Variant: {selectedVariant}</p>
    )}
  </div>
</FormGroup>





                      </div>
                      <div className="form">{/* ... (other JSX) */}</div>
                      <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                          Add
                        </Button>
                        <Button type="button" color="light">
                          Discard
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

export default AddProduct;
