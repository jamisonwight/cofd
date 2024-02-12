document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.js-lazy-image")),
      windowWidth = window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;

            // Check for mobile image
            if (windowWidth < 640 && lazyImage.hasAttribute("data-src-mobile") && lazyImage.getAttribute("data-src-mobile") !== '') {
              lazyImage.src = lazyImage.dataset.srcMobile;
            } else {
              lazyImage.src = lazyImage.dataset.src;
            }
            
            if (!lazyImage.classList.contains('noFade')) {
                lazyImage.classList.add('fade')
            } 
            lazyImage.classList.remove("js-lazy-image");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage, {threshold: 0.0});
      });
    } else {
      // Possibly fall back to a more compatible method here
    }
  });


// Lazy Load Video
document.addEventListener("DOMContentLoaded", function() {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.js-lazy-video"));
  
    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(video) {
          if (video.isIntersecting) {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }
  
            video.target.load();
            video.target.classList.add("fade");
            video.target.classList.remove("js-lazy-video");
            console.log('video was loaded')
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });
  
      lazyVideos.forEach(function(lazyVideo) {
        lazyVideoObserver.observe(lazyVideo, {threshold: 0.0});
      });
    }
  });


  
  