 document.addEventListener('DOMContentLoaded', function () {
     var elems = document.querySelectorAll('.parallax');
     var instances = M.Parallax.init(elems);
     const loadingElement = document.getElementById("loading");
     const statusElement = document.getElementById("status");

     fetch('/getstatus')
         .then(res => res.json())
         .then(data => {
             console.log(data);
             const out = "Online with ip:\n" + data.domain;


             loadingElement.style.opacity = 0;

             setTimeout(function () {
                 loadingElement.remove();
                 statusElement.innerHTML = out;
                 statusElement.style.opacity = 1;
             }, 500)

         });


     // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
     // // The Firebase SDK is initialized and available here!
     //
     // firebase.auth().onAuthStateChanged(user => { });
     // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
     // firebase.messaging().requestPermission().then(() => { });
     // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
     //
     // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥


 });