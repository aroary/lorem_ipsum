const converter = new showdown.Converter();
const request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/aroary/lorem_ipsum/main/README.md', true);
request.onload = () => {
    if (request.status >= 200 && request.status < 400) document.getElementById("readme-data").innerHTML = converter.makeHtml(request.responseText);
    else console.log("error");
};
request.onerror = () => {
    console.log("error");
};

request.send();
