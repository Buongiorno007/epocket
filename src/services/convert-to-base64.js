// import RNFetchBlob from "react-native-fetch-blob";
// export function convertToBase64(url) {
//     const fs = RNFetchBlob.fs;
//     let imagePath = null;
//     RNFetchBlob.config({
//         fileCache: true
//     })
//         .fetch("GET", url)
//         // the image is now dowloaded to device's storage
//         .then(resp => {
//             // the image path you can use it directly with Image component
//             imagePath = resp.path();
//             return resp.readFile("base64");
//         })
//         .then(base64Data => {
//             // here's base64 encoded image
//             console.log("BASE64", base64Data);
//             // remove the file from storage
//             return fs.unlink(imagePath);
//         });
// }
