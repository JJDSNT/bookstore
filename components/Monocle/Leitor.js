import React from "react"
import Script from 'next/script'



function Leitor(props) {


  // This will be called when the Epub object is fully initialized and
  // ready to get passed to the Monocle.Reader.
  function createReader(bookData) {
    Monocle.Reader("reader", bookData,  // The id of the reader element and the book data.
      {
        flipper: Monocle.Flippers.Instant,  // The rest is just fanciness:
        panels: Monocle.Panels.Magic
      },     // No animation and click anywhere
      function (reader) {                   // to turn pages.
        var stencil = new Monocle.Controls.Stencil(reader);  // Make internal links work.
        reader.addControl(stencil);
        var toc = Monocle.Controls.Contents(reader);         // Add a table of contents.
        reader.addControl(toc, 'popover', { hidden: true });
        createBookTitle(reader, { start: function () { reader.showControl(toc); } });
      }
    );
  }

  // This adds the book title to the top of each page.
  function createBookTitle(reader, contactListeners) {
    var bt = {}
    bt.createControlElements = function () {
      cntr = document.createElement('div');
      cntr.className = "bookTitle";
      runner = document.createElement('div');
      runner.className = "runner";
      runner.innerHTML = reader.getBook().getMetaData('title');
      cntr.appendChild(runner);
      if (contactListeners) {
        Monocle.Events.listenForContact(cntr, contactListeners);
      }
      return cntr;
    }
    reader.addControl(bt, 'page');
    return bt;
  }



  return (
    <>


      <div id="reader" />
      <h1>{props.title}</h1>

      <style global jsx>{`
      /*===========================================================================

      This is a base-level Monocle stylesheet. It assumes no class-prefix has been
      given to the Reader during initialisation - if one has, you can copy and
      modify this stylesheet accordingly.
      
      ---------------------------------------------------------------------------*/
      
      /* The reader object that holds pretty much everything.
       * (A direct child of the element passed to reader initialisation). */
      
      div.monelem_container {
        background-color: black;
      }
      
      
      /* The div that mimics a leaf of paper in a book. */
      div.monelem_page {
        background: white;
        top: 0;
        left: 0;
        bottom: 3px;
        right: 5px;
        border-right: 1px solid #999;
      }
      
      
      /* The div within the page that determines page margins. */
      div.monelem_sheaf {
        top: 1em;
        left: 1em;
        bottom: 1em;
        right: 1em;
      }
      
      
      /* The iframe within the page that loads the content of the book. */
      div.monelem_component {
      }
      
      
      /* A panel that sits above the entire reader object, holding controls. */
      div.monelem_overlay {
      }
      
      
      /* A full-size panel to display an announcement (iframe or div) */
      div.monelem_billboard_container {
        background: #FFF;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2000;
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
        transform: scale(0);
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        transform-origin: 0 0;
      }
      
      .monelem_billboard_inner {
        height: 100%;
        width: 100%;
        border: none;
        overflow: auto;
        /*-webkit-overflow-scrolling: touch;*/ /* This is sexy, but crashy. */
      }
      
      div.monelem_billboard_inner {
        min-width: 100%;
        min-height: 100%;
        text-align: center;
        vertical-align: middle;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
      }
      
      
      div.monelem_billboard_close {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 30px;
        color: white;
        background: #C00;
        cursor: pointer;
        border-bottom-left-radius: 4px;
        text-shadow: 1px 1px 1px #900;
        font: 9pt Helvetica Neue, Helvetica, sans-serif;
      }
      
      div.monelem_billboard_close:after {
        display: block;
        content: 'Close';
        width: 100%;
        line-height: 30px;
        text-align: center;
      }
      
      
      
      
      /*===========================================================================
        PANELS
      ---------------------------------------------------------------------------*/
      
      
      .monelem_panels_imode_panel {
        background: rgba(255,255,255,0.7);
        opacity: 0;
      }
      
      .monelem_panels_imode_backwardsPanel {
        -webkit-box-shadow: 1px 1px 3px #777;
        -moz-box-shadow: 1px 1px 3px #777;
        box-shadow: 1px 1px 3px #777;
      }
      
      .monelem_panels_imode_forwardsPanel {
        -webkit-box-shadow: -1px 1px 3px #777;
        -moz-box-shadow: -1px 1px 3px #777;
        box-shadow: -1px 1px 3px #777;
      }
      
      .monelem_panels_imode_centralPanel {
      }
      
      .monelem_panels_imode_toggleIcon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      
      /* If you modify this you could significantly change the way panels work. */
      div.monelem_controls_panel_expanded {
        left: 0 !important;
        width: 100% !important;
        z-index: 1001 !important;
      }
      
      /*===========================================================================
        Flippers
      ---------------------------------------------------------------------------*/
      
      div.monelem_flippers_slider_wait {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 92px;
        height: 112px;
        background-repeat: no-repeat;
        -webkit-background-size: 100%;
        -moz-background-size: 100%;
        background-size: 100%;
      }
      
      @media screen and (max-width: 640px) {
        div.monelem_flippers_slider_wait {
          width: 61px;
          height: 75px;
        }
      }
      
      
      /*===========================================================================
        DATA URIs
      
        These are data-uri packed images, inlined for loading speed and simplicity.
        Placed at the end of this file because they're visually noisy...
      ---------------------------------------------------------------------------*/
      
      div.monelem_panels_imode_toggleIcon {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAABV0RVh0Q3JlYXRpb24gVGltZQAzMC82LzEwBMfmVwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAANYSURBVEiJtdZbiNVVFMfxj8cx85JkIGlqSESgOGA9WIQgGmTRUyRaYFJDnUWYGV2eyiCpkIbEKJI1UqYvUkmFDxFBgpghonajSDCM7hcxLSnt4ulh%2F2c4HufMTOH8Xs75%2F%2Ffa67v3%2Bu%2B91hphGJWZNUzCXJyKiHd6xxqNhhGDTB6NOViAyzARY3EaP%2BNL7MCBiPi9Ze4leBlTsR9jcCnuiYgDbeGZeV4F7EINe7EP3%2BJ49W4GrsZ8NPAGXouIk5k5F93YFhHPVT5H4kbcjaX1ev3kWfDMPB9P4ko8ERE7BopONWcOVmMc1uBRrG8Oc5Ptq1hdr9cPdrQMTMUWfBQRCweD9ioiPsQtmbkeu7G8P3ClsZSI98EzcxqeUsLXM1RwZs7ErRiJKXgQN2Tmzoj4qsV2Hn7BYcq369UaHIqI5yPizyGCx2MPfsRVOBoR6%2FA%2BNmXmqCbbm%2FAiMiJO9cEzcwEuwLODwMZk5oXVLYA6PouIF%2FC6cvBgI37D0mreStyJroh4r9df785XYGtEHG8Hfnjb1w08Xu2qq3regtOZuaka2whV5NZieWY%2BhkV4ICJ2N%2FusZeYMJQm8NdCuuxdPH4HENGzsXjx9REQcqRxvR2dEfNBrHxF7lHywGPXW7085cEvwZkScHAheaRz%2BwngcqyAnlEPan%2Fbh5oj4rr%2FBDlyOXUMA%2Fx%2F9oFytM5SZs3t6epbWlOtxeJjg%2BzEmMye3vF%2BCYx2YhdFnTTs3OoQT2JqZ3TiC2zETyzrwrnIwhkMTqwVsxW24GLsiYmWj0dCBo2gNy7nSRfgpIjZjM6WU1ut1lHt%2BGLOHCd6J79sN1pSkMSUzJwwD%2FBoD5I9aRHyiFIVFQ3D2j1KR%2Fh7MMDPnY1JE7GwLr3434N5BnI3GFRiFzuai0Ub34aWBDGr0pcKPM%2FPpqovpT11KoVinNAvXt1lkLTNXKFesXU1HUz3HI0plWqW0QGcoIjYoERpMy7AS17b2da06o43KzLF4RanRzwwx3%2FfOHYW7lL5ubUR83p9do9Ho%2B99fDzcZDynfdxPejog%2FBoCOxHW4AxOwKiK%2BaGc%2FILzJ6ULcXznciwM4qFSzCUob3Km0UCeU3W5v5%2B8%2FwZsWMQvzlN1Nq8C%2F4ht8qkRm72B%2B%2BoP%2FC0sEOftJmUbfAAAAAElFTkSuQmCC);
      }
      
      div.monelem_flippers_slider_wait {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABwCAMAAACkX%2BcnAAAB0VBMVEUAAACDg4OEhISFhYWGhoaHh4eIiIiJiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4%2BQkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJycnJ2dnZ2dnZ6dnZ%2Benp6enp%2Bfn5%2Bfn6CgoKCgoKGhoKChoaGioqKjo6OkpKSlpaWmpaWmpqaoqKiqqqqrq6usrKytra2urq6wsLCxsbGzs7O0tLS0tLW1tbW1tba1tbe2tri4uLi4uLm4uLq6ury7u7y8vLy8vL28vL%2B9vb2%2Bvr6%2Bvr%2B%2Fv7%2B%2Fv8HAwMDAwMLAwMPBwcPCwsPExMTExMXFxcXGxsbHx8fIyMjJycrOztDOztHPz9DPz9HR0dTS0tTT09TT09XU1NbU1NfV1dfW1tjW1tnX19fX19rY2Nra2tva2tzd3eDe3t7f39%2Fh4eHi4uLl5enn5%2Bnp6ezp6e3q6u3q6u7r6%2B7r6%2B%2Fs7O%2Fs7PDt7fDt7fHu7vHu7vLv7%2B%2Fv7%2FLv7%2FPw8PDw8PPw8PTx8fTx8fXy8vXy8vbz8%2Fbz8%2Ff09Pf09Pj19fj19fn29vn39%2Fn39%2Fr4%2BPr4%2BPv5%2Bfv6%2Bvv6%2Bvz7%2B%2Fz7%2B%2F38%2FP39%2Ff39%2Ff7%2B%2Fv7%2B%2Fv%2F%2F%2F%2F%2BHSJEZAAAAAXRSTlMAQObYZgAAA5dJREFUaN61lk1uE0EQhd%2BrsQlREAgkFkQKLJByteQU3IIdd2OBYIFASFmAFLurWPT0uOfXme6aWUXy6PNL9XPXR3z6DSI93wQ0GkHjzweapM%2B%2Btn8SMAERPzKQQKN7IDRhD2APgkbumucvXp24T3s%2BH47H7%2F9U1AxmpvaDzV5IUMBfD0CbQXYPly93K%2BEiwneqphpMVc3e7p492zciQhGKNN2bX%2F42shJOEQFIQgAKgfgdpvFz7d58%2FPO4Fn5PiggBAUkAYhoUMJipwU5vhsfjWjhESMTsBChQVVMDYICadfjD4VAAFyGYZVcN7Vzar4iP6frkd5RuLjG7WlCFwdSy4ICtPlBAKJLNhYBq6HKf8IHrx4J7IQX5maqFLHeC3yrWwyEiFACSzlTVVFNuzQZTAG%2BrLoQwVT1kubvGF4wlVj2vi2isuvWrbiXJIUISYKwL5qpuWgbvXQHxSCeqbiXwvOrpClC1QdXViuAQUnpXgE1U%2FSb%2BUwVVF7JfdTWN2G4uFyiaeZz6oOpB1drzTF0sSw6ySdc5Y%2FZe1SPeCpPfS6p6yq4arK16V5eyAwWEp6oTEKpqewXEygBW9iMabzsAZjqoOkuTL227tjJvSg8UaG%2FGhW33obSK8d4dVj1eAV3VrXQsuBtXvd12XdWteCxg2nbobbuU2xQsHst42zHe6lllypOnbcdUeZ62HUzNoOXJz4vdpZXDz4rde5TDz4rdsQ6%2BLHZNxVjOip3VJD8ndjVtOSt2rEp%2BRuxCHXxZ7G6tCr4sdhUX1xPETmvhC2KndWNZFjtUjmVR7KRyLItiF2qTL4ndtdXCF8Tuqhq%2BIHaonfmi2Ek1fEHsQjV8YdtVt2VR7DzgM2J36QCfFbsbB%2Fi82MEBPit2HvBZsfMYy6zYuSSfq7oLfE7sLpzgk2J37QKfETt1gc%2BJnQ98Rux84NNiJ07wSbELTvBpsXOCT4rdRz%2F4WOzMCz4pdl7wKbGDG3xC7NzGMiV2jvCx2PnNfELsbvzgY7FrHOFjsXOEj7YdHeFjsfOF96sePOFjsXOED8XutSt8sO2uXOFDsfOFD6ruCx9U3Rc%2BEDt3eC52zvC%2B2DnD%2B2LnDe9V3RveEzt3eC527vBc7NzhudhtAe%2BuAH94VnV%2FeCZ2G8BzscMmUxdgi5lnYrcF%2FCR2wCZHSvftP9x2m8DTttsEnsRuK7hs8%2FPPxG4beCt2G8HbbbcNPG67reAUEfwHRePBMkvuZ4wAAAAASUVORK5CYII%3D);
      }
      

      /*===========================================================================
  CONTROLS

  The standard Monocle stylesheet for the optional Monocle controls. See
  comments for monocore.css, which apply here too.
---------------------------------------------------------------------------*/

/* Contents */

div.monelem_controls_contents_container {
  position: absolute;
  width: 75%;
  height: 75%;
  left: 12.5%;
  top: 12.5%;
  background: #EEE;
  border: 2px solid #F7F7F7;
  border-radius: 9px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  box-shadow: 1px 2px 6px rgba(0,0,0,0.5);
  -moz-box-shadow: 1px 2px 6px rgba(0,0,0,0.5);
  -webkit-box-shadow: 1px 2px 6px rgba(0,0,0,0.5);
}

ol.monelem_controls_contents_list {
  margin: 6px;
  padding: 0;
}

li.monelem_controls_contents_chapter {
  list-style: none;
  line-height: 220%;
  padding-left: 1em;
  padding-right: 2em;
  border-bottom: 2px groove #FEFEFE;
  cursor: pointer;
}

li.monelem_controls_contents_chapter_active {
  background: #999;
  color: white;
}

/* Magnifier */

.monelem_controls_magnifier_button {
  cursor: pointer;
  color: #555;
  position: absolute;
  top: 2px;
  right: 10px;
  padding: 0 2px;
}

.monelem_controls_magnifier_a {
  font-size: 11px;
}

.monelem_controls_magnifier_A {
  font-size: 18px;
  opacity: 0.3;
}


/* Spinner */

.monelem_controls_spinner_anim {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center center;
}


/* Scrubber */

div.monelem_controls_scrubber_container {
  position: absolute;
  left: 1em;
  right: 1em;
  bottom: 4px;
  height: 30px;
  background: rgba(255,255,255,0.8);
}

div.monelem_controls_scrubber_track {
  margin-top: 10px;
  height: 5px;
  border: 1px solid #999;
  cursor: pointer;
}

div.monelem_controls_scrubber_needle {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 5px;
  background: #CCC;
  border: 1px solid #999;
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
}

div.monelem_controls_scrubber_trail {
  position: absolute;
  background: #DDD;
  top: 11px;
  left: 1px;
  height: 5px;
}

div.monelem_controls_scrubber_bubble {
  display: none;
  position: absolute;
  padding: 1em;
  min-width: 20%;
  max-width: 30%;
  bottom: 2.5em;
  background: rgba(0, 0, 0, 0.9);
  color: #CCC;
  font: bold 12px Lucida Grande, Tahoma, Helvetica, Arial, sans-serif;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}


/* Stencil */
div.monelem_controls_stencil_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.monelem_controls_stencil_mask {
  display: block;
  position: absolute;
}

div.monelem_controls_stencil_highlighted .monelem_controls_stencil_mask {
  background: rgba(0,0,255,0.15);
}


/*===========================================================================
  DATA URIs

  These are data-uri packed images, inlined for loading speed and simplicity.
  Placed at the end of this file because they're visually noisy...
---------------------------------------------------------------------------*/

div.monelem_controls_spinner_anim {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA0CAMAAAANBM47AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M1cbXjNgAAABV0RVh0Q3JlYXRpb24gVGltZQAxNy81LzEwnOhoKAAAAE5QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxKKmWQAAABp0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBl0wLilAAAC8klEQVQYGZXBB2LjOAADQFCimtVFEoD//9HLbrJxipzoZoBToYptUwV8V/Xrsc8RP6i7aduPXHI69mWIAR9UY6Is5rnCuTBsWXeLkijbTFOLf7okW6R8zxEnwphskfIrifJdW4u/RtlpbGLsdjoHfDNkSZTSNg192w3jchSJEtcawCRzDvgjLPINX1SbSSvNXcC7eNuLXpQuTFbp8CZkH/isyS68H0PAF+0iUzxoNni33HPAR51UxDHgRLObslLEw3TPFT7oKPqIeOImURs+WJ0CHlqKXgLOxL4NgyRqxbuqeMNDXURPOBNWSokquRRP+GeVOzwcLlpwJmx3WVJuY2ZRi1ezfOBhdNGGU52ZhrloBzqSucKLerdLxLtIKlc4Nd9LA6wuNTC5aAbQZzs3eFhE9Tg3mw2wqkQgHCZrTJK3iIcoasMTvXX0E30EAK2k+Wbrho8mky2eCLslSz3+2ERKucVHIZsbnqp2WWXEX60ossMnrakeP+jGocabg9SGzyaXHHDRpOIO/zRjDWCTNlzVsLjFm4bODapE33BZoke8mVy8oqXY4rLNXvFmEnXDKJYaly3SjlchkSOwiCngstFMeDXLE4CVygGX3e6FawUgzFIKANbiHHDZ7U4qL7c5SWzxYqFywGXjvVD3F3Zu8ccs5gqXzeYx7CTTWOOvnmTEZZu0ItSxrvAmZrrHZYme8dkhLbiqLkUDPlvMA1cNIiM+613Y4KJNSviiprTgmrrQM75arVzhkllUxFetqBlXVEXa8d0hMeKCxVSH73rRG37XidpxZlXRiN9UhYUtztRFVI+fhUPFE851KlSHn4TNxTueGU2yx3PVbipVeGpxIaeAJ2IynRv8YHEp3iNOjRRdGvxotGjONb7pD7M4RfyiK6ZclhYf1bdDprRW+FW9SZSUlqGtq1BVTTftRaKce1zS7bIpWyW/oK0i38tU4apupWyRsijKVhoj/o+6W45cJEoqaR+bgP8txH5a1nUZ2gq/+Q/51T5MhuG3fQAAAABJRU5ErkJggg==);
}

/*EFM*/

body {
    background: #eef;
    font-family: "sans-serif";
}

h1 {
    text-align: center;
}
#reader {
    width: 450px;
    height: 650px;
    border: 1px solid black;
    margin: 0 auto;
    background: white;
}
#reader p {
    margin: 1em;
}
.runner {
    font-variant: small-caps;
    font-size: 87%;
    color: #900;
}
.bookTitle {
    position: absolute;
    top: 0%;
    width: 100%;
    text-align: center;
    cursor: pointer;
}


    `}</style>
    </>
  )
}

export default Leitor;
