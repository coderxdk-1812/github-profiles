const APIURL = "https://api.github.com/users/"
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try { }
    catch (err) {
        if (error.response.status == 404) {
            createErrorCard("No profile with this username!!")
        }
    }

}