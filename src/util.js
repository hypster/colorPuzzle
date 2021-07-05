export function shuffle(arr){
  for(let i = arr.length-1; i>0;i--){
    let j = Math.floor(Math.random(i+1))
    let x = arr[i]
    arr[i] = arr[j]
    arr[j] = x
  }
  return arr
}

export function generateRGB(){
  let arr = []
  for (let i = 0; i < 3; i++){
    arr.push(Math.floor(Math.random()*256))
  }
  return arr
}