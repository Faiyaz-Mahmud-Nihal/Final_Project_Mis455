function searchCountry() {
     var searchTerm = document.getElementById("searchBox").value.trim();
     if(searchTerm.length === 0) {
       alert("Please enter a country name.");
       return;
     }
     var url = `https://restcountries.com/v3.1/name/${searchTerm}`;
   
     fetch(url)
       .then(res => {
         if (!res.ok) {
           throw new Error('Country not found');
         }
         return res.json();
       })
       .then(data => showInBrowser(data))
       .catch(error => {
         document.getElementById("displayArea").innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
       });
   }
   
   function showInBrowser(data) {
     var oldContent = document.getElementById("displayArea");
     oldContent.textContent = ""; // Clear previous results
   
     data.forEach(country => {
       var newDiv = document.createElement("div");
       newDiv.classList.add("innerStyle");
       var currencyInfo = "N/A";
       if (country.currencies) {
         const currencyCode = Object.keys(country.currencies)[0];
         const currencyName = country.currencies[currencyCode].name;
         currencyInfo = `${currencyCode} (${currencyName})`;
       }
       newDiv.innerHTML = `
           <h2>${country.name.common}</h2>
           <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
           <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
           <p><strong>Currency:</strong> ${currencyInfo}</p>
           <p><strong>Region:</strong> ${country.region}</p>
           <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
         `;
       oldContent.appendChild(newDiv);
     });
   }