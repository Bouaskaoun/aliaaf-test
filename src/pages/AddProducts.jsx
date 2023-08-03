import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRequest } from "../requestMethods";
import missingFile from "../assets/images/missing-file.jpg";
import "../styles/login.css";
import ProgressCircle from "../components/UI/ProgressCircle";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);

  // const addProduct = async(e) => {
  //   e.preventDefault()
  //   let imgUrl = ''
  //   if(img == null){
  //     imgUrl = missingFile
  //   }
  //   else{
  //     const storageRef = ref(storage, `imgFiles/${img.name}`);
  //     const uploadTaskImg = uploadBytesResumable(storageRef, img);
  //     imgUrl = await getDownloadURL(uploadTaskImg.snapshot.ref)
  //   }
  //   const storagePdfRef = ref(storage, `pdfFiles/${pdf.name}`);
  //   const uploadTaskPdf = uploadBytesResumable(storagePdfRef, pdf);
  //   const pdfUrl = await getDownloadURL(uploadTaskPdf.snapshot.ref)

  //   await userRequest.post('products', {
  //     title: title,
  //     category: category,
  //     author: author ? author : 'Anonymous',
  //     desc: desc ? desc : 'No description',
  //     img: imgUrl,
  //     pdf: pdfUrl
  //   })
  //   .then(() => {
  //     setTitle('')
  //     setAuthor('')
  //     setDesc('')
  //     e.target.reset();
  //     toast.success('Product Created')
  //   })
  //   .catch(err => {
  //     toast.error(err.response.data.message)
  //   })
  // }

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imgUrl = "";
    let pdfUrl = "";
    if (img == null) {
      imgUrl = missingFile;
    } else {
      const storageRef = ref(storage, `imgFiles/${img.name}`);
      uploadBytesResumable(storageRef, img).on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Upload is running");
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
            default:
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
          }
        },
        async () => {
          imgUrl = await getDownloadURL(storageRef);
        }
      );
    }

    const storagePdfRef = ref(storage, `pdfFiles/${pdf.name}`);
    uploadBytesResumable(storagePdfRef, pdf).on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Upload is running");
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
          default:
            console.log("Unknown error occurred, inspect error.serverResponse");
        }
      },
      async () => {
        pdfUrl = await getDownloadURL(storagePdfRef);
        await userRequest
          .post("products", {
            title: title,
            category: category,
            author: author ? author : "Anonymous",
            desc: desc ? desc : "No description",
            img: imgUrl,
            pdf: pdfUrl,
          })
          .then(() => {
            setLoading(false);
            setTitle("");
            setAuthor("");
            setDesc("");
            e.target.reset();
            toast.success("Product Created");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    );
  };

  return (
    <Helmet title="AddBooks">
      <section className="product">
        <Container>
          <Row>
            <Col lg="6" className="m-auto">
              <h3 className="fw-bold mb-4">Ajouter un document</h3>
              <div className="newUser">
                {/* <Form className="newUserForm" onSubmit={addProduct}>
                  <FormGroup className="newUserItem">
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="newUserItem">
                    <input
                      type="text"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="newUserItem">
                    <select onChange={(e) => setCategory(e.target.value)}>
                      <option value="default">Select Category</option>
                      <option value="Textes_réglementaires">
                        Textes réglementaires
                      </option>
                      <option value="PFE">PFE</option>
                      <option value="Management_de_la_Production">
                        Management de la Production
                      </option>
                      <option value="Articles_scientifiques">
                        Articles scientifiques
                      </option>
                      <option value="Techniques_de_l'ingénieur">
                        Techniques de l'ingénieur
                      </option>
                      <option value="Normes_marocaines">
                        Normes marocaines
                      </option>
                      <option value="Insertion_professionnells">
                        Insertion professionnells
                      </option>
                      <option value="Anciens_concours_de_l'Etat">
                        Anciens concours de l'Etat
                      </option>
                      <option value="QHSE">QHSE</option>
                      <option value="Normes_et_référentiels">
                        Normes et référentiels
                      </option>
                      <option value="Gestion_de_projet">
                        Gestion de projet
                      </option>
                      <option value="Procédés_de_fabrication">
                        Procédés de fabrication
                      </option>
                      <option value="MSDA">MSDA</option>
                      <option value="GBPF">GBPF</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="newUserItem">
                    <textarea
                      id="description"
                      name="description"
                      placeholder=" Description"
                      rows="5"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="newUserItem">
                    <label>Image</label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </FormGroup>
                  <FormGroup className="newUserItem">
                    <label>Pdf</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdf(e.target.files[0])}
                    />
                  </FormGroup>
                  <button type="submit" className="newUserButton">
                    Create a Book
                  </button>
                </Form> */}
                <form onSubmit={addProduct}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control-input"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="default">Select Category</option>
                      <option value="Textes_réglementaires">
                        Textes réglementaires
                      </option>
                      <option value="PFE">PFE</option>
                      <option value="Management_de_la_Production">
                        Management de la Production
                      </option>
                      <option value="Articles_scientifiques">
                        Articles scientifiques
                      </option>
                      <option value="Techniques_de_l'ingénieur">
                        Techniques de l'ingénieur
                      </option>
                      <option value="Normes_marocaines">
                        Normes marocaines
                      </option>
                      <option value="Insertion_professionnells">
                        Insertion professionnells
                      </option>
                      <option value="Anciens_concours_de_l'Etat">
                        Anciens concours de l'Etat
                      </option>
                      <option value="QHSE">QHSE</option>
                      <option value="Normes_et_référentiels">
                        Normes et référentiels
                      </option>
                      <option value="Gestion_de_projet">
                        Gestion de projet
                      </option>
                      <option value="Procédés_de_fabrication">
                        Procédés de fabrication
                      </option>
                      <option value="MSDA">MSDA</option>
                      <option value="GBPF">GBPF</option>
                      <option value="Support_de_formations">
                        Support de formations
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      id="description"
                      name="description"
                      className="form-control-textarea"
                      placeholder=" Description"
                      rows="5"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="m-3">Image</label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setImg(e.target.files[0])}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="m-3">Pdf</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdf(e.target.files[0])}
                      required
                    />
                  </div>
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <ProgressCircle
                        progress={
                          Math.round((progressBar + Number.EPSILON) * 100) / 100
                        }
                        trackWidth={5}
                        indicatorWidth={10}
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control-submit-button"
                      >
                        Ajouter
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddProducts;
