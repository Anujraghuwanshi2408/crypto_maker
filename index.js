var newData = [];
async function fetchData() {
    try {
        let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");

        newData = await response.json();
        console.log(newData);
        appendingRowData(newData);
    }
    catch (error) {
        console.log(error);

        
    }

}
fetchData().then(() => {
    console.log("data is fetched");
})
    .catch((error) => {
        console.log(error);
    });

    const tbody = document.getElementsByTagName('tbody')[0];
    // console.log(tbody.innerHTML);


    function appendingRowData(newData) {

        for (let data of newData) {
            // console.log(data);
            tbody.innerHTML += addingRows(data);
        }
    }
    function addingRows(data) {
        return `<tr>
        <td>
          <img
            src=${data.image}
            alt=${data.id}
          />
        </td>
        <td>${data.name}</td>
        <td id="symbol">${data.symbol.toUpperCase()}</td>
        <td style="text-align: right;">$${data.current_price}</td>
        <td style="text-align: right;">$${data.total_volume}</td>
        <td style="text-align:center;${data.price_change_percentage_24h.toFixed(2) >= 0 ? "color:green;" : "color:red;"}">${data.price_change_percentage_24h.toFixed(2)}%</td>
        <td style="text-align:right;">Mkt Cap: $${data.market_cap} </td>
      </tr>
      `
    }


    // searching the data based on input\\
    let input = document.getElementsByTagName('input')[0];
    input.addEventListener('change', searchData);

    function searchData(event) {
        console.log(event.target.value);
        inputValue = event.target.value.toLowerCase();
        console.log(inputValue);
        tbody.innerHTML = "";
        for (let data of newData) {
            // console.log(data);
            if (data.symbol.toLowerCase() === inputValue || data.name.toLowerCase() === inputValue) {
                tbody.innerHTML += addingRows(data);
                // console.log(tbody.innerHTML);
            }
        }
        event.target.value = "";
    }

    // ----------------sort by market cap----------------------------->

    let marketCap = document.getElementById('marketCap');
    marketCap.addEventListener('click', sortByMktCap);

    function sortByMktCap() {
        
        console.log(marketCap);
        newData.sort(function (ob1, ob2) {
            return ob1.market_cap > ob2.market_cap;
        })
        tbody.innerHTML = "";
        for (let data of newData) {
            tbody.innerHTML += addingRows(data);
        }
    }


    //---------------------sort by percentage ---------------------------->
    let sortPercetage = document.getElementById('sortPercetage');
    sortPercetage.addEventListener('click', sortByPercetage);


    function sortByPercetage() {
        console.log(sortPercetage);

        newData.sort(function (ob1, ob2) {
            return ob1.price_change_percentage_24h.toFixed(2) > ob2.price_change_percentage_24h.toFixed(2);
        })

        tbody.innerHTML = "";

        for (let data of newData) {
            tbody.innerHTML += addingRows(data);
        }

    }

