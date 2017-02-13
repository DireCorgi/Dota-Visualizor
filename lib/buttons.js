const getButtons = () => {
  const dataButton = document.getElementById('get-data');
  const advButton = document.getElementById('graph-advantage');
  const clearButton = document.getElementById('clear-button');
  const itemButton = document.getElementById('item-button');
  return { dataButton, advButton, clearButton, itemButton };
};

export default getButtons;
