const getReleases = async () =>
  new Promise((resolve, reject) => {
    $.ajax({
      accepts: {
        'Accept-Encoding': 'gzip,deflate,br'
      },
      dataType: "json",
      url: 'https://api.github.com/repos/burst-apps-team/phoenix/releases',
    })
      .done((data) => {
        console.log(data)
        resolve(data)
      })
      .fail(reject)
  })

function calcDownloadCount(releases) {

  const executablesFilter = ({name}) => name.endsWith('.exe')
    || name.endsWith('.deb')
    || name.endsWith('.rpm')
    || name.endsWith('.AppImage')
    || name.endsWith('.tar.gz')
    || name.endsWith('.zip')
    || name.endsWith('.dmg')

  let assetList = []
  releases.forEach( ({assets}) => {
    assetList.push(...assets.filter(executablesFilter))
  } )
  const downloadCount = assetList.reduce( (acc, {download_count}) => (acc + download_count), 0);

  return Promise.resolve(downloadCount)
}

function insertDownloadcountInHtml(downloadCount) {
  $('#download-count').text(downloadCount)
}



(()=>{
  getReleases()
    .then(calcDownloadCount)
    .then(insertDownloadcountInHtml)
})()
