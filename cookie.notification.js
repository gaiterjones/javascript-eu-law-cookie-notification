/**
 * EU Cookie notification banner
 *
	to install paste this code to the footer page of your site and configure:

	<!-- Cookie Notification -->
	<script type="text/javascript">
	var cookieNotificationURL='/cookies/';
	var cookieNotificationLifetime=180;
	var cookieNotificationMessage='This website uses cookies. For more information please ';
	var cookieNotificationClickMessage='click here';
	var cookieNotificationMessageFade=true;
	var cookieNotificationPath='/path-to-install-folder/
	</script>

	<script type="text/javascript" src="/js/cookienotification/cookie.notification.min.js"></script>
 */

(function () {
    "use strict";
    var Cookies = {
        init: function () {
            var allCookies = document.cookie.split('; '), i, cookiePair;

            for (i = 0; i < allCookies.length; i++) {
                cookiePair = allCookies[i].split('=');
                this[cookiePair[0]] = cookiePair[1];
            }
        },
        create: function (name, value, days) {
            var expires = "", date;

            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }

            document.cookie = name + "=" + value + expires + "; path=/";
            this[name] = value;
        },
        erase: function (name) {
            this.create(name, '', -1);
            this[name] = undefined;
        }
    }, body, container, message, close, cLink, cLinkImage, mLink,
        lifetime = cookieNotificationLifetime, url = cookieNotificationURL;
    Cookies.init();

    if ("undefined" === typeof Cookies.notification) {
		
        body = document.getElementsByTagName('body')[0];
        container = document.createElement('div');
        message = document.createElement('p');
        mLink = document.createElement('a');
        close = document.createElement('p');
        cLink = document.createElement('a');
		cLinkImage = document.createElement('img');
		
		container.id = 'cookie-notification'
		cLinkImage.src = cookieNotificationPath + 'image/close-button.png';
        cLinkImage.addEventListener('click', function () {
            container.style.display = 'none';
            Cookies.create('notification', 'true', lifetime);
        });
		
        cLink.textContent   = 'X';
        cLink.style.color   = '#000';
        cLink.addEventListener('click', function () {
            container.style.display = 'none';
            Cookies.create('notification', 'true', lifetime);
        });

        close.appendChild(cLinkImage);
        close.style.cssFloat    = 'right';
        close.style.width       = '150px';
        close.style.textAlign   = 'center';
        close.style.margin      = '2px';
        close.style.marginRight = '0px';
        close.style.cursor      = 'pointer';

        mLink.attributes.setNamedItem(document.createAttribute('href'));
        mLink.attributes.setNamedItem(document.createAttribute('target'));
        mLink.textContent               = cookieNotificationClickMessage;
        mLink.attributes.href.value     = url;
        mLink.attributes.target.value   = "_blank"
        mLink.style.color               = '#000';

        message.innerHTML = cookieNotificationMessage;
        message.appendChild(mLink);
        message.style.cssFloat      = 'left';
        message.style.width         = '500px';
        message.style.textAlign     = 'center';
        message.style.margin        = '2px';
        message.style.marginLeft    = '15px';
        message.style.color         = '#000';

        container.style.color           = '#000';
        container.style.backgroundColor = '#efe9e5';
		container.style.backgroundColor = 'rgba(239, 233, 229, 0.8)';
        container.style.borderTop       = '1px solid #aaa';
        container.style.height          = '25px';
        container.style.width           = '100%';
        container.style.position        = 'fixed';
        container.style.left            = '0';
        container.style.bottom          = '0';
        container.style.zIndex          = '999999';
        container.appendChild(close);
        container.appendChild(message);

        body.appendChild(container);
		
		if(typeof cookieNotificationMessageFade != 'undefined' || cookieNotificationMessageFade)
		{
			var element=document.getElementById('cookie-notification')
			setTimeout(function(){fade(element)},20000);
		}
    }

	
	function fade(element) {
		var op = 1;
		var timer = setInterval(function () {
			if (op <= 0.1){
				clearInterval(timer);
				element.style.display = 'none';
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.1;
		}, 50);
	}		
	
}());