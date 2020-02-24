function fillExchangesAvailable(data) {
  $('#workExchanges').find('tbody').html("");
  $('#workExchanges').find('.card-category').html(`Availables (${data.length})`);
  $("#workExchanges").find('.card-body').show()
  data.forEach(element => {
    $('#workExchanges').find('table tbody').append(
      `<tr id="${element}-coin>
          <td>Components</td>
          <td class="text-center"></td>
          <td class="text-center">160</td>
          <td>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="" checked="">
                <span class="form-check-sign">
                  <span class="check"></span>
                </span>
              </label>
            </div>
          </td>
        </tr>`
    )
  });
}
