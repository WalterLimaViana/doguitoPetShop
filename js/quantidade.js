var total = 1;
//printing default value of total that is 0 in h2 tag
document.getElementById("quantidade").innerText = total;
//creation of somar function
function somar() {
    total++;
    document.getElementById("quantidade").innerText = total;
}
//creation of diminuir function
function diminuir() {
    if (total > 1) {
        total--;
        document.getElementById("quantidade").innerText = total;
    }
}