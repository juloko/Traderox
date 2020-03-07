(fillDatabank())()

function fillDatabank() {
    getMarket().then((data) => {
        $('#dtBank').find('table tbody').html("");
        Object.keys(data).forEach(function (coin) {
            $('#dtBank').find('table tbody').append(
                `<tr id="${coin.replace("/", "_")}-coin">
                    <td>${coin}</td>
                    <td id="${coin.replace("/", "_")}-idDb" class="text-center"></td>
                    <td id="${coin.replace("/", "_")}-idEx" class="text-center"></td>
                    <td class="td-actions text-center">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input style="display: none;" id="${coin.replace("/", "_")}-checkCoin" class="form-check-input" type="checkbox">
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
                    $(`#${coin.replace("/", "_")}-checkCoin`).css("display", "block")
                    if (!query.empty) {
                        let b = query.docs.map(value => value.id * 1);
                        b = quickSort(b);
                        maxB = b[b.length - 1];
                        let index = 1
                        for (index; index < maxB; index++) {
                            if (index !== b[(index - 1)]) {
                                break
                            }
                        }
                        $(`#${coin.replace("/", "_")}-idDb`).html(index - 1)
                        if (!$(`#${coin.replace("/", "_")}-checkCoin`)[0].checked) {
                            $(`#${coin.replace("/", "_")}-checkCoin`).click()
                        }

                    }
                }).catch(error => {
                    dangerError(error)
                });
        });

        $("#dtBank").find('input[type="checkbox"]').change(function (e) {
            let symbol = e.target.id.replace("-checkCoin", "").replace("_", "/")
            if (e.target.checked) {

                getNowTick(symbol).then((data) => {
                    console.log(data)
                    console.log(symbol)
                    $(`#${symbol.replace("/", "_")}-idEx`).html(data[0].id)
                })
            }
        });
    })

}

