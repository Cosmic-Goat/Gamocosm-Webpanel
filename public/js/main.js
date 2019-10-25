const loadingHTML = '<div class="row center progress" style="width: 50%;"><div class = "indeterminate"></div></div>'
const buttonHTML = '<a onclick="startServer()" class="btn-large waves-effect waves-light green lighten-1">Start Server</a>'
var el;
const fadeDuration = 500;

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    el = document.getElementById("box");

    fetch('/getstatus')
        .then(res => res.json())
        .then(data => {
            let out;

            if (data.status !== null) {
                out = "Server is currently " + data.status + "!";
            } else if (data.server) {
                if (data.minecraft) {
                    out = "Online with ip:\n" + data.domain;
                } else {
                    out = "Server instance is up, but Minecraft is not currently running. Please try again in 30 seconds, or contact an administrator.";
                }
            } else {
                out = "Server is offline.<br>\n" + buttonHTML;
            }

            fade(out, fadeDuration);
        })
        .catch(err => {
            fade("" + err, fadeDuration);
        });
});

function startServer() {
    fade(loadingHTML, fadeDuration);
    fetch('/start')
        .then(res => {
            if (res.status == 200) {
                fade("Server starting up!", fadeDuration);
            } else {
                res.text()
                    .then(text => fade("Error: " + text + ".", fadeDuration));
            }
        })
        .catch(err => {
            fade("" + err, fadeDuration);
        });
}

function fade(html, speed) {
    el.style.opacity = 0;
    setTimeout(() => {
        el.innerHTML = html;
        el.style.opacity = 1;
    }, speed);
}