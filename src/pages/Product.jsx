import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/product.css";

export default function Product() {
    
    //const [data, setData] = useState();    
    const {id} = useParams()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState(null)
    const [pdf, setPdf] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`products/find/${id}`);
                //setData(res.data);
                setTitle(res.data.title)
                setCategory(res.data.category)
                setAuthor(res.data.author)
                setDesc(res.data.desc)
                setImg(res.data.img)
                setPdf(res.data.pdf)
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [id]);

    //const product = data.find((p) => p._id === id);

    const updateProduct = async(e) => {
        e.preventDefault()
        let imgUrl = ''
        let pdfUrl = ''
        
        const storageRef = ref(storage, `imgFiles/${img.name}`);
        uploadBytesResumable(storageRef, img).on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                console.log('Upload is running');
            }
          }, (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                console.log('User doesn\'t have permission to access the object');
                break;
              case 'storage/canceled':
                console.log('User canceled the upload');
                break;
              case 'storage/unknown':
                console.log('Unknown error occurred, inspect error.serverResponse');
                break;
              default:
                console.log('Unknown error occurred, inspect error.serverResponse');
            }
          }, async() => {
            imgUrl = await getDownloadURL(storageRef)
          })
        const storagePdfRef = ref(storage, `pdfFiles/${pdf.name}`);
        uploadBytesResumable(storagePdfRef, pdf).on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('Upload is running');
          }
        }, (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('User doesn\'t have permission to access the object');
              break;
            case 'storage/canceled':
              console.log('User canceled the upload');
              break;
            case 'storage/unknown':
              console.log('Unknown error occurred, inspect error.serverResponse');
              break;
            default:
              console.log('Unknown error occurred, inspect error.serverResponse');
          }
        }, async() => {
          pdfUrl = await getDownloadURL(storagePdfRef)
          await userRequest.put(`products/${id}`, {
            title: title,
            category: category,
            author: author ? author : 'Anonymous',
            desc: desc ? desc : 'No description',
            img: imgUrl.includes('undefined') ? img : imgUrl,
            pdf: pdfUrl.includes('undefined') ? pdf : pdfUrl
          })
          .then(() => {
            toast.success('Product Updated')
          })
          .catch(err => {
            toast.error('product not updated')
          })
        })
    }
    
  return (
    <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/addProducts">
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        {/* <div className="productTop">
            <div className="productTopRight">
                <div className="productInfo">
                    <div className="productInfoLeft">
                        <div className="productInfoTop">
                            <span className="productName">{title}</span>
                        </div>
                        <div className="productInfoBottom">
                            <div className="productInfoItem">
                                <span className="productName">categry:</span>
                                <span className="productInfoValue">{category}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productName">author:</span>
                                <span className="productInfoValue">{author}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productName">description:</span>
                                <span className="productInfoValue">{desc}</span>
                            </div>
                        </div>
                    </div>
                    <div className="productInfoRight">
                        <div className="productUpload">
                            <img src={img} alt="" className="productUploadImg" />
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="productBottom">
            <div className="newProduct">
                <h1 className="addProductTitle">Update Product</h1>
                <form className="addProductForm" onSubmit={updateProduct}>
                    <div className="addProductItem">
                        <label>Title</label>
                        <input 
                        type='text' 
                        placeholder={title}
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Category</label>
                        <select onChange={e => setCategory(e.target.value)} >
                            <option value="default">Select Category</option>
                            <option value="Textes_réglementaires">Textes réglementaires</option>
                            <option value="PFE">PFE</option>
                            <option value="Management_de_la_Production">Management de la Production</option>
                            <option value="Articles_scientifiques">Articles scientifiques</option>
                            <option value="Techniques_de_l'ingénieur">Techniques de l'ingénieur</option>
                            <option value="Normes_marocaines">Normes marocaines</option>
                            <option value="Insertion_professionnells">Insertion professionnells</option>
                            <option value="Anciens_concours_de_l'Etat">Anciens concours de l'Etat</option>
                            <option value="QHSE">QHSE</option>
                            <option value="Normes_et_référentiels">Normes et référentiels</option>
                            <option value="Gestion_de_projet">Gestion de projet</option>
                            <option value="Procédés_de_fabrication">Procédés de fabrication</option>
                            <option value="MSDA">MSDA</option>
                            <option value="GBPF">GBPF</option>
                        </select>
                    </div>
                    <div className="addProductItem">
                        <label>Author</label>
                        <input 
                        type='text'
                        placeholder={author}
                        value={author}
                        onChange={e => setAuthor(e.target.value)} 
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Description</label>
                        <textarea 
                        name="desc"
                        rows="10"
                        cols="66"
                        placeholder={desc}
                        value={desc}
                        onChange={e => setDesc(e.target.value)} 
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Image</label>
                        <input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        onChange={e => setImg(e.target.files[0]) }
                        />
                    </div>
                    <div className="addProductItem">
                        <label>PDF</label>
                        <input 
                        type='file'
                        accept=".pdf"
                        onChange={e => setPdf(e.target.files[0] ? e.target.files[0] : pdf)} 
                        />
                    </div>
                    <button type='submit' className="productButton">Update</button>
                </form>
            </div>
        </div>
    </div>
  );
}