var Sharer = function(options) {
  var services = [{
    name: 'facebook',
    url: '//www.facebook.com/sharer/sharer.php',
    params: {
      s: 100,
      p: {
        url: options.url,
        title: options.title,
        summary: options.description,
        images: [options.image]
      }
    },
    options: {
      width: 626,
      height: 314
    }
  }, {
    name: 'twitter',
    url: '//twitter.com/share',
    params: {
      url: options.url,
      text: options.description
    },
    options: {
      width: 600,
      height: 350
    }
  }, {
    name: 'pinterest',
    url: '//pinterest.com/pin/create/button',
    params: {
      url: options.url,
      media: options.image,
      description: options.description
    },
    options: {
      width: 620,
      height: 480
    }
  }, {
    name: 'tumblrLink',
    url: '//www.tumblr.com/share/link',
    params: {
      url: options.url,
      name: options.title,
      description: options.description
    },
    options: {
      width: 450,
      height: 400
    }
  }, {
    name: 'tumblrPhoto',
    url: '//www.tumblr.com/share/photo',
    params: {
      source: options.image,
      caption: options.description,
      click_thru: options.url
    },
    options: {
      width: 450,
      height: 400
    }
  }, {
    name: 'fancy',
    url: '//fancy.com/fancyit',
    params: {
      Title: options.title,
      ItemURL: options.url,
      ImageURL: options.image
    },
    options: {
      width: 600,
      height: 640
    }
  }, {
    name: 'googlePlus',
    url: '//plus.google.com/share',
    params: {
      url: options.url
    },
    options: {
      width: 495,
      height: 460
    }
  }, {
    name: 'reddit',
    url: '//reddit.com/submit',
    params: {
      url: options.url
    },
    options: {
      width: 670,
      height: 480
    }
  }, {
    name: 'stumbleUpon',
    url: '//stumbleupon.com/submit',
    params: {
      url: options.url
    },
    options: {
      width: 810,
      height: 560
    }
  }, {
    name: 'linkedIn',
    url: '//www.linkedin.com/shareArticle',
    params: {
      url: options.url,
      summary: options.description,
      title: options.title,
      mini: true
    },
    options: {
      width: 600,
      height: 520
    }
  }];

  var serialize = function(separator, obj, prefix) {
    var arr = [];
    for (var k in obj) {
      var val = obj[k];
      var key = prefix ? prefix + '[' + k + ']' : k;
      var pair = typeof val === 'object'
        ? serialize(separator, val, key)
        : encodeURIComponent(key) + '=' + encodeURIComponent(val);
      arr.push(pair);
    }

    return arr.join(separator);
  };

  var getService = function(url) {
    for (var i = 0, l = services.length; i < l; i++) {
      if (services[i].url === url) {
        return services[i];
      }
    }
  };

  var popup = function popup(url, name, options) {
    options.left = (screen.width  / 2) - (options.width  / 2);
    options.top  = (screen.height / 2) - (options.height / 2);
    options      = serialize(',', options);
    window.open(url, name, options);
  };

  var share = function(e) {
    e.preventDefault();
    var service = getService(this.getAttribute('href'));
    var url     = service.url + '?' + serialize('&', service.params);
    var name    = service.name + 'Dialog';
    popup(url, name, service.options);
  };

  var links = document.getElementsByClassName(options.className);

  for (var i = 0, l = links.length; i < l; i++) {
    links.item(i).addEventListener('click', share, false);
  }

};