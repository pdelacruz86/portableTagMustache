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
    var category = "";

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
    var tagceltra = "&lt;div class&#x3D;\&quot;celtra-ad-v3\&quot;&gt;\n    &lt;!-- externalCreativeId  &#x3D; raw       69146847 --&gt;\n    &lt;!-- externalPlacementId &#x3D; raw       11282894 --&gt;\n    &lt;!-- externalSiteId      &#x3D; raw       2924258 --&gt;\n    &lt;!-- externalSiteName    &#x3D; urldecode www.padsquad2.com --&gt;\n    &lt;!-- externalSupplierId  &#x3D; raw       100240 --&gt;\n    &lt;!-- externalCampaignId  &#x3D; raw       ${CP_ID} --&gt;\n    &lt;img src&#x3D;\&quot;data:image&#x2F;png,celtra\&quot; style&#x3D;\&quot;display: none\&quot; onerror&#x3D;\&quot;\n        (function(img) {\n            var params &#x3D; {\&#39;clickUrl\&#39;:\&#39;${CLICK_URL}\&#39;,\&#39;expandDirection\&#39;:\&#39;undefined\&#39;,\&#39;preferredClickThroughWindow\&#39;:\&#39;new\&#39;,\&#39;textColor\&#39;:\&#39;#FFFFFF\&#39;,\&#39;barColor\&#39;:\&#39;#000000\&#39;,\&#39;advertisementMessage\&#39;:\&#39;Advertisement\&#39;,\&#39;scrollMessage\&#39;:\&#39;Scroll to continue with content\&#39;,\&#39;useFullWidth\&#39;:\&#39;1\&#39;,\&#39;clickEvent\&#39;:\&#39;advertiser\&#39;,\&#39;iosAdvId\&#39;:\&#39;${DEVICE_APPLE_IDA}\&#39;,\&#39;externalAdServer\&#39;:\&#39;AppNexus\&#39;,\&#39;tagVersion\&#39;:\&#39;4\&#39;};\n            [].slice.apply(img.parentNode.childNodes).forEach(function(n) { var decfs &#x3D; { urldecode: decodeURIComponent, htmldecode: function(v) { var d &#x3D; document.createElement(\&#39;div\&#39;); d.innerHTML &#x3D; v; return d.textContent; }, eval: function(v) { return eval(v); }, raw: function(v) { return v; } }; var m; if (n.nodeType &#x3D;&#x3D; 8 \&amp;amp;\&amp;amp; (m &#x3D; n.textContent.match(&#x2F;^\&amp;#92;s+([\&amp;#92;w.]+)(\&amp;#92;[.+\&amp;#92;])?\&amp;#92;s+&#x3D;\&amp;#92;s+(\&amp;#92;w+)\&amp;#92;s+(.*)$&#x2F;i))) { try { params[m[1]+(m[2] || \&#39;\&#39;)] &#x3D; decfs[m[3]](m[4].replace(&#x2F;^\&amp;#92;s+|\&amp;#92;s+$&#x2F;g, \&#39;\&#39;)); } catch (e) {} } });\n            var req &#x3D; document.createElement(\&#39;script\&#39;);\n            req.id &#x3D; params.scriptId &#x3D; \&#39;celtra-script-\&#39; + (window.celtraScriptIndex &#x3D; (window.celtraScriptIndex||0)+1);\n            params.clientTimestamp &#x3D; new Date&#x2F;1000;\n            params.clientTimeZoneOffsetInMinutes &#x3D; new Date().getTimezoneOffset();\n            params.hostPageLoadId &#x3D; window.celtraHostPageLoadId &#x3D; (window.celtraHostPageLoadId || (Math.random()+\&#39;\&#39;).slice(2));\n            var src &#x3D; (window.location.protocol &#x3D;&#x3D; \&#39;https:\&#39; ? \&#39;https\&#39; : \&#39;http\&#39;) + \&#39;:&#x2F;&#x2F;ads.celtra.com&#x2F;70dd0ba3&#x2F;web.js?\&#39;;\n            for (var k in params) {\n                src +&#x3D; \&#39;\&amp;amp;\&#39; + encodeURIComponent(k) + \&#39;&#x3D;\&#39; + encodeURIComponent(params[k]);\n            }\n            req.src &#x3D; src;\n            img.parentNode.insertBefore(req, img.nextSibling);\n        })(this);\n    \&quot;&#x2F;&gt;\n&lt;&#x2F;div&gt;";

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