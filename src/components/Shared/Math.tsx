export function round(arr: Array<number>) {
    if (arr.length == 2) {
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

    if (arr.length == 4) {
      let number_split = [];
      let five_index = [];
      let summ = 0;
      let result = []

      for(let i = 0; i < arr.length; i++) {
          number_split.push([
              i, 
              parseInt(String(arr[i]).split('.')[0]),  
              parseInt(String(arr[i]).split('.')[1]) ? parseInt(String(arr[i]).split('.')[1].split('')[0]) : 0
          ]);
      }

      number_split.sort((a, b) => {
          return b[1] - a[1];
      })

      for (let i = 0; i < number_split.length; i++) {
          if (number_split[i][2] > 5) {
              number_split[i][1]++;
              number_split[i][2] = 0;
          }
          if (number_split[i][2] == 5) {
              five_index.push(i);
          }
          if (number_split[i][2] < 5) {
              number_split[i][2] = 0;
          }
      }

      for (let i = 0; i < five_index.length; i++) {
          if (i%2 != 0) {
              number_split[five_index[i]][1]++;
              number_split[five_index[i]][2] = 0;
          } else {
              number_split[five_index[i]][2] = 0;
          }
      }

      number_split.map(set => { summ += parseFloat(`${set[1]}.${set[2]}`) });
      if (summ == 99) {
          number_split[0][1]++;
      }

      if (summ > 100) {
        number_split[0][1] -= (summ - 100)
      }

      for (let i = 0; i < number_split.length; i++) {
          result.push(parseFloat(`${number_split[i][1]}.${number_split[i][2]}`))
      }

      return result;
    }
}