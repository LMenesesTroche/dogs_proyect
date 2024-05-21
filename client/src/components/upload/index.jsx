import styles from "./styles.module.css";

export default function upload() {
  // const imagePreview = document.getElementById('img-preview');
  // const imageUploader = document.getElementById('img-uploader');

  // imageUploader.addEventListener('change',(e)=>{
  //     console.log(e)
  // })
  const handleUpload = (event) => {
    const file = event.target.files[0];
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgInput}>
        <img id="img-preview"></img>
        <div className={styles.cardFooter}>
          <input onChange={handleUpload} type="file" id="img-uploader" />
        </div>
      </div>
    </div>
  );
}
