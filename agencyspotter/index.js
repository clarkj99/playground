/*
    Return the movie titles as a sorted array of strings.
    Use the "request" function to solve the problem.
*/
async function getMovieTitles(substr) {
    // initialization
    let pageNumber = 1
    let titles = []
    let totalPages = 0

    // request pages until we're done
    do {
        let response = await request(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${pageNumber}`)
        let jsonResponse = JSON.parse(response)
        totalPages = jsonResponse.total_pages
        let data = jsonResponse.data
        titles.push(...data.map(movie => movie.Title))
        pageNumber += 1
    } while (pageNumber <= totalPages)
    return titles.sort()
}

const https = require('https');

// Helper function that wraps the node https.get method.
// returns a promise of the response as a string.
function request(url) {
    // create promise.
    return new Promise((resolve, reject) => {
        // create get request.
        const request = https.get(url, (response) => {
            let buffer = ''

            // when a data chunk is received, convert it into a string and
            // add it to the buffer.
            response.on('data', (chunk) => {
                buffer += chunk.toString('utf8')
            })

            // at end of stream, resolve with full response as string.
            response.on('end', () => {
                resolve(buffer)
            })

            // reject if the response errors.
            response.on("error", reject)
        })

        // reject if the request errors.
        request.on('error', reject)
    })
}

async function main() {
    try {
        const titles = await getMovieTitles('spiderman')

        for (const title of titles) {
            console.log(title)
        }
    } catch (e) {
        console.log("There was an Error!")
        throw e
    }
}

main()
