const drawWinText = (textArea, winner) => {
  textArea.text(`${winner} Victory!`).attr('class', `${winner}-text`);
};

export default drawWinText;
