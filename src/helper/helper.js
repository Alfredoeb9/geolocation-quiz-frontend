export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers) {
  // console.log('result::', result)
  // console.log('answers::', answers)
  return result
    .map((ele, i) => Number(answers[i].answer) == Number(ele))
    .filter((i) => i)
    .map((i) => 10)
    .reduce((prev, curr) => prev + curr, 0);
}
