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
  new Promise(resolve => {
    $.ajax({
      ...DefaultAjaxOptions,
      url: 'https://api.github.com/repos/burst-apps-team/phoenix/releases',
    })
      .done(resolve)
      .fail(() => resolve(DefaultDownloadValue))
  })

const getRepoStatsCount = async () => new Promise((resolve) => {
  $.ajax(GraphQL(`query {
    repository(owner:"burst-apps-team", name:"phoenix") {
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
    .fail(() => resolve(DefaultStatsValues))
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

const insertRepoStatsInHtml = ({pulls, stars}) => {
  $('#pulls-count').text(pulls)
  $('#stars-count').text(stars)
};

const blurNumber = n => Math.round(n / 50) * 50 - 50

insertDownloadCountInHtml(DefaultDownloadValue)
insertRepoStatsInHtml(DefaultStatsValues)

getReleases()
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

