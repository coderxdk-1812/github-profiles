const APIURL = "https://api.github.com/users/"
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
form.addEventListener('submit', function(evt){
    evt.preventDefault();
    console.log("event data", evt)
    const user = search.value

    if (user != "" || user != " ") {
        getUser(user)
    }
})

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
        console.log(data)
        createUserCard(data)
        getRepos(username)
    }
    catch (error) {
        if (error.response.status == 404) {
            createErrorCard("No profile with this username!!")
        }
    }
}
async function getRepos(username) {
    try {
        const {data} = await axios(APIURL + username + "/repos?sort=created")
        console.log('repositories',data)
        addReposToCard(data)
    }
    catch (err) {
        console.log("error", err)
        createErrorCard("Problem Fetching Repos! Please try again later!")
    }
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos")
    repos.slice(0,5).forEach(repo => {
      const repoEl = document.createElement('a')  
      repoEl.classList.add('repo')
      repoEl.href = repo.html_url
      repoEl.target = '_blank'
      repoEl.innerText = repo.name
      reposEl.appendChild(repoEl)
    });

}

function createErrorCard(msg) {
    const cardhtml = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
`
    main.innerHTML = cardhtml
}

function createUserCard(user) {
    const userid =user.name||user.login
    const userbio = user.bio ? `<p>${user.bio}</p>`:""
    const cardhtml=
    `
        <div class="card">
        <div>
          <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
          <h2>${userid}</h2>
          ${userbio}
          <ul>
            <li> ${user.followers} <strong>Followers</strong> </li> 
            <li> ${user.following} <strong>Following</strong> </li> 
            <li> ${user.public_repos} <strong>Repos</strong>  </li>  
          </ul>
          <div id="repos"></div>
        </div>
      </div>
        ` 
main.innerHTML=cardhtml
}

