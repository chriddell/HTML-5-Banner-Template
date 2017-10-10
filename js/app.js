var element;
var loopCounter = 0;
var timerInt;
var maxLoops = 3; // No. of animation loops
var element_array = [ /* element IDs to loop animate */ ];

function politeInit() {

  // Show elem
  var el = document.getElementById( 'banner' );
  el.style.opacity = 1;
  el.style.display = 'block';

  // Start the timer
  startTimer();
}

function clicktagInit(){
  // Add vendor specific code
}

function startTimer() {

  loopCounter++;

  if ( loopCounter < maxLoops ){

    timerInt = setTimeout( resetClasses, 10000 );
  }
}

function resetClasses(){

  for ( var i = 0; i < element_array.length; i++ ) {

    resetClass( element_array[i] );
  }
}

function resetClass( id ) {

  element = document.getElementById( id );
  var aniClass = element.getAttribute( 'data-animation-class' );
  element.classList.remove( aniClass );
  element.offsetWidth = element.offsetWidth;
  element.classList.add( aniClass );
        
  startTimer();
}

// Stop banner when user switches tabs
(function() {
  var hidden = "hidden";

  // Standards:
  if ( hidden in document )
    document.addEventListener( 'visibilitychange', onchange );
  else if ( ( hidden = 'mozHidden' ) in document )
    document.addEventListener( 'mozvisibilitychange', onchange );
  else if ( ( hidden = 'webkitHidden' ) in document )
    document.addEventListener( 'webkitvisibilitychange', onchange );
  else if ( ( hidden = 'msHidden' ) in document )
    document.addEventListener( 'msvisibilitychange', onchange );
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
    clearTimeout( timerInt );
    resetClasses();
    // loopCounter = 0;
    // timerInt = setTimeout(resetClasses, 10000);
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  //if( document[hidden] !== undefined )
    //onchange({type: document[hidden] ? "blur" : "focus"});
})();

/**
 * Populate data-animation-class property
 * with animation class on load
 */
(function() {

  // Get all the nodes
  var allElements = document.getElementsByTagName( '*' );

  // Run loop on all the nodes
  for ( var i = 0; i < allElements.length; i++ ) {

    // vars
    var el = allElements[i], // current element
        currentClasses = el.className, // classes as a string
        result = /.a-*/.test( currentClasses ); // test if animation class in classes

    // If element has animation classs   
    if ( result == true ) {

      // Get the last class of classList 
      // (because it will always be the animation class)
      var j = el.classList.length,
          k = el.classList[j - 1];

      // Set data-animation-class attr as animation class from classList
      el.setAttribute( 'data-animation-class', k );
    }
  }
})();
