(fillDatabank())()

function fillDatabank() {
    getMarket().then((data) => {
        $('#dtBank').find('table tbody').html("");
        Object.keys(data).forEach(function (coin) {
            $('#dtBank').find('table tbody').append(
                `<tr id="${coin.replace("/", "-")}-coin">
                    <td>${coin}</td>
                    <td id="${coin.replace("/", "-")}-idEx" class="text-center">0</td>
                    <td id="${coin.replace("/", "-")}-idDb" class="text-center">0</td>
                    <td class="td-actions text-center">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input style="display: none;" id="${coin.replace("/", "-")}-checkCoin" class="form-check-input" type="checkbox">
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                    </td>
                  </tr>`
            )

            db.collection("exchanges").doc("binance")
                .collection(coin.replace("/", "_")).get().then((query) => {
                    $(`#${coin.replace("/", "-")}-checkCoin`).css("display","block")
                    console.log(query.size)
                    if (!query.empty) { 
                    $(`#${coin.replace("/", "-")}-idDb`).html((query.docs[(query.docs.length-1)].id))
                    $(`#${coin.replace("/", "-")}-checkCoin`).click()
                    }
                })

        });
    })


    $("#dtBank").find('input[type="checkbox"]').change(function (e) {
        let id = e.target.id.replace("-checkCoin", "").replace("-", "/")
        if (e.target.checked) {
        } else {
        }
    });



}
