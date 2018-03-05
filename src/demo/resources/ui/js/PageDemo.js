let open = true
let initHeight = 0
let intval = null

function slideToggle () {
  window.clearInterval(intval)
  let mdiv = document.getElementById('ad-Demo')
  if (open) {
    initHeight = mdiv.offsetHeight
    let h = initHeight
    open = false
    intval = setInterval(function () {
      h--
      mdiv.style.height = h + 'px'
      if (h <= 0) window.clearInterval(intval)
    }, 1)
  } else {
    let h = 0
    open = true
    intval = setInterval(function () {
      h++
      mdiv.style.height = h + 'px'
      if (h >= initHeight) window.clearInterval(intval)
    }, 1)

    setTimeout(function () {
      mdiv.removeAttribute('style')
    }, 2500)
  }
}

document.querySelectorAll('.ad-DemoButton').forEach(e => { e.onclick = slideToggle })

var spy = new ScrollSpy('#js-scrollspy', {
  nav: '.js-scrollspy-nav li > a',
  className: 'is-inview',
  callback: function () {
  }
});

hljs.initHighlightingOnLoad();
