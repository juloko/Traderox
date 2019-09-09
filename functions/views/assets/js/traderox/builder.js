function fillExchangesAvailable(data) {
    $('.workExchanges').find('table tbody').html("");
    $(".workExchanges").show()
    data.forEach(element => {
        $('.workExchanges').find('table tbody').append(
            `<tr id="${element}-workExcg">
                <td>
                ${element}
                </td>
                <td class="td-actions text-right">
                  <button type="button" rel="tooltip" title="" class="btn btn-link" data-original-title="Edit Task">
                    <i class="tim-icons icon-pencil"></i>
                  </button>
                </td>
              </tr>`
        )
    });
}
