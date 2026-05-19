const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const alphabetLength = alphabet.length;

function randomLetter() {

  const index =
    Math.floor(Math.random() * alphabetLength);

  return alphabet[index];
}

function shiftLetter(letter, shift) {

  const isLetter = /[a-zA-Z]/.test(letter);

  if (!isLetter) {
    return letter;
  }

  const isUpperCase =
    letter === letter.toUpperCase();

  const lowerLetter =
    letter.toLowerCase();

  const currentIndex =
    alphabet.indexOf(lowerLetter);

  const newIndex =
    (currentIndex + shift + alphabetLength)
    % alphabetLength;

  let newLetter =
    alphabet[newIndex];

  if (isUpperCase) {
    newLetter =
      newLetter.toUpperCase();
  }

  return newLetter;
}

function encrypt(message, shift) {

  const normalizedShift =
    shift % alphabetLength;

  let encryptedMessage = '';

  let index = 0;

  for (let i = 0; i < message.length; i++) {

    const char = message[i];

    const isLetter =
      /[a-zA-Z]/.test(char);

    if (isLetter) {

      encryptedMessage +=
        shiftLetter(char, normalizedShift);

      if (index % 2 === 1) {

        encryptedMessage +=
          randomLetter();
      }

      index++;

    } else {

      encryptedMessage += char;
    }
  }

  return encryptedMessage;
}

function decrypt(encryptedMessage, shift) {

  const normalizedShift =
    shift % alphabetLength;

  let decryptedMessage = '';

  for (let i = 0; i < encryptedMessage.length; i++) {

    if (i % 3 === 2) {
      continue;
    }

    const char =
      encryptedMessage[i];

    const isLetter =
      /[a-zA-Z]/.test(char);

    if (isLetter) {

      decryptedMessage +=
        shiftLetter(char, -normalizedShift);

    } else {

      decryptedMessage += char;
    }
  }

  return decryptedMessage;
}

function handleEncrypt() {

  const message =
    document.getElementById('message').value;

  const shift =
    Number(document.getElementById('shift').value);

  const result =
    encrypt(message, shift);

  document.getElementById('output').textContent =
    result;
}

function handleDecrypt() {

  const message =
    document.getElementById('message').value;

  const shift =
    Number(document.getElementById('shift').value);

  const result =
    decrypt(message, shift);

  document.getElementById('output').textContent =
    result;
}