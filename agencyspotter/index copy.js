
function minX(arr) {
    // Write your code here
    let sum = 0;
    let min = 1 - arr[0];
    arr.forEach(num => {
        sum += num
        if (min < (1 - sum)) {
            min = (1 - sum)
        }
        console.log(num, sum, min);
    })
    return min
}
console.log(minX([-5, 4, -2, 3, 1, -1, -6, -1, 0, 5]));
