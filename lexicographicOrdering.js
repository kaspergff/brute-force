// Ordering Function
function LexoOrder(array){

  var LargestI = -1;
  for (var i = 0; i < array.length - 1; i++) {
    if(array[i] < array[i+1])
      LargestI = i;
  }

   var LargestI2 = -1;
   for (var j = 0; j < array.length; j++) {
     if (array[LargestI2] < array[j]) {
      LargestI2 = j;
    }
  }
  SwitchArray(array,LargestI,LargestI2);

  var endArray = array.splice(LargestI + 1);
  endArray.reverse();
  arrayEnd = array.concat(endArray);

  return arrayEnd;

}

function SwitchArray(array, indexA, indexB){
  var temp = array[indexA];
   array[indexA] = array[indexB];
   array[indexB] = temp;
}
