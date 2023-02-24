export function round(arr: Array<number>) {
    let count = 0;
    for(let index in arr) {
      if (parseInt(String(arr[index]).split('.')[1]) == 5) {
        count++;
      }
    }
    if (count < 2) {
      return [Math.round(arr[0]), Math.round(arr[1])]
    }
    let value1 = Math.floor(arr[0])
    let value2 = Math.ceil(arr[1])

    return [value1, value2];
}