const AppStoresDownloadOffset = 1500;
const DefaultDownloadValue = 8000;
const DefaultStatsValues = {
  pulls: 1000,
  stars: 64
};

const DefaultAjaxOptions = {
  accepts: {
    'Accept-Encoding': 'gzip,deflate,br'
  },
  dataType: "json",
}

const GraphQL = (gql) => {
  return {
    ...DefaultAjaxOptions,
    method: 'POST',
    url: 'https://phoenix-analytics-api.ohager.now.sh/api/github',
    data: JSON.stringify({query: gql})
  }
}

const getReleases = async () =>
  new Promise((resolve, reject) => {
    $.ajax({
      ...DefaultAjaxOptions,
      url: 'https://api.github.com/repos/signum-network/phoenix/releases',
    })
      .done(resolve)
      .fail(reject)
  })

const getRepoStatsCount = async () => new Promise((resolve, reject) => {
  $.ajax(GraphQL(`query {
    repository(owner:"signum-network", name:"phoenix") {
      pullRequests {
        totalCount
      }
      stargazers {
        totalCount
      }
    }
  }`)
  )
    .done(({data}) => {
      resolve({
        pulls: data.repository.pullRequests.totalCount,
        stars: data.repository.stargazers.totalCount
      })
    })
    .fail(reject)
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
  $('#download-count').text(downloadCount)
};

const insertLatestVersionInHtml = latestVersion => {
  $('#latest-release > p').text(`Latest release: ${latestVersion}`)
  $('#latest-release a').attr('href', `https://github.com/signum-network/phoenix/releases/tag/desktop-${latestVersion}`)
  $('#latest-release').attr('hidden', null)
};

const insertLatestVersionDownloadLinksInHtml = latestVersion => {
  const baseUrl = `https://github.com/signum-network/phoenix/releases/download/desktop-${latestVersion}`
  const winUrl = `${baseUrl}/win-phoenix-signum-wallet-setup.${latestVersion}.exe`
  const macUrl = `${baseUrl}/mac-phoenix-signum-wallet.${latestVersion}.dmg`
  const linuxUrl = `${baseUrl}/linux-phoenix-signum-wallet.${latestVersion}.deb`
  $('#download-win').attr('href', winUrl).removeClass('disabled')
  $('#download-mac').attr('href', macUrl).removeClass('disabled')
  $('#download-linux').attr('href', linuxUrl).removeClass('disabled')
};

const insertRepoStatsInHtml = ({pulls, stars}) => {
  $('#pulls-count').text(pulls)
  $('#stars-count').text(stars)
};

const blurNumber = n => Math.round(n / 50) * 50 - 50

insertDownloadCountInHtml(DefaultDownloadValue)
insertRepoStatsInHtml(DefaultStatsValues)


const printLatestVersion = releases => {
  const latestVersion = releases[0].tag_name.replace('desktop-', '')
  insertLatestVersionInHtml(latestVersion)
  insertLatestVersionDownloadLinksInHtml(latestVersion)
  return Promise.resolve(releases)
}

const filterDesktopVersion = releases => releases.filter( ({tag_name}) => tag_name.indexOf('desktop-') !== -1 )

getReleases()
  .then(filterDesktopVersion)
  .then(printLatestVersion)
  .then(calcDownloadCount)
  .then(count => Promise.resolve(blurNumber(count)))
  .then(insertDownloadCountInHtml)

getRepoStatsCount()
  .then(({pulls, stars}) => Promise.resolve({
      pulls: blurNumber(pulls),
      stars
    })
  )
  .then(insertRepoStatsInHtml)

