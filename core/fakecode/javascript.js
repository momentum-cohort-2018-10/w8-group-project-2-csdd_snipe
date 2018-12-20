

function setCookie(name, value, expires, path, domain, secure) {

    document.cookie = name + "=" + escape(value) +

        ((expires) ? "; expires=" + expires.toGMTString() : "") +

        ((path) ? "; path=" + path : "") +

        ((domain) ? "; domain=" + domain : "") +

        ((secure) ? "; secure" : "");

}




