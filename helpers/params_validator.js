export const validator = ( words) => {
if (typeof emptyPuzzle !== 'string') {
        console.log('Error');
        return;
    }

    let i = 0; j = i + 1;
    let validity = true;

    while (i < words.length && j < words.length) {
        if (words[i] !== words[j]) {
            j++
        } else {
            validity = false;
            break
        }
        if (i === words.length - 1) {
            i++
        }
    }

    if (!validity) {
        console.log('Error');
        return
    }

    if (words.length < 3 || !/^[.\n012]+$/.test(emptyPuzzle) || !Array.isArray(words)) {
        console.log('Error');
        return;
    }

    let foundInvalidWord = false;

    for (let i = 0; i < words.length; i++) {
        if (typeof words[i] !== "string") {
            foundInvalidWord = true;
            break;
        }
    }

    if (foundInvalidWord) {
        console.log("Error");
        return;
    }
};
export const checDuplicate = (words) => {
  let set = new Set(words);  
  return set.size == words.length;
};

    let i = 0; j = i + 1;
    let validity = true;

    while (i < words.length && j < words.length) {
        if (words[i] !== words[j]) {
            j++
        } else {
            validity = false;
            break
        }
        if (i === words.length - 1) {
            i++
        }
    }