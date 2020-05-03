const AppStoresDownloadOffset = 1500;
const DefaultValue = 8000;

const getReleases = async () =>
  new Promise((resolve, reject) => {
    $.ajax({
      accepts: {
        'Accept-Encoding': 'gzip,deflate,br'
      },
      dataType: "json",
      url: 'https://api.github.com/repos/burst-apps-team/phoenix/releases',
    })
      .done(resolve)
      .fail(() => resolve(DefaultValue))
  })

const calcDownloadCount = releases => {

  const executablesFilter = ({name}) => name.endsWith('.exe')
    || name.endsWith('.deb')
    || name.endsWith('.rpm')
    || name.endsWith('.AppImage')
    || name.endsWith('.tar.gz')
    || name.endsWith('.zip')
    || name.endsWith('.dmg')

  let assetList = []
  releases.forEach(({assets}) => {
    assetList.push(...assets.filter(executablesFilter))
  })
  const downloadCount = assetList.reduce((acc, {download_count}) => (acc + download_count), AppStoresDownloadOffset);

  return Promise.resolve(downloadCount)
};

const insertDownloadCountInHtml = downloadCount => {
  console.log('download count', downloadCount)
  $('#download-count').text(downloadCount)
};

const blurNumber = n => Promise.resolve(Math.round(n / 50) * 50)

insertDownloadCountInHtml(DefaultValue)

getReleases()
  .then(calcDownloadCount)
  .then(blurNumber)
  .then(insertDownloadCountInHtml)
