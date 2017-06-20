  var init = function() {
    setupKrux();
    setupQuantCast();
  };

  //Setup Krux
  function setupKrux() {
    window.top.Krux ||
      ((Krux = function() {
        Krux.q.push(arguments);
      }).q = []);
    (function(window, document) {
      var k = document.createElement("script");
      k.type = "text/javascript";
      k.async = true;
      k.src = (location.protocol === "https:" ? "https:" : "http:") +
        "//cdn.krxd.net/controltag/rfgm1s6on.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(k, s);
    })(window.top, window.top.document);
  }

  //Setup Admantx
  function setupQuantCast() {
    var _qevents = _qevents || [];
    var category = "{{category}}";

    insertScript(
      (document.location.protocol == "https:"
        ? "https://secure"
        : "http://edge") + ".quantserve.com/quant.js",
      true
    );

    var label = category +
      "." +
      (window.location.hostname || "").replace(/\./mg, "_");

    _qevents.push({
      qacct: "p-KFVXX643X6_nx",
      labels: label,
      event: "refresh"
    });

    var quantcastDiv = document.createElement("div");
    quantcastDiv.style = "display:none";
    var quantcastImageTag = document.createElement("img");
    quantcastImageTag.src = "//pixel.quantserve.com/pixel/p-KFVXX643X6_nx.gif?labels=" +
      label;
    quantcastImageTag.border = 0;
    quantcastImageTag.height = 1;
    quantcastImageTag.width = 1;
    quantcastImageTag.alt = "Quantcast";
    quantcastDiv.appendChild(quantcastImageTag);
    document.querySelector("body").appendChild(quantcastDiv);
  }

  /**
   *
   * function to setup the portable tag
   *
   */
  
  function SetupPortableTag( ) {
     //write the frame to the DOM
    document.write('<iframe id="ps-frame" frameborder="0" scrolling="0" marginheight="0" marginwidth="0" width="0" height="0" topmargin="0" leftmargin="0" allowtransparency="true" style="display: none;"></iframe>');
    //get the frame
    var ps_iframe = document.getElementById('ps-frame');
    //get the dynamic celtra tag

    var tagceltra = "{{htmlString}}";

    /*=============================================
    =  trick : create a div to pass the tagceltra html in order to convert escaped characters back to normal          
    =============================================*/
    /*
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;' */
    /*=====  End of Section comment block  ======*/

    var div = document.createElement('div'); 
    div.innerHTML = tagceltra
    var decoded = div.firstChild.nodeValue;

    //open the frame and add the celtra tag html in it
    ps_iframe.contentWindow.document.open('text/html', 'replace');
    ps_iframe.contentWindow.document.write("<sc" + "ript>inDapIF = true</scr" + "ipt>" + decoded );
    ps_iframe.contentWindow.document.close();
}

/**
 *
 * Entry point setupPS
 *
 */

(function setupPS() {
  SetupPortableTag();
})();