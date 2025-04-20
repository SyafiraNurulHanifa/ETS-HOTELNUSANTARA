document.addEventListener("DOMContentLoaded", function () {
    const filterLokasi = document.getElementById("filterLokasi");
    const hargaRadios = document.querySelectorAll("input[name='price-range']");
    const resetBtn = document.getElementById("resetBtn");
    const kamarCards = document.querySelectorAll(".kamar-card");

    function getHargaFromText(text) {
        const match = text.match(/Rp\s?([\d.]+)/);
        if (!match) return 0;
        return parseInt(match[1].replace(/\./g, ""));
    }

    function applyFilters() {
        const selectedLokasi = filterLokasi.value;
        const selectedHarga = [...hargaRadios].find(r => r.checked)?.value;

        kamarCards.forEach(card => {
            const lokasi = card.getAttribute("data-lokasi");
            const hargaText = card.querySelector(".kamar-info p:nth-of-type(2)").textContent;
            const harga = getHargaFromText(hargaText);

            let show = true;

            if (selectedLokasi && lokasi !== selectedLokasi) {
                show = false;
            }

            if (selectedHarga === "low" && harga >= 800000) {
                show = false;
            } else if (selectedHarga === "mid" && (harga < 800000 || harga > 1000000)) {
                show = false;
            } else if (selectedHarga === "high" && harga <= 1000000) {
                show = false;
            }

            card.style.display = show ? "block" : "none";
        });
    }

    function resetFilters() {
        filterLokasi.value = "";
        hargaRadios.forEach(r => r.checked = false);
        kamarCards.forEach(card => card.style.display = "block");
    }

    // Event listeners
    filterLokasi.addEventListener("change", applyFilters);
    hargaRadios.forEach(radio => radio.addEventListener("change", applyFilters));
    resetBtn.addEventListener("click", resetFilters);
});
