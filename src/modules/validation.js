function isRequired(value){
  if(value && value.trim()){
    return true
  }
  return '入力してください。'
}

function commonLengthIsBetween(property, value){
  switch(property){
    case 'nickname':
      if(value.length >= 4 && value.length <= 50){
        return true
      }
      return '名前は4文字〜50文字で入力してください。'
  
  }
}

function nicknameLengthIsBetween(value){
  return commonLengthIsBetween('nickname', value)
}

function isUnique(value){
  console.log(this)
}

const nicknameRules = [isRequired, nicknameLengthIsBetween]

export { nicknameRules, isUnique }