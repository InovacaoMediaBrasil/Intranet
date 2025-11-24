const bannersFeed = 'https://marketing.editorainovacao.com.br/banners.php'

function initializeBanner () {
  $.ajax({
    url: bannersFeed,
    type: 'GET',
    dataType: 'JSON',
    success: function (data) {
      processBanner(data)
    }
  })
}

function processBanner (json) {
  if (typeof window.banner === 'undefined') return
  let b = findByProperty(json, 'department', window.banner.toLowerCase())
  const bAll = findByProperty(json, 'department', 'all')
  if (b === null && bAll === null) return
  if (b === null) b = bAll
  const fileName = b.url + '?changeDate=' + b.changeDate
  const img = new Image()
  img.onload = function () {
    $('section.operation').prepend(
      "<header class='banner'><img src='" +
        fileName +
        "' alt='Atualizações' title='Atualizações' /></header>"
    )
  }
  img.src = fileName
}
