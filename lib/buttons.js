const getButtons = () => {
  const dataButton = document.getElementById('get-data');
  const advButton = document.getElementById('graph-advantage');
  const clearButton = document.getElementById('clear-button');
  return { dataButton, advButton, clearButton };
};

export default getButtons;
