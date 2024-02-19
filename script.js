$(document).ready(function() {
  // Function to insert BB-code tags at the cursor position
  window.insertTag = function(tag) {
    var textarea = $('#editor')[0];
    var selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    var newText = '[' + tag + ']' + selectedText + '[/' + tag + ']';
    textarea.value = textarea.value.substring(0, textarea.selectionStart) + newText +
                     textarea.value.substring(textarea.selectionEnd);
  };

  // Function to insert [color] tag by typing
  window.insertColorTag1 = function() {
    var color = prompt('Enter color (HEX):', '#000000');
    if (color !== null) {
      var textarea = $('#editor')[0];
      var selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

      if (selectedText) {
        // If there is selected text, wrap it with the [color] tag
        var newText = '[color=' + color + ']' + selectedText + '[/color]';
        textarea.value = textarea.value.substring(0, textarea.selectionStart) + newText +
                         textarea.value.substring(textarea.selectionEnd);
      } else {
        // If there is no selected text, just insert the [color] tags at the cursor position
        insertTag('color=' + color);
      }
    }
  };

  // Function to insert [color] tag with color picker
  window.applyColor = function() {
    var colorPicker = $('#colorPicker')[0];
    var color = colorPicker.value;

    if (color !== null) {
      var textarea = $('#editor')[0];
      var selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

      if (selectedText) {
        // If there is selected text, wrap it with the [color] tag
        var newText = '[color=' + color + ']' + selectedText + '[/color]';
        textarea.value = textarea.value.substring(0, textarea.selectionStart) + newText +
                         textarea.value.substring(textarea.selectionEnd);}
    }
  };

  // Function to insert [NOBB] tag
  // window.insertNoBBTag = function() {
  //   insertTag('NOBB');
  // };

  // Function to preview the BB-code formatted text
  window.preview = function() {
    var editorContent = $('#editor').val();
    var previewContainer = $('#preview');
    previewContainer.html(parseBBCode(editorContent));
  };


  // Function to parse BB-code and convert it to HTML
  function parseBBCode(text) {
    // Define a mapping of BB code tags to their corresponding HTML replacements
    const tagMappings = {
      '\\[b\\]': '<strong>',
      '\\[/b\\]': '</strong>',
      '\\[i\\]': '<em>',
      '\\[/i\\]': '</em>',
      '\\[u\\]': '<u>',
      '\\[/u\\]': '</u>',
      '\\[/color\\]': '</span>',
      '\\[NOBB\\]': '<span class="nobb">',
      '\\[/NOBB\\]': '</span>'
    };

    // Replace each BB code tag one by one
    Object.keys(tagMappings).forEach(tag => {
      const replacement = tagMappings[tag];
      text = text.replace(new RegExp(tag, 'gi'), replacement);
    });


    text = text.replace(/\[color=([^\]]+?)\]/g, (match, color) => `<span style="color: ${color};">`);


    return text;
  }

});
