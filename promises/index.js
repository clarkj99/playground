let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Success!'), 250)
})

myPromise.then((message) => {
    console.log('Yay! ' + message);
}) 