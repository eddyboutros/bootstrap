function loadCountries(element)
{
    const allCountriesDiv = document.getElementById("allCountries");
    const divElements = allCountriesDiv.querySelectorAll("div");
    for (let i = 0; i < divElements.length; i++) {
        if (divElements[i].parentNode === allCountriesDiv) {
            allCountriesDiv.removeChild(divElements[i]);
        }
    }

    let nbCountriesPerRow = event instanceof PointerEvent ? element.target.innerHTML : element.innerHTML;
    const remainder = 12 % nbCountriesPerRow;

    if (remainder !== 0) {
        const factors = [];

        for (let i = 1; i <= 12; i++) {
            if (12 % i === 0) {
                factors.push(i);
            }
        }

        const closestFactor = factors.reduce((a, b) => {
            return Math.abs(b - nbCountriesPerRow) < Math.abs(a - nbCountriesPerRow) ? b : a;
        });

        nbCountriesPerRow = closestFactor;
    }

    var bootstrapClassNb = 12 / nbCountriesPerRow;
    var div = document.createElement("div");

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            json.forEach(element => {
                var card = document.createElement("div")
                card.setAttribute("class", "card col-" + bootstrapClassNb +
                        " col-sm-" + bootstrapClassNb + " col-md-" + bootstrapClassNb + " col-lg-" + bootstrapClassNb + " rounded");

                var countryImg = document.createElement("img");
                countryImg.src = element.flags.png;
                countryImg.setAttribute("class", "img-fluid");

                var cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body");

                var cardTitle = document.createElement("h5");
                cardTitle.setAttribute("class", "card-title");
                cardTitle.innerHTML = element.name.common;

                var cardText = document.createElement("p");
                cardText.setAttribute("class", "card-text");
                cardText.innerHTML = "Region: " + element.region + ", Subregion: " + element.subregion + ", Area: " + element.area;

                var cardBtn = document.createElement("a");
                cardBtn.setAttribute("class", "btn btn-primary");
                cardBtn.href = "#";
                cardBtn.innerHTML = "Show more info";
                cardBtn.dataset.bsToggle = "modal";
                cardBtn.dataset.bsTarget = "#staticBackdrop_" + element.cca3;

                cardBody.appendChild(countryImg);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(cardBtn);

                var btnModal = document.createElement("div");
                btnModal.id = "staticBackdrop_" + element.cca3;
                btnModal.tabIndex = "-1";
                btnModal.setAttribute("class", "modal fade");
                btnModal.setAttribute("data-bs-backdrop", "static");
                btnModal.setAttribute("aria-labelledby", "staticBackdropLabel");
                btnModal.setAttribute("aria-hidden", "true");

                btnModal.innerHTML = `<div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">${element.name.common}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Capital: ${element.capital}, Car Side: ${element.car.side},
                                            Currencies: ${element.hasOwnProperty("currencies") ? Object.keys(element.currencies).join(",") : "No Currencies"}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                        </div>
                                    </div>`;

                cardBody.appendChild(btnModal);
                card.appendChild(cardBody);

                div.setAttribute("class", "row");
                div.appendChild(card);

                document.getElementById('allCountries').appendChild(div);
            });
        });
}