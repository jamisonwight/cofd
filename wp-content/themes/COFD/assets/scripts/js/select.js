import $ from 'jquery'
import {ResizeObserver as Polyfill} from '@juggle/resize-observer'

if (!navigator.userAgent.includes('Safari')) {

  const ResizeObserver = window.ResizeObserver || Polyfill

  const ro = new ResizeObserver((entries, observer) => {
      entries.forEach((entry) => {
          // on start 
          $('select').each(function(index, obj){
            centerSelect($(this));
          });
      })
    })
    ro.observe(document.body); // Watch dimension changes on body


  function getTextWidth(txt) {
      var $elm = $('<span class="tempforSize">'+txt+'</span>').prependTo("body");
      var elmWidth = $elm.width();
      $elm.remove();
      return elmWidth;
    }
    function centerSelect($elm) {
        var optionWidth = getTextWidth($elm.children(":selected").html())
        var emptySpace =   $elm.width()- optionWidth;
        $elm.css("text-indent", (emptySpace / 2));// -10 for some browers to remove the right toggle control width
    }
    // on change
    $('select').on('change', function(){
      centerSelect($(this));
    });
}