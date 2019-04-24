import RNFetchBlob from "rn-fetch-blob";
{
  /* 
        call example
    
        convertToBase64(game.insta_image_url).then(
          result => {
              console.log(result) // --- your base64
          },
          error => {
              console.log(error) // --- if error happend
          }
        );
    */
}
export function convertToBase64(url) {
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  let base64 = RNFetchBlob.config({
    fileCache: true
  })
    .fetch("GET", url)
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile("base64");
    })
    .then(base64Data => {
      // here's base64 encoded image
      fs.unlink(imagePath);
      // remove the file from storage
      return base64Data;
    });
  return base64;
}
