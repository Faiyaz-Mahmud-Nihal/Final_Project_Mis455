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
   
   