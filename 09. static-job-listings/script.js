const filterSection = document.querySelector('.filter-section-wrapper')
const filteredTags = document.querySelector('.filtered-tags')
const jobContainer = document.querySelector('.job-card-container')
const clearBtn = document.querySelector('.clear-btn')

let filteredTagsArr = []
let matchedTagIDArr = []

// Gets JSON data
async function getData() {
  const res = await fetch('/data.json')
  const data = await res.json()

  return data
}

// Loads Data, calls createCards, passes in the items
function loadData() {
  getData().then((data) => {
    data.forEach((items) => {
      createCards(items)
    })
    createFilteredJobTags()
  })
}

// Creates Cards
function createCards(items) {
  const card = document.createElement('div')
  card.classList.add('job-card')
  card.setAttribute('id', `${items.id}`)

  items.featured == true
    ? card.classList.add('featured-card')
    : card.classList.remove('featured-card')
  card.innerHTML = `
        <div class="job-detail-wrapper">
        <div class="company-logo">
          <img src="${items.logo}" alt="${items.company}-logo" />
        </div>
        <div class="job-details">
          <div class="company-wrapper">
            <h1 class="company">${items.company}</h1>
            ${
              items.newJob != true
                ? ''
                : `<span class="pill new"><p>NEW!</p></span>`
            }
            ${
              items.featured != true
                ? ''
                : `<span class="pill featured"><p>FEATURED</p></span>`
            }
          </div>
          <div class="position">
            <h2>${items.position}</h2>
          </div>
          <div class="contract-and-location">
            <small class="posted">${items.postedAt}</small>
            <span class="divide-dot">•</span>
            <small class="contract">${items.contract}</small>
            <span class="divide-dot">•</span>
            <small class="location">${items.location}</small>
          </div>
        </div>
        </div>
        <div class="card-divider"></div>
        <div class="roles-and-skills">
            <div class="tags role"><p>${items.role}</p></div>
            <div class="tags level"><p>${items.level}</p></div>
            ${langAndTools(items)}
        </div>
        `
  jobContainer.append(card)
}

// Add Langs and Tools Data to Card
function langAndTools(items) {
  let outputString = ''

  items.languages.forEach((lang) => {
    outputString += `<div class="tags languages"><p>${lang}</p></div>`
  })

  items.tools.forEach((tool) => {
    outputString += `<div class="tags languages"><p>${tool}</p></div>`
  })
  return outputString
}

// Creates job tags and pushes to Gobal Variable
function createFilteredJobTags() {
  const tagEls = document.querySelectorAll('.tags')

  tagEls.forEach((tag) => {
    tag.addEventListener('click', () => {
      let tagElsText = tag.innerText

      const tagEl = document.createElement('div')
      tagEl.classList.add('filtered-tag')
      tagEl.innerHTML = `
            <p class="filtered-tag-text">${tagElsText}</p>
            <div class="filtered-tag-close-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
             >
                <path
                  fill="#FFF"
                  fill-rule="evenodd"
                  d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
                />
              </svg>
            </div>
            `
      filterSection.classList.add('active')
      filteredTagsArr.push(tagEl)
      filteredTagsArr.forEach((filteredTag) => {
        filteredTags.append(filteredTag)
      })

      deleteFilteredTags()
      clearFilteredTags()
      filterJobTags(tagEls)
    })
  })
}

// Finds ids of cards that don't match the tags in the filter section
// Allow these to then be hidden when filtering
function findMissingElId(matchedTagIDArr, cards) {
  let a = matchedTagIDArr.map(Number)
  count = cards.length
  noMatchCardIds = []

  for (let i = 1; i <= count; i++) {
    if (a.indexOf(i) === -1) {
      noMatchCardIds.push(i)
    }
  }
  return noMatchCardIds
}

// Filters through cards, matches filterTags with cardTags
// Display 'none'/'flex' depending on match/no match
function filterJobTags(tagEls) {
  const cards = document.querySelectorAll('.job-card')

  filteredTagsArr.map((filterTag) => {
    for (let tagEl of tagEls) {
      if (filterTag.innerText == tagEl.innerText) {
        let tagElIds = tagEl.parentElement.parentElement.id
        matchedTagIDArr.push(tagElIds)
        // tagEl.style.backgroundColor = 'var(--desaturated-dark-cyan)'
        // tagEl.style.color = 'var(--white)'
      }

      matchedTagIDArr.map((matchedId) => {
        cards.forEach((card, i) => {
          findMissingElId(matchedTagIDArr, cards)

          if (matchedId == i + 1) {
            card.style.display = 'flex'
          }

          noMatchCardIds.map((noMatchCard) => {
            if (card.id == noMatchCard) {
              card.style.display = 'none'
            }
          })
        })
      })
    }
  })
}

// Deletes tags
function deleteFilteredTags() {
  filteredTagsArr.forEach((tag) => {
    tag.addEventListener('click', () => {
      let idx = filteredTagsArr.indexOf(tag)
      filteredTagsArr.splice(idx, 1)
      tag.remove()

      if (filteredTags.innerHTML == '') {
        filterSection.classList.remove('active')
      }
    })
  })
}

// Clears all tags
function clearFilteredTags() {
  const clearBtn = document.querySelector('.clear-btn')

  clearBtn.addEventListener('click', () => {
    filteredTags.innerHTML = ''
    filteredTagsArr = []
    filterSection.classList.remove('active')
    jobContainer.innerHTML = ''
    loadData()
  })
}

loadData()
