const readCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
}

setCookie = (cname, cvalue) => {
    document.cookie = cname + "=" + cvalue + ";";
}

$(document).ready(() => {
   
    const redirectToHtml = () => {
        $.ajax({
            url: "/private_page.html",
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + readCookie("jwt"));
            },
            success: function() {
                setTimeout(function() {
                    window.location.href = '/app/test.html';
                }, 333);
            }
        });
    }
});

