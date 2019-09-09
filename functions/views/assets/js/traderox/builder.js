function fillExchangesAvailable(data) {
    $('#workExchanges').find('tbody').html("");
    $('#workExchanges').find('.card-category').html(`Availables (${data.length})`);
    $("#workExchanges").find('.card-body').show()
    data.forEach(element => {
        $('#workExchanges').find('table tbody').append(
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
