import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios"

export default function upload() {
  const [urlImagen, seturlImagen] = useState("");

  const changeUploadImage = async (e) =>{
    const file = e.target.files[0];
    const data = new FormData();

    data.append("file" , file);
    data.append("upload_preset" , "neoShopPreset")

    const response = await axios.post("https://api.cloudinary.com/v1_1/decbwosgj/image/upload", data)
    seturlImagen(response.data.secure_url);
    console.log(response.data)
  };
  return (
    <div >
      <h1>Seleccionar imagen</h1>
      <div>
        <input type="file" accept="image/*" onChange={changeUploadImage} />
        {
          urlImagen && (
            <div>
              <img src={urlImagen}/>
              <button>Eliminar Imagen</button>
            </div>
          )
        }
        
      </div>
    </div>
  );
}
