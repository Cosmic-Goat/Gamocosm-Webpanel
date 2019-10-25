 document.addEventListener('DOMContentLoaded', function () {
     var elems = document.querySelectorAll('.parallax');
     var instances = M.Parallax.init(elems);
     const loadingElement = document.getElementById("loading");
     const statusElement = document.getElementById("status");

     fetch('/getstatus')
         .then(res => res.json())
         .then(data => {
             console.log(data);
             let out;
             loadingElement.style.opacity = 0;

             setTimeout(() => {

                 if (data.status !== null) {
                     out = "Server is currently " + data.status + "!";
                 } else if (data.server) {
                     if (data.minecraft) {
                         out = "Online with ip:\n" + data.domain;
                     } else {
                         out = "Server instance is up, but Minecraft is not currently running. Please try again in 30 seconds, or contact an administrator."
                     }
                 } else {
                     out = "Server is offline."
                     document.getElementById("start-button").style.opacity = 1;

                 }
                 loadingElement.disabled = true;
                 statusElement.innerHTML = out;
                 statusElement.style.opacity = 1;
             }, 500)

         })
         .catch(err => {
             loadingElement.style.opacity = 0;
             setTimeout(() => {
                 statusElement.innerHTML = err;
                 statusElement.style.opacity = 1;
             }, 500);
         });
 });

 function startServer() {
     document.getElementById("start-button").disabled = true;
     fetch('/start')
         .then(res => console.log(res));
 }