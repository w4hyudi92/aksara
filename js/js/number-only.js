function setInputFilterWithCustomFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

function setInputFieldsNumberOnly()
{

  $(".numberOnly").each(function(i, k){

        initAutoNumericField(k)

  })

}

function setInputFieldsNumberOnlySpecificArea(el)
{
  $(el).find(".numberOnly").each(function(i, k){
    initAutoNumericField(k)
  })  
}


function initAutoNumericField(el)
{
    if(el.anElement)
    {
      el.anElement.remove()
    }

    anElement = new AutoNumeric(el, { digitGroupSeparator : ',', decimalCharacter: '.', allowDecimalPadding :false });
    el.anElement = anElement
}


setInputFieldsNumberOnly();