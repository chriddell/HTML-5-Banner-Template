var element;
var loop_counter = 0; // Start loop counter
var timerInt;
var max_loops = 3; // No. of animation loops
var element_array = [/* List IDs of elements to animate here */];

    
function politeInit() {
  document.getElementById('banner').style.opacity = 1;
  document.getElementById('banner').style.display = 'block';
  start_timer();
}

function clicktag_click(){
  window.open('', '_blank');
}

function start_timer() {
  loop_counter++;
  if(loop_counter < max_loops){
    timerInt = setTimeout(reset_classes, 10000);
  }
}

function reset_classes(){
  for (var i = 0; i < element_array.length; i++) {
    reset_class(element_array[i]);
  } 
}

function reset_class( id ) {
  element = document.getElementById( id );
  var aniClass = element.getAttribute('data-animation-class');
  element.classList.remove( aniClass );
  element.offsetWidth = element.offsetWidth;
  element.classList.add( aniClass );
        
  start_timer();
}


// Stop banner when user switches tabs
(function() {
  var hidden = "hidden";

  // Standards:
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide
    = window.onfocus = window.onblur = onchange;

  function onchange (evt) {
    //console.log('onchange')
    var v = "visible", h = "hidden",
      evtMap = {
        focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
      };

    evt = evt || window.event;
    //console.log('onchange = '+this[hidden] ? "hidden" : "visible");
    clearTimeout(timerInt);
    reset_classes();
    // loop_counter = 0;
    // timerInt = setTimeout(reset_classes, 10000);
  
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  //if( document[hidden] !== undefined )
    //onchange({type: document[hidden] ? "blur" : "focus"});
})();

/**
 * Populate data-animation-class property
 * with animation class
 */
(function() {
  // Get all the nodes
  var allElements = document.getElementsByTagName("*");

  // Run loop on all the nodes
  for ( var i = 0, n = allElements.length; i < n; i++ ) {

    // vars
    var el = allElements[i], // current element
        currentClasses = el.className, // classes as a string
        result = /.*__ani/.test(currentClasses); // test if animation class in classes

    // If element has animation classs   
    if ( result == true ) {

      // Get the last class of classList 
      // (because it will always be the animation class)
      var j = el.classList.length,
          k = el.classList[j - 1];

      // Set data-animation-class attr as animation class from classList
      el.setAttribute('data-animation-class', k);
    }
  }
})();

/* Get all IDs on page. Helper to populate 'element_array' variable */
/*
(function() {
  var allElements = document.getElementsByTagName("*");
  var allIds = [];
  for (var i = 0, n = allElements.length; i < n; ++i) {
    var el = allElements[i];
    if (el.id) { allIds.push(el.id); }
  }
  console.log(allIds);
})();
*/