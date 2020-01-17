let jsonEx = /^(\[|\{)|(\]|\})$/;

export let StringToJson = str => {
  if (jsonEx.test(str)) {
    return JSON.parse(str);
  } else {
    return null;
  }
};
